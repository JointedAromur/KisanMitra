const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PORT, NODE_ENV } = require('./src/config/env');
const apiRoutes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/middleware/logger');

// Initialize Express Application
const app = express();

// Security and Utility Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // Configurable for PWA clients
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request body parsers (50MB limit to support base64 audio/image uploads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request Logging
if (NODE_ENV !== 'test') {
  app.use(logger);
}

// Health Check Endpoint (used by Docker & Kubernetes)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'KisanMitra Backend'
  });
});

// API Root Information
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to KisanMitra API Engine 🌾',
    version: '1.0.0',
    documentation: {
      health: 'GET /health',
      vision: 'POST /api/vision (multipart: image, cropType)',
      weather: 'GET /api/weather?lat=&lon=&daysSinceWatered=',
      voice: 'POST /api/voice (JSON: audioBlob, language)',
      mandi: 'GET /api/mandi?cropName=&district=&lat=&lon='
    }
  });
});

// Mount Core API routes
app.use('/api', apiRoutes);
app.use('/api/v1', apiRoutes); // Backwards-compatible alias

// 404 Catch-all Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Central Global Error Handler
app.use(errorHandler);

// Start server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🌾 KisanMitra Backend Server Running 🌾`);
    console.log(`📡 Port:        ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    console.log(`=========================================`);
  });
}

module.exports = app;
