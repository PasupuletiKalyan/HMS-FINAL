# Hostel Management System - Deployment Guide

## Architecture Overview
- **Frontend**: Deployed on Vercel (React/TypeScript/Vite)
- **Backend**: Deployed on Render (Node.js/Express/MongoDB)

## API Configuration

### Backend API (Render)
- URL: `https://hms-final-33g5.onrender.com`
- Status: Active and running

### Frontend (Vercel)
The frontend is configured to connect to the Render backend API automatically.

## Environment Configuration

### Production (.env.production)
```
VITE_API_URL=https://hms-final-33g5.onrender.com
VITE_NODE_ENV=production
```

### Local Development (.env)
```
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

## Deployment Instructions

### 1. Deploy to Vercel

1. **Connect GitHub Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Deployment Settings**:
   - Framework Preset: Other
   - Build Command: `npm run vercel-build`
   - Output Directory: `Frontend/dist`
   - Install Command: `cd Frontend && npm install`

3. **Environment Variables**:
   - Add `VITE_API_URL` = `https://hms-final-33g5.onrender.com`
   - Add `VITE_NODE_ENV` = `production`

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend

### 2. Alternative: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

## File Structure for Deployment

```
HMS_SE/
├── vercel.json          # Vercel deployment configuration
├── package.json         # Root package.json for deployment
├── .gitignore          # Git ignore rules
├── Frontend/
│   ├── .env            # Local development environment
│   ├── .env.production # Production environment
│   ├── package.json    # Frontend dependencies
│   └── dist/           # Build output (generated)
└── Backend/            # Deployed separately on Render
```

## API Endpoints

The frontend connects to the following API endpoints on Render:

- `POST /api/login` - User authentication
- `GET /api/students` - Student data
- `POST /api/form` - Form submissions
- `GET /api/hostels/blocks-availability` - Block availability
- `GET /api/occupied-beds` - Bed occupancy data
- `GET /api/announcements` - Announcements

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Backend on Render should have CORS configured for your Vercel domain
2. **Environment Variables**: Make sure `VITE_API_URL` is correctly set in Vercel dashboard
3. **Build Failures**: Check that all dependencies are in `package.json`

### Verification Steps:

1. Check frontend deployment: Visit your Vercel URL
2. Check API connection: Open browser dev tools and verify API calls
3. Test functionality: Try logging in and navigating through the app

## Monitoring

- **Frontend**: Monitor via Vercel dashboard
- **Backend**: Monitor via Render dashboard
- **Performance**: Use browser dev tools to check network requests

## Updates

To update the deployment:
1. Push changes to your GitHub repository
2. Vercel will automatically redeploy the frontend
3. Backend updates need to be deployed separately on Render
