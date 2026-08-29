# Decisions

## ADR-001: Data Erasure (GDPR Right to be Forgotten)
**Date:** 2026-08-29  
**Status:** Accepted

**Context:**  
LLM agent memory stores conversation history and semantic profiles, which may contain PII. We must support strict compliance for deletion.

**Decision:**  
We implemented a `DELETE /forget/{user_id}` endpoint. When called, the system traverses all attached storage tiers (short-term Redis cache, long-term pgvector embeddings) and cascade-deletes all records tagged with the `user_id` partition key.

**Consequences:**  
- ✅ Ensures compliance with GDPR Article 17.
- ⚠️ Data is unrecoverable once deleted.
- ⚠️ Assumes all data written to memory is properly tagged with a `user_id`.
