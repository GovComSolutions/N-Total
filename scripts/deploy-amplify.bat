@echo off
REM AWS Amplify Deployment Script for Windows
REM This script helps prepare and deploy your app to AWS Amplify

echo 🚀 Preparing for AWS Amplify deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Check if amplify.yml exists
if not exist "amplify.yml" (
    echo ❌ Error: amplify.yml not found. Please create this file first.
    pause
    exit /b 1
)

REM Check if dist directory exists (local build)
if exist "dist" (
    echo 📁 Found existing dist directory, removing...
    rmdir /s /q dist
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm ci

REM Run build
echo 🔨 Building application...
call npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Error: Build failed. dist directory not created.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Build output located in: dist/

REM Check build output
echo 📊 Build output summary:
dir dist

echo.
echo 🎯 Next steps:
echo 1. Commit and push your changes to your Git repository
echo 2. Go to AWS Amplify Console
echo 3. Create a new app and connect your repository
echo 4. Deploy your application
echo.
echo 📚 See AWS_AMPLIFY_DEPLOYMENT.md for detailed instructions
echo.
echo 🌐 Your app will be available at: https://[app-id].amplifyapp.com
echo.
pause
