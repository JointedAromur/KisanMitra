const express = require('express');
const router = express.Router();
const { getMandiPrices } = require('../controllers/mandiController');

// GET /api/mandi?cropName=...&district=...
router.get('/', getMandiPrices);

// POST /api/mandi
router.post('/', getMandiPrices);

module.exports = router;
