#!/bin/sh
set -e

cd /app
echo "Starting Frontend"
HOST=0.0.0.0 npm run start
