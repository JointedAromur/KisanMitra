const axios = require('axios');
const { OPENWEATHER_API_KEY } = require('../config/env');

/**
 * Generate synthetic realistic 5-day / 3-hour forecast for development / offline fallback
 * @param {number} lat 
 * @param {number} lon 
 * @param {boolean} simulateRain 
 * @returns {object}
 */
function generateFallbackForecast(lat, lon, simulateRain = false) {
  const list = [];
  const now = Date.now();

  for (let i = 0; i < 40; i++) {
    const timestamp = now + i * 3 * 3600 * 1000;
    const isNext48Hours = i < 16;
    const rainAmount = simulateRain && isNext48Hours ? (i % 3 === 0 ? 3.5 : 1.2) : (i === 5 ? 0.4 : 0);

    list.push({
      dt: Math.floor(timestamp / 1000),
      dt_txt: new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19),
      main: {
        temp: 26 + Math.sin(i / 2) * 6,
        feels_like: 27 + Math.sin(i / 2) * 5,
        temp_min: 21,
        temp_max: 33,
        pressure: 1012,
        humidity: 60 + Math.round(Math.sin(i / 3) * 20)
      },
      weather: [
        {
          id: rainAmount > 2 ? 501 : (rainAmount > 0 ? 500 : 800),
          main: rainAmount > 2 ? 'Rain' : (rainAmount > 0 ? 'Drizzle' : 'Clear'),
          description: rainAmount > 2 ? 'moderate rain' : (rainAmount > 0 ? 'light rain' : 'clear sky'),
          icon: rainAmount > 0 ? '10d' : '01d'
        }
      ],
      wind: {
        speed: 3.5 + Math.random() * 2,
        deg: 180
      },
      pop: rainAmount > 0 ? 0.75 : 0.1,
      rain: rainAmount > 0 ? { '3h': rainAmount } : undefined
    });
  }

  return {
    city: {
      name: 'Agricultural Zone',
      coord: { lat, lon },
      country: 'IN'
    },
    list
  };
}

/**
 * Fetch 5-day forecast from OpenWeatherMap API with automatic fallback
 * @param {number} lat 
 * @param {number} lon 
 * @returns {Promise<object>}
 */
async function fetchForecast(lat, lon) {
  if (OPENWEATHER_API_KEY) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const response = await axios.get(url, { timeout: 8000 });
      return response.data;
    } catch (err) {
      console.warn('[WeatherService] OpenWeatherMap API failed, falling back to smart forecast engine:', err.message);
    }
  }

  return generateFallbackForecast(lat, lon);
}

/**
 * Analyze 48-hour precipitation and compute irrigation recommendation
 * @param {object} forecastData 
 * @param {number} daysSinceWatered 
 * @returns {object}
 */
function analyzeIrrigationSchedule(forecastData, daysSinceWatered = 1) {
  const forecastList = forecastData.list || [];
  // Next 48 hours = 16 3-hour intervals
  const next48Hours = forecastList.slice(0, 16);

  let totalPrecipitation48h = 0;
  let heavyRainIntervals = 0;
  let maxRainIntensity = 0;
  let rainySlots = [];
  let tempSum = 0;
  let humiditySum = 0;

  next48Hours.forEach((slot, index) => {
    const rainMm = (slot.rain && slot.rain['3h']) || (slot.snow && slot.snow['3h']) || 0;
    const isHeavy = rainMm >= 7.5 || (slot.weather && slot.weather[0]?.id >= 502 && slot.weather[0]?.id <= 531);

    totalPrecipitation48h += rainMm;
    if (rainMm > maxRainIntensity) maxRainIntensity = rainMm;
    if (isHeavy) heavyRainIntervals++;

    if (rainMm > 0.5) {
      rainySlots.push({
        time: slot.dt_txt,
        precipitationMm: rainMm,
        condition: slot.weather?.[0]?.description || 'Rain'
      });
    }

    tempSum += slot.main?.temp || 25;
    humiditySum += slot.main?.humidity || 50;
  });

  const avgTemp = Math.round((tempSum / (next48Hours.length || 1)) * 10) / 10;
  const avgHumidity = Math.round((humiditySum / (next48Hours.length || 1)) * 10) / 10;
  totalPrecipitation48h = Math.round(totalPrecipitation48h * 10) / 10;

  // Decision Algorithm
  const isHeavyRainLikely = totalPrecipitation48h >= 10 || heavyRainIntervals >= 2 || maxRainIntensity >= 8;
  const isModerateRainLikely = totalPrecipitation48h >= 3 && totalPrecipitation48h < 10;

  let recommendation = {};

  if (isHeavyRainLikely) {
    recommendation = {
      action: 'DO_NOT_IRRIGATE',
      decision: 'Do not irrigate',
      urgency: 'HIGH',
      reason: `Heavy rainfall expected (${totalPrecipitation48h} mm over the next 48 hours). Soil moisture will be naturally replenished. Additional irrigation risks root asphyxiation, nutrient leaching, and fungal disease.`,
      nextEvaluation: 'Re-evaluate after 48 hours once rain subsides',
      fieldAdvice: 'Inspect field drainage channels and clear bund outlets to prevent waterlogging.'
    };
  } else if (isModerateRainLikely) {
    recommendation = {
      action: 'DELAY_IRRIGATION',
      decision: 'Delay irrigation',
      urgency: 'MEDIUM',
      reason: `Moderate rain expected (~${totalPrecipitation48h} mm). Monitor topsoil moisture before applying supplementary water.`,
      nextEvaluation: 'Check soil moisture tomorrow morning',
      fieldAdvice: 'Hold off irrigation for 24-36 hours.'
    };
  } else {
    // Dry weather - Calculate watering schedule
    const days = Math.max(1, Number(daysSinceWatered) || 1);
    
    // Evapotranspiration estimate factor (higher temp + lower humidity = more water needed)
    const etFactor = (avgTemp / 25) * (1 + (100 - avgHumidity) / 100);
    const baseLitersPerSqm = 4.5;
    const requiredLitersPerSqm = Math.round(baseLitersPerSqm * etFactor * (days * 0.7) * 10) / 10;
    const wateringDurationMinutes = Math.round(requiredLitersPerSqm * 8);

    recommendation = {
      action: 'IRRIGATE_RECOMMENDED',
      decision: days >= 3 ? 'Irrigate immediately' : 'Follow scheduled irrigation',
      urgency: days >= 4 ? 'HIGH' : 'NORMAL',
      reason: `Dry conditions ahead with minimal precipitation (${totalPrecipitation48h} mm). It has been ${days} day(s) since last watering.`,
      calculatedSchedule: {
        recommendedWindow: 'Early Morning (05:30 AM - 08:30 AM) or Late Evening (05:30 PM - 07:00 PM)',
        waterRequirement: `${requiredLitersPerSqm} Liters/m² (~${Math.round(requiredLitersPerSqm * 4046.86)} Liters/Acre)`,
        estimatedDripDuration: `${wateringDurationMinutes} minutes (Standard Drip Rate)`,
        soilMoistureDeficit: days >= 4 ? 'Severe Deficit' : (days >= 2 ? 'Moderate Deficit' : 'Optimal/Mild'),
        nextIrrigationInDays: avgTemp > 32 ? 2 : 3
      },
      fieldAdvice: 'Avoid irrigation during midday sun (11:00 AM - 03:00 PM) to minimize 30-40% water loss from evaporation.'
    };
  }

  return {
    location: {
      name: forecastData.city?.name || 'Local Farm Region',
      lat: Number(forecastData.city?.coord?.lat),
      lon: Number(forecastData.city?.coord?.lon)
    },
    currentSummary: {
      avgTemp48h: `${avgTemp}°C`,
      avgHumidity48h: `${avgHumidity}%`,
      totalPrecipitation48h: `${totalPrecipitation48h} mm`,
      rainyIntervalsCount: rainySlots.length
    },
    rainyIntervals: rainySlots,
    recommendation
  };
}

module.exports = {
  fetchForecast,
  analyzeIrrigationSchedule,
  generateFallbackForecast
};
