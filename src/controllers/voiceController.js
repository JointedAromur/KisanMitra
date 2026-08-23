const { processVoiceQuery } = require('../services/voiceService');

/**
 * Controller to handle voice query processing (STT -> Intent/Advisory -> TTS)
 * POST /api/voice
 */
async function handleVoiceQuery(req, res, next) {
  try {
    let audioBase64 = '';
    const sourceLanguage = req.body.sourceLanguage || req.body.language || 'hi';

    // Check if audio came as multipart file upload or JSON base64 string
    if (req.file) {
      audioBase64 = req.file.buffer.toString('base64');
    } else if (req.body.audioBlob) {
      audioBase64 = req.body.audioBlob.replace(/^data:audio\/[a-z0-9]+;base64,/, '');
    } else if (req.body.audio) {
      audioBase64 = req.body.audio.replace(/^data:audio\/[a-z0-9]+;base64,/, '');
    }

    if (!audioBase64) {
      return res.status(400).json({
        success: false,
        error: 'Audio input required. Please provide a base64 audioBlob in JSON or upload an audio file via multipart form-data.'
      });
    }

    const voiceResult = await processVoiceQuery(audioBase64, sourceLanguage);

    return res.status(200).json({
      success: true,
      data: voiceResult
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleVoiceQuery
};
