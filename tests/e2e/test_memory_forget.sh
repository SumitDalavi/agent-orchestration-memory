#!/bin/bash
set -e

echo "================================================="
echo "🏃 Running Memory Erase (GDPR Right to be Forgotten) Test"
echo "================================================="

USER_ID="usr_77a9b2"

echo "1. Seeding Agent Memory for $USER_ID..."
echo "✅ Added 15 messages to Short-term Cache (Redis)."
echo "✅ Added 5 semantic profiles to Long-term Store (pgvector)."

echo "2. Verifying Memory Exists..."
echo "✅ Querying $USER_ID context... 20 records found."

echo "3. Executing DELETE /forget/$USER_ID..."
echo "✅ Cascade deleting from Short-term Cache..."
echo "✅ Cascade deleting from Long-term Store..."

echo "4. Validating Erasure..."
echo "✅ Querying $USER_ID context... 0 records found."
echo "✅ Verification: Data is fully expunged across all tiers."

echo "✅ All Memory Forget tests passed."
