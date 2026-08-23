const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Upload crop image and diagnose disease via Vision API
 * @param {FormData} formData 
 * @returns {Promise<object>}
 */
export async function analyzeCropVision(formData) {
  const res = await fetch(`${API_BASE}/vision`, {
    method: 'POST',
    body: formData
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to analyze crop image');
  }
  return json.data;
}

/**
 * Fetch 5-day weather & 48-hour irrigation recommendation
 * @param {number} lat 
 * @param {number} lon 
 * @param {number} daysSinceWatered 
 * @returns {Promise<object>}
 */
export async function getWeatherAndIrrigation(lat, lon, daysSinceWatered = 1) {
  const query = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    daysSinceWatered: String(daysSinceWatered)
  });

  const res = await fetch(`${API_BASE}/weather?${query.toString()}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to fetch weather & irrigation advisory');
  }
  return json.data;
}

/**
 * Submit voice query (base64 audio or FormData) and receive spoken response
 * @param {string|FormData} audioData 
 * @param {string} sourceLanguage 
 * @returns {Promise<object>}
 */
export async function sendVoiceQuery(audioData, sourceLanguage = 'hi') {
  let options = {};

  if (audioData instanceof FormData) {
    options = {
      method: 'POST',
      body: audioData
    };
  } else {
    options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioBlob: audioData,
        sourceLanguage
      })
    };
  }

  const res = await fetch(`${API_BASE}/voice`, options);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to process voice query');
  }
  return json.data;
}

/**
 * Fetch top Mandi prices for a crop and district
 * @param {string} cropName 
 * @param {string} district 
 * @param {number|null} lat 
 * @param {number|null} lon 
 * @returns {Promise<object>}
 */
export async function getMandiPrices(cropName = 'Wheat', district = '', lat = null, lon = null) {
  const params = {};
  if (cropName) params.cropName = cropName;
  if (district) params.district = district;
  if (lat && lon) {
    params.lat = String(lat);
    params.lon = String(lon);
  }

  const query = new URLSearchParams(params);
  const res = await fetch(`${API_BASE}/mandi?${query.toString()}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to retrieve Mandi prices');
  }
  return json.data;
}
