# Full Stack Deployment Guide
## Backend + Frontend in Same Repo

Your repo contains both Python backend (Flask) and React frontend. They must be deployed separately:

---

## 🔴 IMPORTANT: Two Separate Deployments Required

1. **Backend (Python/Flask)** → Deploy to Render/Railway/Heroku
2. **Frontend (React)** → Deploy to Netlify/Vercel

---

## Step 1: Deploy Backend (Flask API) to Render

### Go to [Render.com](https://render.com)

1. **Create New Web Service**
2. **Connect your GitHub repo:** `manishjangir9740/ai-fitness-web`
3. **Configure:**
   - **Name:** `fitness-backend` (or any name)
   - **Root Directory:** Leave blank or `ai-fitness-web`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn server:app` or `python server.py`
   - **Instance Type:** Free

4. **Environment Variables (if needed):**
   ```
   PYTHON_VERSION=3.10.11
   ```

5. **Deploy!**
6. **Copy your backend URL:** `https://fitness-backend.onrender.com`

---

## Step 2: Deploy Frontend (React) to Netlify

### Update React code to use backend URL

Before deploying, you need to update your frontend to use the backend URL.

**Option 1: Use environment variable (Recommended)**

In `src/components/Home.js`, replace hardcoded URLs:
```javascript
// Before:
fetch("http://127.0.0.1:5000/start_exercise", {

// After:
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";
fetch(`${BACKEND_URL}/start_exercise`, {
```

Do this for ALL backend API calls:
- `/start_exercise`
- `/stop_exercise`
- `/get_count`
- `/video_feed`

### Netlify Deployment

1. **Go to [Netlify.com](https://netlify.com)**
2. **Import your GitHub repo:** `manishjangir9740/ai-fitness-web`
3. **Configure Build Settings:**
   - **Base directory:** Leave blank
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

4. **Add Environment Variable:**
   - **Key:** `REACT_APP_BACKEND_URL`
   - **Value:** `https://fitness-backend.onrender.com` (your Render backend URL)

5. **Deploy!**

---

## Step 3: Update CORS on Backend

Make sure your `server.py` has CORS enabled for your Netlify domain:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://fitnessapplication.netlify.app", "http://localhost:3000"])
```

---

## Quick Reference

| Component | Platform | URL Example |
|-----------|----------|-------------|
| Backend API | Render | https://fitness-backend.onrender.com |
| Frontend | Netlify | https://fitnessapplication.netlify.app |

---

## Local Development

For local testing, use:
```bash
# Terminal 1 - Backend
python server.py

# Terminal 2 - Frontend
npm start
```

Backend runs on: `http://localhost:5000`
Frontend runs on: `http://localhost:3000`

---

## Troubleshooting

### Netlify tries to install Python dependencies
- **Solution:** The `netlify.toml` file prevents this. Make sure it's committed to your repo.

### CORS errors in production
- **Solution:** Add your Netlify URL to CORS origins in `server.py`

### Video feed not working
- **Solution:** Webcam access requires HTTPS. Video upload should work fine.

---

## Files You Need

✅ `netlify.toml` - Tells Netlify to only build React
✅ `requirements.txt` - For Render backend deployment
✅ `package.json` - For Netlify frontend deployment

Push these to your GitHub repo and you're ready to deploy!

