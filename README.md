# My Next.js Full-Stack Application

This is a full-stack application featuring a Next.js frontend with a Node.js/Express backend API. The project is set up with TypeScript, TailwindCSS, and modern development tools.

## Project Structure

- `/app` - Next.js frontend application
- `/backend` - Express.js backend server
- `/public` - Static assets for the frontend

## Prerequisites

- Node.js (Latest LTS version recommended)
- PNPM (v8.15.1 or later)

## Getting Started

1. Install dependencies for both frontend and backend:

```bash
pnpm setup
```

2. Start both the frontend and backend development servers:

```bash
pnpm dev:all
```

This will start:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

You can also run them separately:
- Frontend only: `pnpm dev`
- Backend only: `pnpm dev:backend`

## Available Scripts

- `pnpm dev` - Run the frontend development server
- `pnpm dev:backend` - Run the backend development server
- `pnpm dev:all` - Run both frontend and backend concurrently
- `pnpm build` - Build the frontend for production
- `pnpm start` - Start the frontend production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm typecheck` - Check TypeScript types
- `pnpm setup` - Install dependencies for both frontend and backend

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- ESLint

### Backend
- Node.js
- Express
- TypeScript
- Cors
- Axios

## Development

The application uses PNPM workspaces to manage both frontend and backend packages. The frontend is a modern Next.js application with App Router, and the backend is an Express.js server configured for TypeScript.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
