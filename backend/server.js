require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors(
    allowedOrigins.length
      ? { origin: allowedOrigins }
      : undefined
  )
);
app.use(express.json());

// Routes
app.use('/api/exercises', require('./routes/exercises'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GymBase proxy server running', env: NODE_ENV });
});

// ------ PRODUCTION: Serve React frontend ------
if (NODE_ENV === 'production') {
  const frontendBuild = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendBuild));
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[GymBase] Server running on port ${PORT} (${NODE_ENV})`);
});

