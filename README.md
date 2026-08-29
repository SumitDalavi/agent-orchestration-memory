> **NOTE:** This repository is an archival lab or partial prototype. It is not actively maintained and should not be used as a reference for production-grade deployments or performance benchmarks.


# agent-orchestration-memory

> **Maturity:** Functional Prototype
> _A vector-backed memory module for LLM agents, providing short-term context and long-term semantic recall._

## Features
- Fully automated workflow.
- Secure, scalable architecture.
- Built-in telemetry and observability.

## Technologies
- Python, LangChain, Pinecone

## Getting Started
Ensure you have the required dependencies installed on your system.

```bash
# Setup & Test
pip install -r requirements.txt
pytest
```

## Architecture
Please see the [Architecture Document](docs/architecture.md) for sequence diagrams and system design details.


## CI & Reliability Updates (August 2026)

- **CI Pipeline Remediation:** Successfully resolved all CI/CD pipeline failures and established baseline CI workflows.
- **Specific Fix:** Added and configured robust GitHub Actions workflows for automated testing, linting, and formatting.
- **Status:** 🟩 Passing

---

## Mock Boundaries (Honest Scope)

| What | Status | Details |
|---|---|---|
| Vector Store | **Real** | Uses local hnswlib/pgvector instead of Pinecone for testing. |
| Memory Management | **Real** | Implements short-term windowing and long-term retrieval. |
| Embeddings API | **Mocked** | Uses dummy static embeddings during tests to avoid OpenAI API costs. |

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) — System diagram and component details
- [Runbook](docs/runbook.md) — Setup, commands, and expected outputs
- [Decisions](docs/decisions.md) — ADRs for memory forgetting
- [Changelog](docs/changelog.md) — Change history
