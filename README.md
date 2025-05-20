# Teddy Tech Lead Challenge

This is a monorepo application built with modern web technologies. The repository contains both backend and frontend applications, configured to work together seamlessly.

# Teddy Tech Lead Challenge

This is a monorepo application built with modern web technologies. The repository contains both backend and frontend applications, configured to work together seamlessly.

## Live Preview

Access the live demo of this application at: [https://teddy.leonardolopes.tech](https://teddy.leonardolopes.tech)

## Videos

- [Parte 1](https://www.loom.com/share/530fe18aa57c417daebc39aa24ddefcb)
- [Parte 2](https://www.loom.com/share/2243ddab76d04abf9557e7d22986cff7)
- [Parte 3](https://www.loom.com/share/98961718b3e14e38bc0f660c3a534ea7)

## Project Structure

This project is structured as a monorepo using [Turborepo](https://turborepo.com/) and [PNPM](https://pnpm.io/) workspaces:

## Live Preview

Access the live demo of this application at: [https://teddy.leonardolopes.tech](https://teddy.leonardolopes.tech)

## Project Structure

This project is structured as a monorepo using [Turborepo](https://turborepo.com/) and [PNPM](https://pnpm.io/) workspaces:

```bash
teddy-techlead-challenge/
├── apps/
│   ├── backend/   # NestJS API
│   └── frontend/  # React application
├── packages/      # Shared packages
└── ... configuration files
```

## Documentation

- [Backend Documentation](./apps/backend/README.md)
- [Frontend Documentation](./apps/frontend/README.md)
- [Project Estimation](./ESTIMATION.md)
- [AWS Deployment Architecture](./AWS_DEPLOYMENT.md)

## Development Tools

### VS Code Configuration

The project includes a `.vscode` directory with preconfigured settings for VS Code:

- **settings.json**: Contains editor preferences, formatting rules, and tool configurations
- **extensions.json**: Lists recommended extensions for the project

#### Recommended Extensions

The project recommends several VS Code extensions to enhance the development experience:

- **ESLint & Prettier**: Code linting and formatting
- **Tailwind CSS**: Intellisense for Tailwind CSS
- **Vitest Explorer**: Testing support
- **i18n Ally**: Internationalization support
- **Error Lens**: Inline error display
- **EditorConfig**: Consistent coding styles
- **Todo Tree**: Task management
- and more...

To install all recommended extensions, open VS Code command palette (Ctrl+Shift+P) and run:

```bash
Extensions: Show Recommended Extensions
```

### Commit Guidelines

This project enforces semantic commit messages using [Commitlint](https://commitlint.js.org/) configured with conventional commit standards. This ensures consistent and meaningful commit history.

Commit messages must follow this pattern:

```bash
type(scope): subject
```

Where `type` is one of:

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code
- `test`: Adding or correcting tests
- `doc`: Documentation changes
- `chore`: Changes to the build process or auxiliary tools
- `hotfix`: Critical fixes for production
- `wip`: Work in progress
- `revert`: Revert previous commits

This convention helps with:

- Automatic versioning
- Automatic CHANGELOG generation
- Clear communication about changes
- Easier maintenance and code review

### Git Hooks with Lefthook

The project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks, ensuring code quality checks run at critical points in the development workflow:

- **pre-commit**: Runs linting and type checking before allowing a commit
- **pre-push**: Verifies types, linting, and commit messages before pushing
- **commit-msg**: Validates that commit messages follow the conventional format

This prevents common issues from reaching the repository and ensures consistent code quality across the team.

### Automated Releases with Semantic Release

The project implements [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) for automated version management and package publishing. The configuration in `.releaserc` enables:

- Automatic version determination based on commit messages
- Generation of CHANGELOG.md
- GitHub release creation
- npm package publishing

Semantic Release analyzes commits to determine the next version number according to semantic versioning principles (MAJOR.MINOR.PATCH), removing manual version management and ensuring version consistency.

## Prerequisites

- Node.js (>= 22)
- PNPM (>= 9.15.4)
- Docker and Docker Compose (for containerized deployment)

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

You can run the applications in development mode:

```bash
# Run all applications
pnpm dev

# Run specific application
pnpm --filter @repo/backend dev
pnpm --filter @repo/frontend dev
```

For development with Docker (database only):

```bash
pnpm docker:dev
```

This will start PostgreSQL .

### Building

```bash
# Build all applications
pnpm build

# Build specific application
pnpm --filter @repo/backend build
pnpm --filter @repo/frontend build
```

### Running with Docker

The project includes Docker configuration for easy deployment:

```bash
# Build Docker images
pnpm docker:build

# Run all services
pnpm docker:up
```

This will start three containers:

- PostgreSQL database
- Backend API (NestJS)
- Frontend application (React)

## Services and Ports

- Backend API: <http://localhost:3000>
- Frontend: <http://localhost:3001>
- PostgreSQL: localhost:5432

## Project Commands

```bash
pnpm dev           # Run all applications in development mode
pnpm build         # Build all applications
pnpm lint          # Run linters on all applications
pnpm check-types   # Run TypeScript type checking
pnpm docker:dev    # Start development services with Docker
pnpm docker:build  # Build Docker images
pnpm docker:up     # Start all services with Docker
```
