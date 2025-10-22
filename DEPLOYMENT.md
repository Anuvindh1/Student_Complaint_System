# Deployment Guide

## ✅ Recommended: Deploy on Replit

This application is optimized for **Replit Deployments** which fully supports the Express + Vite architecture.

### Steps to Deploy on Replit:

1. Click the **Deploy** button in your Replit workspace
2. Choose **Autoscale Deployment**
3. Add environment variables:
   - `ADMIN_PASSWORD` - Set a strong password
   - `SESSION_SECRET` - Random 32+ character string
   - Optional Firebase variables (for persistent data)
4. Click **Deploy**

✅ **Already Configured** - The deployment settings are ready to go!

---

## ⚠️ Deploying to Vercel (Not Recommended)

**Important**: This app uses a traditional Express server which doesn't work well with Vercel's serverless architecture. 

### Why Vercel Shows 404:

- Vercel expects serverless functions, not a persistent Express server
- The app needs to be restructured to work with Vercel's `/api` functions
- Session management and in-memory storage won't work reliably on Vercel

### Alternative Platforms:

If you can't use Replit Deployments, consider these alternatives:

1. **Railway.app** - Supports Express apps perfectly
2. **Render.com** - Free tier for Express apps
3. **Heroku** - Traditional platform for Node apps
4. **DigitalOcean App Platform** - Good for Express apps

---

## 📊 Database Configuration

### Current Setup (In-Memory):
- ✅ Sample data already seeded
- ✅ 6 complaints (3 resolved, 3 pending)
- ⚠️ Data resets on server restart

### For Persistent Data:
Enable **Firebase Firestore** by adding these environment variables:
- `FIREBASE_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`

Plus the same variables with `VITE_` prefix for the client.

---

## 🚀 Quick Deploy on Railway.app

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Click Deploy

Railway will automatically detect it's a Node app and deploy it correctly!
