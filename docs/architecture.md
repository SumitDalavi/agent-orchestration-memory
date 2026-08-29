# Architecture — agent-orchestration-memory
> Last updated: 2026-08-29 | Maturity: Partial Prototype
> _Memory management system for agents with privacy controls._

## System Diagram
```mermaid
flowchart TD
    Agent(["LLM Agent"])
    Memory["Memory Service\n:4000"]
    ShortTerm[("Redis\n(Short-term context)")]
    LongTerm[("pgvector\n(Long-term semantic)")]

    Agent -->|"1. Fetch Context"| Memory
    Memory -->|"Read Window"| ShortTerm
    Memory -->|"Similarity Search"| LongTerm
    Memory -->|"Combined Context"| Agent
    Agent -->|"2. Save Interaction"| Memory
    Memory -->|"Push to Window"| ShortTerm
    Memory -->|"Embed & Store"| LongTerm
    Agent -->|"3. DELETE /forget/{user_id}"| Memory
    Memory -->|"Erase records"| ShortTerm
    Memory -->|"Erase records"| LongTerm
```

## Component Table
| Component | File | Responsibility | Tech |
|---|---|---|---|
| API Server | `src/app.ts` | Memory read/write/forget endpoints | Express.js |
| Vector Store | `src/vector.ts` | Semantic search and storage | pgvector |
| Cache | `src/cache.ts` | Sliding window conversation history | Redis |

## Dependency Honesty Table
| Dependency | Status | Notes |
|---|---|---|
| pgvector | **Real** | Used for semantic search (can be mocked with in-memory arrays for unit tests). |
| Embedding API | **Mocked** | Stubbed out to return deterministic arrays instead of calling OpenAI. |


## Component Breakdown
- **Core Technology**: TypeScript, LangGraph.js, ChromaDB
- **Design Paradigm**: Emphasizes high availability, fault tolerance, and security.