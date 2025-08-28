# AWS Amplify Deployment Guide

This guide will walk you through deploying your N-Total Cybersecurity React application to AWS Amplify.

## Prerequisites

1. **AWS Account**: You need an active AWS account
2. **AWS CLI**: Install and configure AWS CLI (optional but recommended)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, Bitbucket, etc.)

## Step 1: Prepare Your Repository

Ensure your repository contains:
- ✅ `package.json` with build scripts
- ✅ `amplify.yml` build specification
- ✅ `.gitignore` (already configured)
- ✅ All source code committed

## Step 2: Connect to AWS Amplify

### Option A: Through AWS Console (Recommended for beginners)

1. **Sign in to AWS Console**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Navigate to **AWS Amplify**

2. **Create New App**
   - Click **New app** → **Host web app**
   - Choose your Git provider (GitHub, GitLab, Bitbucket, etc.)
   - Authorize AWS Amplify to access your repository

3. **Configure Build Settings**
   - Repository: Select your repository
   - Branch: Choose your main branch (usually `main` or `master`)
   - Build settings: AWS Amplify will automatically detect the `amplify.yml` file

4. **Review and Deploy**
   - Review the build settings
   - Click **Save and deploy**

### Option B: Through AWS CLI

1. **Install and Configure AWS CLI**
   ```bash
   # Install AWS CLI
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install

   # Configure AWS CLI
   aws configure
   ```

2. **Create Amplify App via CLI**
   ```bash
   # Create the app
   aws amplify create-app --name "ntotal-cybersecurity" --repository "your-repo-url"
   
   # Create a branch
   aws amplify create-branch --app-id "your-app-id" --branch-name "main"
   
   # Start deployment
   aws amplify start-job --app-id "your-app-id" --branch-name "main" --job-type "RELEASE"
   ```

## Step 3: Configure Environment Variables (Optional)

If your app needs environment variables:

1. In AWS Amplify Console, go to **App settings** → **Environment variables**
2. Add any required environment variables:
   - `VITE_API_URL`
   - `VITE_APP_ENV`
   - Any other Vite environment variables

## Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to **App settings** → **Domain management**
   - Click **Add domain**
   - Enter your domain name
   - Follow the DNS verification steps

2. **SSL Certificate**
   - AWS Amplify automatically provisions SSL certificates
   - No additional configuration needed

## Step 5: Monitor Deployment

1. **Build Status**
   - Monitor build progress in the Amplify Console
   - Check build logs for any errors

2. **Common Issues & Solutions**
   - **Build fails**: Check `amplify.yml` syntax and build commands
   - **Dependencies**: Ensure all dependencies are in `package.json`
   - **Environment variables**: Verify all required env vars are set

## Step 6: Post-Deployment

1. **Test Your Application**
   - Visit the provided Amplify URL
   - Test all functionality including the new "Get Started Today" button

2. **Performance Optimization**
   - Enable Amplify's built-in CDN
   - Configure caching headers if needed

## Build Configuration Details

The `amplify.yml` file is configured for:
- **Pre-build**: Install dependencies with `npm ci`
- **Build**: Run `npm run build` to create production build
- **Artifacts**: Serve files from the `dist` directory
- **Cache**: Cache `node_modules` for faster builds

## Troubleshooting

### Build Fails
```bash
# Check build logs in Amplify Console
# Common issues:
# - Missing dependencies in package.json
# - Build script errors
# - Environment variable issues
```

### App Not Loading
- Check if the build completed successfully
- Verify the `baseDirectory` in `amplify.yml` matches your build output
- Check browser console for JavaScript errors

### Performance Issues
- Enable Amplify's CDN
- Optimize bundle size (already configured in `vite.config.ts`)
- Use Amplify's image optimization features

## Support

- **AWS Amplify Documentation**: [https://docs.aws.amazon.com/amplify/](https://docs.aws.amazon.com/amplify/)
- **AWS Support**: Available with paid support plans
- **Community**: AWS Amplify GitHub repository and forums

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure CI/CD for automatic deployments
3. Set up staging environments
4. Implement blue-green deployments if needed
