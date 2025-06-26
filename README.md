# FBLA TypeScript Backend

This project is a TypeScript Express backend with a modular service-controller-route-DTO architecture. All endpoints and models are implemented to match the provided requirements and original SQL schema, but data is stored in MongoDB for reliability and scalability.

## Features

- User authentication (JWT)
- All routes require authentication via JWT token
- CRUD for users, job postings, applications, skills, projects, achievements, history, tags
- AI endpoints (OpenAI integration)
- Audio upload and transcription (multer, OpenAI Whisper)
- MongoDB database (cloud or local)

## Structure

- `src/models` — TypeScript interfaces for MongoDB collections
- `src/dtos` — DTOs for request/response validation
- `src/services` — Business logic
- `src/controllers` — Route handlers
- `src/routes` — Express routers (all protected by JWT middleware)
- `src/common/util` — Shared utilities (MongoDB connection, validators, etc.)

## Security & Best Practices

- All endpoints are protected with JWT authentication middleware
- DTOs ensure clean, validated data
- Environment variables protect sensitive information
- Controllers handle client requests, services execute business logic, and all data is securely stored in MongoDB

## Setup

1. Copy `.env.example` to `.env` and fill in your secrets
2. `npm install`
3. `npm run build`
4. `npm start`

## Development

- `npm run dev` for hot-reload
- All endpoints documented in code comments

## Database

See `/sql/schema.sql` for the original SQL schema. All models are implemented as TypeScript interfaces for MongoDB.

---