const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/audio', express.static(uploadsDir));

// Base URL for the API
const BASE_URL = 'https://api.nemesyslabs.com/api/v1';

// Function to call the Text to Speech endpoint
async function textToSpeech(text, voiceId = 'Alex') {
  try {
    const response = await axios.post(`${BASE_URL}/text-to-speech`, {
      text,
      voiceId,
    }, {
      responseType: 'arraybuffer',
    });

    const filename = `speech_${Date.now()}.mp3`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, response.data);
    console.log(`Text to Speech audio saved as ${filename}`);
    return filename;
  } catch (error) {
    console.error('Error in Text to Speech:', error);
    throw error;
  }
}

// Function to call the Text to Speech with Timestamps endpoint
async function textToSpeechWithTimestamps(text, voiceId = 'Alex', srt = false) {
  try {
    const response = await axios.post(`${BASE_URL}/text-to-speech/timestamps`, {
      text,
      voiceId,
      srt,
    });

    const filename = `speech_timestamps_${Date.now()}.mp3`;
    const filepath = path.join(uploadsDir, filename);
    const audioBuffer = Buffer.from(response.data.audio_base64, 'base64');
    fs.writeFileSync(filepath, audioBuffer);
    console.log(`Text to Speech with Timestamps audio saved as ${filename}`);

    return {
      audioFile: filename,
      timestamps: response.data.timestamps_map
    };
  } catch (error) {
    console.error('Error in Text to Speech with Timestamps:', error);
    throw error;
  }
}

// Function to call the Text to Speech Streaming endpoint
async function textToSpeechStreaming(text, voiceId = 'Alex') {
  try {
    const response = await axios.post(`${BASE_URL}/text-to-speech/stream`, {
      text,
      voiceId,
    }, {
      responseType: 'stream',
    });

    const filename = `speech_stream_${Date.now()}.mp3`;
    const filepath = path.join(uploadsDir, filename);
    
    // Create a promise to handle the stream
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);

      writer.on('finish', () => {
        console.log(`Text to Speech Streaming audio saved as ${filename}`);
        resolve(filename);
      });

      writer.on('error', (err) => {
        console.error('Error writing stream to file:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error in Text to Speech Streaming:', error);
    throw error;
  }
}

// API Endpoints
app.post('/api/text-to-speech', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    const audioFile = await textToSpeech(text, voiceId);
    res.json({ success: true, audioFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/text-to-speech/timestamps', async (req, res) => {
  try {
    const { text, voiceId, srt } = req.body;
    const result = await textToSpeechWithTimestamps(text, voiceId, srt);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/text-to-speech/stream', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    const audioFile = await textToSpeechStreaming(text, voiceId);
    res.json({ success: true, audioFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 