## CipherStudio (React + Vite + MongoDB on Vercel)

### Features
- File list, editor, and live preview using Sandpack
- Save/load projects to MongoDB
- Vercel serverless API functions

### Tech
- React 18 (Vite)
- MongoDB with Mongoose
- Vercel Functions for API

### Project Structure
```
api/
  _db.js
  projects.js
  projects_[id].js
src/
  App.jsx
  main.jsx
  styles.css
index.html
vercel.json
env.example
```

### Environment
Create `.env` (local) or set variables on Vercel.
```
MONGODB_URI=your_mongodb_connection_string
VITE_DEFAULT_PROJECT_ID=demo
```

### Install and Run (Local)
```
npm i
npm run dev
# open http://localhost:3000
```

### API
- GET `/api/projects` → list
- POST `/api/projects` → upsert `{ projectId, name, files }`
- GET `/api/projects/:id` → project by id

### Deploy on Vercel
1. Push repo to GitHub
2. Vercel → New Project → Import repo
3. Framework: Vite (or Other)
4. Build command: `npm run build`
5. Set env vars: `MONGODB_URI`, `VITE_DEFAULT_PROJECT_ID`
6. Deploy

### Usage
1. Visit the app
2. Set project id or use default
3. Add/edit files
4. Click Save


