const express = require('express');
const router = express.Router();
const { analyzeCrop } = require('../controllers/visionController');
const { uploadImage } = require('../middleware/upload');

// POST /api/vision - Multipart upload with 'image' field and optional 'cropType'
router.post('/', uploadImage.single('image'), analyzeCrop);

module.exports = router;
