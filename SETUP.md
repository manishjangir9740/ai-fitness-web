# AI Fitness Application - Setup Guide

## Python 3.10 Required

This app requires **Python 3.10** (MediaPipe doesn't support 3.12+)

### Download Python 3.10.11
Windows: https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe

## Quick Start

### Windows:
```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Run application (opens 2 terminals)
start.bat
```

### Linux/Mac:
```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Make script executable and run
chmod +x start.sh
./start.sh
```

## Manual Setup

### Backend:
```bash
pip install -r requirements.txt
python server.py
```

### Frontend (in new terminal):
```bash
npm install
npm start
```

## Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deploy

For production deployment (Heroku/Render):
1. Python 3.10 runtime specified in `runtime.txt`
2. Uses `gunicorn` for production server
3. Frontend can be built with `npm run build`

## Features
- Real-time pose detection using MediaPipe
- Exercise counting (Push-ups, Squats, Sit-ups, etc.)
- Webcam or video file upload
- Responsive web interface
- Live video stream in browser (no separate windows)

