# Deployment Guide

## Local Development

### Requirements
- Python 3.10.11
- Node.js 14+

### Quick Start (Windows)
```bash
start.bat
```

### Quick Start (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

## Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set Python version
heroku buildpacks:set heroku/python

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open app
heroku open
```

## Deploy to Render

1. Create account at render.com
2. Connect GitHub repository
3. Create new Web Service
4. Settings:
   - Build Command: `pip install -r requirements.txt && npm install && npm run build`
   - Start Command: `gunicorn server:app`
   - Environment: Python 3.10

## Deploy to Railway

1. Create account at railway.app
2. Create new project from GitHub
3. Environment variables (if needed):
   - PYTHON_VERSION=3.10.11
4. Deploy automatically

## Environment Variables

Create `.env` file (optional):
```
FLASK_ENV=production
PORT=5000
```

## Production Notes

- Video streaming works best on localhost
- For production, consider using HTTPS
- MediaPipe requires Python 3.10 (not 3.11+)
- Webcam access requires HTTPS in production

