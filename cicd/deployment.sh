#!/bin/bash
set -e

# Deploy to gh-pages branch
npm run deploy

# Cleanup
npm run clean

echo "Deployment complete!"
