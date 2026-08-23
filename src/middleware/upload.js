const multer = require('multer');

// Configure in-memory storage for containerized/serverless efficiency
const storage = multer.memoryStorage();

// File filter for images (Vision API)
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid image format (${file.mimetype}). Only JPEG, PNG, and WebP are allowed.`), false);
  }
};

// File filter for audio (Voice API)
const audioFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'audio/wav',
    'audio/x-wav',
    'audio/mpeg',
    'audio/mp3',
    'audio/ogg',
    'audio/webm',
    'audio/mp4',
    'audio/m4a'
  ];
  if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid audio format (${file.mimetype}). Please upload standard audio files.`), false);
  }
};

const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: imageFileFilter
});

const uploadAudio = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: audioFileFilter
});

module.exports = {
  uploadImage,
  uploadAudio
};
