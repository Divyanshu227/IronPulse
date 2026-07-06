# IronPulse

IronPulse is an intelligent, scalable exercise platform that acts as a robust resolver layer between frontend clients and fitness data providers like GymBase. It offers fast exercise retrieval, advanced caching and synchronization, secure credential handling, and provider abstraction.

## Core Features

- **Fast Data Retrieval:** Employs intelligent caching using Upstash Redis or Vercel KV for immediate exercise responses.
- **Resolver Architecture:** The frontend never directly communicates with external providers. All requests flow through an optimized backend resolver layer.
- **Provider Abstraction:** Decoupled logic allows easy integration of multiple fitness providers beyond GymBase.
- **Advanced Synchronization:** Uses hash/version-based synchronization and stale-while-revalidate strategies rather than simple TTL caching.
- **Secure Authentication:** JWT or session-based authentication in HTTP-only cookies, with fully encrypted backend-only storage for provider API keys.
- **Serverless-Ready:** Architecture optimized for environments like Vercel and Edge functions.

## Repository Structure

```text
IronPulse/
├── frontend/          # React/Vite web application
└── backend/           # Node.js/Express API server
    ├── routes/        # API endpoints
    ├── services/      # Business logic (resolvers, providers, cache, encryption)
    ├── middleware/    # Auth and validation
    └── db/            # Database configurations and migrations
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Redis instance (Upstash or local)
- PostgreSQL database (Neon or local)

### Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in necessary environment variables (e.g., Database URL, Redis URL, Encryption Secrets).
4. Run the development server: `npm run dev`

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

## Architecture Highlights

1. **Resolver Layer:** The `resolveExercises()` service handles cache lookups, credential resolution, and provider fetching seamlessly, keeping routes thin.
2. **Cache Synchronization:** IronPulse checks dataset hashes from the provider. If the dataset changes, it rebuilds the cache, ensuring the frontend always sees the most accurate data without unnecessary fetches.
3. **Encryption Rules:** All third-party provider keys are encrypted before storage and are never exposed to the frontend.

## Roadmap

- [x] Phase 1: Global Cache & Resolver Layer implementation
- [ ] Phase 2: User Authentication & Encrypted Connections
- [ ] Phase 3: Hash/Version Synchronization & Stale-while-revalidate
- [ ] Phase 4: Full OAuth Integration

## License
MIT License
