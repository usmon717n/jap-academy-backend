#!/bin/sh

echo "=== JAP Academy Backend Starting ==="
echo "Syncing database schema..."

npx prisma db push --skip-generate 2>&1
RESULT=$?

if [ $RESULT -ne 0 ]; then
  echo "Normal sync failed (exit $RESULT), forcing reset..."
  npx prisma db push --force-reset --skip-generate 2>&1
  echo "Schema reset done, seeding..."
  npx ts-node prisma/seed.ts 2>&1 || echo "Seed warning"
else
  echo "Schema synced OK"
  npx ts-node prisma/seed.ts 2>&1 || echo "Seed warning"
fi

echo "Starting server..."
exec node dist/main
