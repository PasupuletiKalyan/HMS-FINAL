# PowerShell deployment script for HMS Frontend to Vercel

Write-Host "🚀 Starting Hostel Management System Frontend Deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "vercel.json")) {
    Write-Host "❌ Error: vercel.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Set-Location Frontend
npm install

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
npx vercel --prod

Write-Host "🎉 Deployment complete! Your frontend is now connected to the Render backend." -ForegroundColor Green
Write-Host "🔗 Backend API: https://hms-final-33g5.onrender.com" -ForegroundColor Cyan
