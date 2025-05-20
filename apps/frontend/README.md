# Frontend Application

The frontend application is a modern React application built with Vite, TypeScript, and Tailwind CSS.

## Technology Stack

- **Framework**: React (v19)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Communication**: React Query + Axios
- **Form Handling**: React Hook Form + Zod
- **Component Styling**: class-variance-authority + tailwind-merge
- **Internationalization**: i18next
- **Testing**: Vitest + React Testing Library

## Features

- Modern React with latest features
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- API integration with React Query
- Form validation with Zod
- Internationalization support
- Comprehensive testing setup

## Project Structure

```bash
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-specific components and logic
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── i18n/            # Internationalization
│   ├── types/           # TypeScript type definitions
│   ├── router.tsx       # React router provider
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ... configuration files
```

## Local Development

```bash
# Start development server
pnpm dev

# Preview production build locally
pnpm preview
```

## Building for Production

```bash
# Build the application
pnpm build
```

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run tests with UI
pnpm test:ui
```

## Docker

The frontend includes a Dockerfile for containerization and an Nginx configuration for serving the built application. The main Docker commands are available in the root project's README.

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```bash
# API configuration
VITE_API_URL=http://localhost:3000
```

When running with Docker Compose, the appropriate environment variables are pre-configured.

## Internationalization

The application supports multiple languages through i18next. Translation files are located in the `src/i18n` directory.

You can lint the i18n files to ensure all translations are present:

```bash
pnpm lint-i18n
```
