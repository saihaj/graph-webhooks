#!/bin/bash
set -e

echo ""

export SERVICE_PATH=$(pwd)

cd "$SERVICE_PATH"

echo ""
echo "Starting..."
exec dumb-init gosu node bash -c "exec pnpm start"
