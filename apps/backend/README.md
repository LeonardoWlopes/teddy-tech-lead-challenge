# Backend Application

The backend application is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Compiler**: SWC (for faster builds)

## Features

- RESTful API endpoints
- Database integration with TypeORM
- Configuration management
- API documentation with Swagger
- Validation with class-validator

## Project Structure

The backend follows NestJS's modular structure:

```bash
backend/
├── src/
│   ├── main.ts             # Application entry point
│   ├── app.module.ts       # Root module
│   ├── modules/            # Feature modules
│   │   ├── module1/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   └── module1.module.ts
│   │   └── module2/
│   │       └── ...
│   └── common/             # Shared resources
├── test/                   # Test files
└── ... configuration files
```

## Architecture Overview

This project follows **Domain-Driven Design (DDD)** and **Clean Architecture** principles to create a maintainable and scalable application. The architecture is organized into the following layers:

```bash
src/
├── application/                  # Application layer
│   ├── dtos/                     # Input DTOs
│   ├── repositories/             # Repository interfaces/contracts
│   ├── use-cases/                # Use cases organized by domain context
│   └── view-models/              # Output/View models
├── domain/                       # Domain layer
│   ├── entities/                 # Domain entities
│   ├── value-objects/            # Value objects
│   └── errors/                   # Domain-specific errors
├── infra/                        # Infrastructure layer
│   ├── database/
│   │   ├── entities/             # TypeORM entities (ORM mapping)
│   │   ├── migrations/           # Database migration files
│   │   ├── repositories/         # TypeORM-based repository implementations
│   │   └── database.module.ts    # NestJS module for TypeORM integration
│   ├── http/
│   │   ├── controllers/          # REST controllers
│   │   └── mappers/              # Mappers between DTOs and domain entities
│   └── modules/                  # NestJS modules by domain context
├── main.ts
└── test/                         # Test layer
    └── repositories/
        └── in-memory-client.repository.ts
```

### Layer Responsibilities

#### Domain Layer

The Domain layer is the core of the application and contains:

- **Entities**: Core business objects representing business concepts and state
- **Value Objects**: Immutable objects that describe aspects of the domain
- **Domain Errors**: Specialized error types for domain-specific validation failures

The Domain layer is independent of all other layers and frameworks. It contains pure business logic and rules with no external dependencies.

#### Application Layer

The Application layer orchestrates the flow of data to and from the Domain layer:

- **DTOs (Data Transfer Objects)**: Define how data enters the application
- **View Models**: Define how data leaves the application
- **Use Cases**: Implement specific business operations/flows
- **Repository Interfaces**: Define contracts for data access (implemented in Infrastructure)

The Application layer depends only on the Domain layer. It defines interfaces that are implemented by the Infrastructure layer.

#### Infrastructure Layer

The Infrastructure layer provides concrete implementations for external dependencies:

- **Database**: TypeORM entities and repository implementations
- **HTTP**: Controllers that handle requests and responses
- **Mappers**: Transform between domain entities and DTOs/database entities
- **Modules**: NestJS modules that wire everything together

### Flow of Data

1. HTTP request is received by a Controller in the Infrastructure layer
2. Controller maps request data to an input DTO
3. Controller invokes the appropriate Use Case from the Application layer
4. Use Case coordinates the business logic using Domain entities
5. Domain entities execute business rules and validations
6. Use Case interacts with Repositories (defined in Application, implemented in Infrastructure)
7. Results are mapped to View Models and returned to the Controller
8. Controller transforms View Models into HTTP responses

### Best Practices

1. **Maintain Layer Separation**:

    - Never import Infrastructure classes in Domain or Application layers
    - Domain layer should have zero external dependencies

2. **Domain Entity Purity**:

    - Keep domain entities focused on business logic
    - Different from ORM entities (which handle persistence concerns)
    - Use mappers to transform between domain and ORM entities

3. **Repository Pattern**:

    - Define repository interfaces in the Application layer
    - Implement repositories in the Infrastructure layer
    - Use in-memory repositories for testing

4. **Use Case Organization**:

    - One use case per file, focused on a single responsibility
    - Group use cases by domain context
    - Keep use cases thin by delegating business logic to domain entities

5. **Value Objects for Validation**:

    - Use value objects for properties that require validation
    - Make value objects immutable

6. **Dependency Injection**:

    - Use NestJS's DI container for wiring everything together
    - Inject repositories through constructors
    - Test with mock implementations

7. **Testing Strategy**:
    - Domain layer: Pure unit tests
    - Application layer: Integration tests with in-memory repositories
    - Infrastructure layer: Integration tests with real dependencies or test doubles

## Local Development

```bash
# Development mode with hot-reload
pnpm dev

# Debug mode
pnpm debug
```

## Building for Production

```bash
# Build the application
pnpm build

# Run in production mode
pnpm prod
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Run end-to-end tests
pnpm test:e2e
```

The backend uses Vitest for unit and integration testing. Vitest is a powerful JavaScript testing framework that allows testing different layers of the application.

## API Documentation

When running the application, the Swagger documentation is available at:

```bash
http://localhost:3000/api
```

## Docker

The backend includes a Dockerfile for containerization. The main Docker commands are available in the root project's README.

## Environment Variables

The backend uses NestJS's ConfigModule for managing environment variables. Create a `.env` file in the backend directory with the following variables:

```bash
# Database connection
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
```

When running with Docker Compose, these values are pre-configured in the docker-compose.yml file.
