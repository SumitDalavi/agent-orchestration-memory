# Architecture: Agent Orchestration with Memory

## System Diagram
The following Mermaid.js sequence diagram maps the core workflow and interactions:

```mermaid
sequenceDiagram
User->>Supervisor: Complex Task
Supervisor->>ChromaDB: Recall past preferences
Supervisor->>AgentA: Subtask 1
Supervisor->>AgentB: Subtask 2
AgentB->>Tool: Execute
AgentB->>Supervisor: Fails
Supervisor->>Human: Escalate
```

## Component Breakdown
- **Core Technology**: TypeScript, LangGraph.js, ChromaDB
- **Design Paradigm**: Emphasizes high availability, fault tolerance, and security.
