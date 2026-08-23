const express = require('express');
const router = express.Router();
const { handleVoiceQuery } = require('../controllers/voiceController');
const { uploadAudio } = require('../middleware/upload');

// POST /api/voice - Accepts JSON base64 audioBlob or multipart 'audio' file
router.post('/', uploadAudio.single('audio'), handleVoiceQuery);

module.exports = router;
