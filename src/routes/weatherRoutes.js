const express = require('express');
const router = express.Router();
const { getWeatherAndIrrigation } = require('../controllers/weatherController');

// GET /api/weather?lat=...&lon=...&daysSinceWatered=...
router.get('/', getWeatherAndIrrigation);

// POST /api/weather
router.post('/', getWeatherAndIrrigation);

module.exports = router;
