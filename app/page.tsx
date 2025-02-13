'use client';

import { useState } from 'react';

type Region = {
  name: string;
  voices: string[];
  examples: string[];
};

const REGIONS: Record<string, Region> = {
  'English - USA': {
    name: 'English - USA',
    voices: ['Alice', 'Michael', 'Alex', 'Emily', 'Ava', 'Priya'],
    examples: [
      "My cat just filed my taxes. I'm slightly concerned because she listed 'tuna cans' as dependents and claimed the scratching post as a home office. When I questioned her about it, she just pushed my coffee mug off the desk and walked away. I think she's been watching too many accounting tutorials on YouTube. The IRS might have questions about the 'catnip entertainment expenses'.",
      "I tried teaching my goldfish to play fetch. Three hours later, I realized I might not be the brightest fish in the pond. The tennis ball kept sinking, and my goldfish kept giving me this look like, 'Dave, we need to talk about your life choices.' Now he's organizing a support group for pets with overly ambitious owners. The hamster from next door is the treasurer.",
      "Just invented a time machine! Unfortunately, it only goes forward at regular speed. I call it... waiting. I've been testing it extensively for the past week, and I can confirm that it successfully transported me to next Thursday. My investors are not impressed, but I keep telling them that patience is literally the product. Patent pending.",
      "Dear diary, today I tried to high-five a ghost. Now my hand is cold and my dignity is somewhere in the astral plane. The ghost looked equally embarrassed and tried to comfort me by passing through a wall, but accidentally walked into it instead. Turns out even ghosts have awkward moments. We're meeting for coffee next week - well, I'll have coffee, he'll just hover dramatically.",
      "Breaking news: Local man discovers that talking to plants doesn't make them grow faster, but it does make other people at the garden center uncomfortable. When asked for comment, his cactus remained silent. The man has since started a podcast for introverted succulents, with special episodes featuring meditation for stressed-out ferns. Listener numbers remain mysteriously low."
    ]
  },
  'Spain': {
    name: 'Spain',
    voices: ['Carmen', 'Emma', 'Elena', 'Carlos', 'Javier', 'Alejandro'],
    examples: [
      "Mi vecino insiste en que su paella tiene vida propia. Dice que anoche la encontró bailando flamenco en la cocina con una sartén de tortilla. Los tomates cherry hacían de público y el azafrán era el juez. La verdad es que la paella ganó tres estrellas Michelin por su interpretación.",
      "Intenté enseñarle a mi gato a jugar dominó, pero solo está interesado en organizar torneos de siesta profesional. Ya ha establecido un ranking nacional y exige que las sardinas sean el premio oficial. Los otros gatos del barrio lo han nombrado 'El Maestro del Descanso'.",
      "El GPS de mi coche se enamoró de una señal de tráfico en Madrid. Ahora me hace dar vueltas por la misma rotonda cada día solo para verla. He intentado explicarle que hay más señales en el mar, pero dice que esta es especial porque parpadea cuando llueve."
    ]
  },
  'Italy': {
    name: 'Italy',
    voices: ['Isabella'],
    examples: [
      "La mia nonna ha iniciado una revolución en la cocina: dice que la pasta se debe cocinar al ritmo de la ópera. Según ella, los spaghetti prefieren Puccini, mientras que los penne son más de Verdi. El otro día la pasta comenzó a cantar el 'O Sole Mio' y ahora toda la ciudad viene a escuchar el concierto de la cena.",
      "Mi Vespa ha decidido convertirse en barista. Ahora en lugar de gasolina, solo acepta espresso. Dice que el diesel es demasiado mainstream y que el futuro está en el café. Los mecánicos están confundidos, pero los clientes dicen que nunca habían viajado tan despiertos."
    ]
  },
  'France': {
    name: 'France',
    voices: ['Chloe', 'Luc'],
    examples: [
      "Mon croissant a décidé de devenir critique gastronomique. Il passe ses journées juzgando a otros pasteles por su 'postura' y 'actitud'. La baguette del vecino recibió una crítica devastadora por ser 'demasiado rígida en sus opiniones'. Ahora todos los pasteles van a terapia de grupo.",
      "Mi torre Eiffel en miniatura cobró vida y ahora da clases de postura a los imanes de nevera. Les enseña a mantenerse erguidos y a tener 'je ne sais quoi'. Los imanes de la Torre de Pisa se niegan a participar, dicen que prefieren su estilo inclinado."
    ]
  },
  'Mexico': {
    name: 'Mexico',
    voices: ['Emma'],
    examples: [
      "Mi taco al pastor empezó un podcast sobre la vida nocturna en la ciudad. Entrevista a diferentes salsas sobre sus experiencias picantes y da consejos a los guacamoles jóvenes sobre cómo mantenerse frescos bajo presión. El chile habanero es su productor musical y pone los beats más candentes.",
      "Las piñatas del barrio formaron un sindicato. Exigen mejores condiciones de trabajo, más dulces de calidad y el derecho a elegir su propia música para las fiestas. Su lema es: '¡No más golpes a ciegas!' También piden que los niños tomen clases de puntería."
    ]
  },
  'South Africa': {
    name: 'South Africa',
    voices: ['Zanele'],
    examples: [
      "My local wildlife committee is in chaos because a group of meerkats started a social media influencer agency. They're teaching lions how to pose for Instagram and giving giraffes tips on finding their best angles. The elephants are demanding a TikTok dance tutorial, but the meerkats say they need to work on their core strength first.",
      "The Table Mountain started offering meditation classes to other mountains. Says the modern world is too stressful and mountains need to stay grounded. The hills are still in beginner classes, learning how to maintain their zen when tourists take selfies."
    ]
  },
  'United Kingdom': {
    name: 'United Kingdom',
    voices: ['Jessica'],
    examples: [
      "My teapot has started a support group for misunderstood kitchen appliances. The electric kettle feels threatened by coffee machines, and the biscuit tin is tired of being body-shamed for being empty most of the time. They meet every afternoon at tea time, naturally.",
      "The London Eye got jealous of Big Ben's popularity and decided to become a stand-up comedian. Now it spends all day telling 'round-about' jokes and making observations about tourist behavior. Big Ben agreed to be the timekeeper for its shows, but keeps heckling with loud bongs."
    ]
  },
  'Australia': {
    name: 'Australia',
    voices: ['Ava'],
    examples: [
      "A kangaroo started teaching parkour classes at my local gym. The wallabies are naturals, but the koalas keep falling asleep during the warm-up. The emu signed up too, but it's mostly there to film fail compilations for its YouTube channel.",
      "My boomerang came back with a degree in physics and now won't stop explaining aerodynamics to all the other sporting equipment. The cricket bat is particularly annoyed, says it didn't sign up for a TED talk every time it wants to hit a six."
    ]
  },
  'Germany': {
    name: 'Germany',
    voices: ['Lisa', 'Matthew'],
    examples: [
      "Mein Brezel hat eine App entwickelt für effizienteres Brot-Networking. Die Weißwürste sind begeisterte Beta-Tester, aber das Sauerkraut beschwert sich, dass die Benutzeroberfläche nicht sauer genug ist. Das Schwarzbrot möchte eine Dark Mode.",
      "Die Ampel an der Ecke hat beschlossen, einen Philosophie-Kurs anzubieten. Rot bedeutet jetzt 'Existenzielle Krise', Gelb ist 'Kontemplative Pause' und Grün steht für 'Carpe Diem'. Die Autofahrer sind verwirrt, aber definitiv nachdenklicher."
    ]
  }
};

export default function Home() {
  const [region, setRegion] = useState('English - USA');
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState(REGIONS['English - USA'].voices[0]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');
  const [timestamps, setTimestamps] = useState<Record<string, number> | null>(null);

  const API_BASE_URL = 'http://localhost:3001/api';

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setVoiceId(REGIONS[newRegion].voices[0]);
  };

  const handleRandomExample = () => {
    const examples = REGIONS[region].examples;
    const randomIndex = Math.floor(Math.random() * examples.length);
    setText(examples[randomIndex]);
  };

  const handleSubmit = async (endpoint: string) => {
    try {
      setLoading(true);
      setError('');
      setAudioUrl('');
      setTimestamps(null);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voiceId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate speech');
      }

      if (endpoint === '/text-to-speech/timestamps') {
        setTimestamps(data.timestamps);
      }

      setAudioUrl(`${API_BASE_URL}/audio/${data.audioFile}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <main className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Text-to-Speech API Tester</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="region" className="block text-sm font-medium mb-2">
              Region & Language
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 border-gray-700"
            >
              {Object.keys(REGIONS).map((regionKey) => (
                <option key={regionKey} value={regionKey}>
                  {REGIONS[regionKey].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="text" className="block text-sm font-medium">
                Text to Convert
              </label>
              <button
                onClick={handleRandomExample}
                className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Random Example 🎲
              </button>
            </div>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded-md min-h-[200px] bg-gray-800 border-gray-700"
              placeholder="Enter text to convert to speech..."
            />
          </div>

          <div>
            <label htmlFor="voiceId" className="block text-sm font-medium mb-2">
              Voice
            </label>
            <select
              id="voiceId"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 border-gray-700"
            >
              {REGIONS[region].voices.map((voice) => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => handleSubmit('/text-to-speech')}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Basic TTS
            </button>
            <button
              onClick={() => handleSubmit('/text-to-speech/timestamps')}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              TTS with Timestamps
            </button>
            <button
              onClick={() => handleSubmit('/text-to-speech/stream')}
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
            >
              TTS Stream
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <p>Converting text to speech...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-900/50 text-red-200 rounded-md border border-red-700">
            <p>{error}</p>
          </div>
        )}

        {audioUrl && (
          <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
            <h2 className="font-semibold mb-2">Generated Audio:</h2>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {timestamps && (
          <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
            <h2 className="font-semibold mb-2">Timestamps:</h2>
            <pre className="overflow-auto text-sm">
              {JSON.stringify(timestamps, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
