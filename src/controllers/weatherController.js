const { fetchForecast, analyzeIrrigationSchedule } = require('../services/weatherService');

/**
 * Controller to handle weather forecast and irrigation advisory
 * GET or POST /api/weather
 */
async function getWeatherAndIrrigation(req, res, next) {
  try {
    const lat = req.query.lat || req.body.lat;
    const lon = req.query.lon || req.body.lon;
    const daysSinceWatered = req.query.daysSinceWatered || req.body.daysSinceWatered || 1;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: 'Latitude (lat) and Longitude (lon) are required query parameters or body fields.'
      });
    }

    const numericLat = parseFloat(lat);
    const numericLon = parseFloat(lon);
    const numericDays = parseInt(daysSinceWatered, 10);

    if (isNaN(numericLat) || isNaN(numericLon)) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and Longitude must be valid numerical coordinates.'
      });
    }

    // Fetch forecast & compute irrigation schedule
    const forecastData = await fetchForecast(numericLat, numericLon);
    const analysis = analyzeIrrigationSchedule(forecastData, numericDays);

    return res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWeatherAndIrrigation
};
