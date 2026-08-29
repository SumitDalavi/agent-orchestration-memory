# Runbook — agent-orchestration-memory
> Last updated: 2026-08-29

## Quick Start
```bash
npm install
npm run start
```
API runs on `http://localhost:4000`.

## Run Tests
```bash
npm test
bash tests/e2e/test_memory_forget.sh
```

## Environment Variables
| Variable | Default | Purpose |
|---|---|---|
| PG_URI | `postgresql://postgres:postgres@localhost:5432/memory` | pgvector database |
| REDIS_URL | `redis://localhost:6379` | Short-term memory |
