const { getTopMandis } = require('../services/mandiService');

/**
 * Controller to handle Mandi prices inquiry
 * GET or POST /api/mandi
 */
async function getMandiPrices(req, res, next) {
  try {
    const cropName = req.query.cropName || req.body.cropName || req.query.commodity || req.body.commodity || 'Wheat';
    const district = req.query.district || req.body.district || req.query.city || req.body.city || req.query.q || '';
    const lat = req.query.lat || req.body.lat;
    const lon = req.query.lon || req.body.lon;

    const userLat = lat ? parseFloat(lat) : null;
    const userLon = lon ? parseFloat(lon) : null;

    const mandiData = await getTopMandis(cropName, district, userLat, userLon);

    return res.status(200).json({
      success: true,
      data: mandiData
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMandiPrices
};
