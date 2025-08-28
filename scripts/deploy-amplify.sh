#!/bin/bash

# AWS Amplify Deployment Script
# This script helps prepare and deploy your app to AWS Amplify

set -e

echo "🚀 Preparing for AWS Amplify deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if amplify.yml exists
if [ ! -f "amplify.yml" ]; then
    echo "❌ Error: amplify.yml not found. Please create this file first."
    exit 1
fi

# Check if dist directory exists (local build)
if [ -d "dist" ]; then
    echo "📁 Found existing dist directory, removing..."
    rm -rf dist
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run build
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not created."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output located in: dist/"

# Check build output
echo "📊 Build output summary:"
ls -la dist/

echo ""
echo "🎯 Next steps:"
echo "1. Commit and push your changes to your Git repository"
echo "2. Go to AWS Amplify Console"
echo "3. Create a new app and connect your repository"
echo "4. Deploy your application"
echo ""
echo "📚 See AWS_AMPLIFY_DEPLOYMENT.md for detailed instructions"
echo ""
echo "🌐 Your app will be available at: https://[app-id].amplifyapp.com"
