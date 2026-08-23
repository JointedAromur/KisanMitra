const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  BHASHINI_API_KEY: process.env.BHASHINI_API_KEY || '',
  BHASHINI_USER_ID: process.env.BHASHINI_USER_ID || '',
  BHASHINI_PIPELINE_ID: process.env.BHASHINI_PIPELINE_ID || '',
  AGMARKNET_API_KEY: process.env.AGMARKNET_API_KEY || ''
};
