#!/bin/sh
set -e

echo "=== JAP Academy Backend Starting ==="

# Try normal db push first
echo "Syncing database schema..."
if npx prisma db push --skip-generate 2>/dev/null; then
  echo "Schema synced successfully"
else
  echo "Normal sync failed, forcing schema reset..."
  npx prisma db push --force-reset --skip-generate
  echo "Schema reset complete, seeding data..."
  npx ts-node prisma/seed.ts || echo "Seed skipped or failed"
fi

echo "Starting server..."
exec node dist/main
