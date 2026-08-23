const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Generate a valid PNG buffer of size x size
function createFarmerPng(width, height) {
  const rowSize = width * 4;
  const rawData = Buffer.alloc((rowSize + 1) * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (rowSize + 1);
    rawData[rowOffset] = 0; // Filter type 0

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Default transparent
      let r = 0, g = 0, b = 0, a = 0;

      const nx = x / width;
      const ny = y / height;

      // Background soft halo
      const distCenter = Math.hypot(nx - 0.5, ny - 0.5);
      if (distCenter < 0.45) {
        r = 220;
        g = 252;
        b = 231;
        a = Math.floor((1 - distCenter / 0.45) * 60);
      }

      // Farmer Torso / Kurta (x: 0.25 to 0.65, y: 0.55 to 0.95)
      if (nx >= 0.22 && nx <= 0.62 && ny >= 0.52 && ny <= 0.92) {
        r = 241;
        g = 245;
        b = 249;
        a = 255;
      }

      // Farmer Head & Face (center: 0.42, 0.38, radius: 0.12)
      const distHead = Math.hypot(nx - 0.42, ny - 0.38);
      if (distHead < 0.11) {
        r = 253;
        g = 230;
        b = 138;
        a = 255;
      }

      // Farmer Turban (center: 0.42, 0.28, radius: 0.14)
      const distTurban = Math.hypot(nx - 0.42, ny - 0.28);
      if (distTurban < 0.13) {
        r = 245;
        g = 158;
        b = 11;
        a = 255;
      }

      // Farmer Arm / Hand (x: 0.52 to 0.70, y: 0.48 to 0.68)
      if (nx >= 0.50 && nx <= 0.68 && ny >= 0.48 && ny <= 0.65) {
        r = 253;
        g = 230;
        b = 138;
        a = 255;
      }

      // Smartphone Body (x: 0.58 to 0.74, y: 0.36 to 0.64)
      if (nx >= 0.58 && nx <= 0.74 && ny >= 0.36 && ny <= 0.64) {
        r = 15;
        g = 23;
        b = 42;
        a = 255;
      }

      // Smartphone Screen (x: 0.60 to 0.72, y: 0.38 to 0.62)
      if (nx >= 0.60 && nx <= 0.72 && ny >= 0.38 && ny <= 0.62) {
        r = 6;
        g = 78;
        b = 59;
        a = 255;
      }

      // Crop Leaf on right side (x: 0.75 to 0.92, y: 0.40 to 0.65)
      const distLeaf = Math.hypot(nx - 0.82, ny - 0.50);
      if (distLeaf < 0.12) {
        r = 34;
        g = 197;
        b = 94;
        a = 255;
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

const targetFile = path.join(__dirname, 'public', 'farmer-phone.png');
fs.writeFileSync(targetFile, createFarmerPng(512, 512));
console.log('✅ Generated public/farmer-phone.png successfully.');
