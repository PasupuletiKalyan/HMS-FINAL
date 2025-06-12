#!/bin/bash

# Deployment script for HMS Frontend to Vercel

echo "🚀 Starting Hostel Management System Frontend Deployment..."

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd Frontend
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "🎉 Deployment complete! Your frontend is now connected to the Render backend."
echo "🔗 Backend API: https://hms-final-33g5.onrender.com"
