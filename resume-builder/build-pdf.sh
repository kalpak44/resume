#!/bin/bash
set -e

# Change to the resume-builder directory
cd "$(dirname "$0")"

echo "Installing dependencies for PDF builder..."
# Only install if not already present or as part of the build process
# We use puppeteer which requires some system dependencies in a real agent,
# but here we focus on the Node.js part.
npm install puppeteer

echo "Generating PDF resume..."
node builder.js

echo "Done!"
