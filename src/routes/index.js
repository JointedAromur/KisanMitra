const express = require('express');
const router = express.Router();

const visionRoutes = require('./visionRoutes');
const weatherRoutes = require('./weatherRoutes');
const voiceRoutes = require('./voiceRoutes');
const mandiRoutes = require('./mandiRoutes');

// Mount individual domain routers
router.use('/vision', visionRoutes);
router.use('/weather', weatherRoutes);
router.use('/voice', voiceRoutes);
router.use('/mandi', mandiRoutes);

module.exports = router;
