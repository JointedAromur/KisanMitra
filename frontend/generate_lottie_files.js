const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Minimal ZIP file creator without external dependencies
function createZip(files) {
  const fileEntries = [];
  let offset = 0;

  // Local file headers + contents
  const chunks = [];

  for (const file of files) {
    const filenameBuffer = Buffer.from(file.name, 'utf8');
    const contentBuffer = Buffer.from(file.content, 'utf8');
    const crc = crc32(contentBuffer);
    const size = contentBuffer.length;

    const localHeader = Buffer.alloc(30 + filenameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // Signature
    localHeader.writeUInt16LE(20, 4);         // Version needed
    localHeader.writeUInt16LE(0, 6);          // General flag
    localHeader.writeUInt16LE(0, 8);          // Compression (0 = store)
    localHeader.writeUInt16LE(0, 10);         // Mod time
    localHeader.writeUInt16LE(0, 12);         // Mod date
    localHeader.writeUInt32LE(crc, 14);       // CRC-32
    localHeader.writeUInt32LE(size, 18);      // Compressed size
    localHeader.writeUInt32LE(size, 22);      // Uncompressed size
    localHeader.writeUInt16LE(filenameBuffer.length, 26); // Filename length
    localHeader.writeUInt16LE(0, 28);         // Extra field length
    filenameBuffer.copy(localHeader, 30);

    chunks.push(localHeader);
    chunks.push(contentBuffer);

    fileEntries.push({
      name: file.name,
      nameBuffer: filenameBuffer,
      size,
      crc,
      offset
    });

    offset += localHeader.length + contentBuffer.length;
  }

  // Central directory
  const centralDirStart = offset;
  let centralDirSize = 0;

  for (const entry of fileEntries) {
    const cdHeader = Buffer.alloc(46 + entry.nameBuffer.length);
    cdHeader.writeUInt32LE(0x02014b50, 0); // Signature
    cdHeader.writeUInt16LE(20, 4);          // Version made by
    cdHeader.writeUInt16LE(20, 6);          // Version needed
    cdHeader.writeUInt16LE(0, 8);           // General flag
    cdHeader.writeUInt16LE(0, 10);          // Compression
    cdHeader.writeUInt16LE(0, 12);          // Mod time
    cdHeader.writeUInt16LE(0, 14);          // Mod date
    cdHeader.writeUInt32LE(entry.crc, 16);  // CRC-32
    cdHeader.writeUInt32LE(entry.size, 20); // Compressed size
    cdHeader.writeUInt32LE(entry.size, 24); // Uncompressed size
    cdHeader.writeUInt16LE(entry.nameBuffer.length, 28);
    cdHeader.writeUInt16LE(0, 30);          // Extra length
    cdHeader.writeUInt16LE(0, 32);          // Comment length
    cdHeader.writeUInt16LE(0, 34);          // Disk num
    cdHeader.writeUInt16LE(0, 36);          // Internal attr
    cdHeader.writeUInt32LE(0, 38);          // External attr
    cdHeader.writeUInt32LE(entry.offset, 42);// Local header offset
    entry.nameBuffer.copy(cdHeader, 46);

    chunks.push(cdHeader);
    centralDirSize += cdHeader.length;
  }

  // End of central directory record
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // Signature
  eocd.writeUInt16LE(0, 4);          // Disk num
  eocd.writeUInt16LE(0, 6);          // Start disk
  eocd.writeUInt16LE(fileEntries.length, 8); // Entries on disk
  eocd.writeUInt16LE(fileEntries.length, 10); // Total entries
  eocd.writeUInt32LE(centralDirSize, 12);     // Central dir size
  eocd.writeUInt32LE(centralDirStart, 16);    // Central dir offset
  eocd.writeUInt16LE(0, 20);         // Comment length

  chunks.push(eocd);

  return Buffer.concat(chunks);
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

// Generate valid minimal Bodymovin Lottie JSON with colored animating shapes
function createLottieJson(name, primaryColor = [0.08, 0.5, 0.24]) {
  return JSON.stringify({
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 60,
    w: 500,
    h: 500,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Circle Shape',
        sr: 1,
        ks: {
          o: { k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 60, s: [360] }
            ]
          },
          p: { k: [250, 250, 0] },
          a: { k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [90, 90, 100], e: [110, 110, 100] },
              { t: 30, s: [110, 110, 100], e: [90, 90, 100] },
              { t: 60, s: [90, 90, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                d: 1,
                ty: 'el',
                s: { k: [160, 160] },
                p: { k: [0, 0] },
                nm: 'Ellipse'
              },
              {
                ty: 'st',
                c: { k: [...primaryColor, 0.4] },
                o: { k: 100 },
                w: { k: 8 },
                lc: 2,
                lj: 2,
                nm: 'Stroke'
              },
              {
                ty: 'fl',
                c: { k: [...primaryColor, 0.15] },
                o: { k: 100 },
                nm: 'Fill'
              },
              {
                ty: 'tr',
                p: { k: [0, 0] },
                a: { k: [0, 0] },
                s: { k: [100, 100] },
                r: { k: 0 },
                o: { k: 100 },
                sk: { k: 0 },
                sa: { k: 0 },
                nm: 'Transform'
              }
            ],
            nm: 'Group 1'
          }
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0
      }
    ]
  });
}

function generateLottieFile(animName, color) {
  const lottieJson = createLottieJson(animName, color);
  const manifestJson = JSON.stringify({
    version: '1.0.0',
    generator: 'KisanMitra Lottie Generator',
    animations: [
      {
        id: animName,
        speed: 1,
        loop: true,
        autoplay: true
      }
    ]
  });

  const files = [
    { name: 'manifest.json', content: manifestJson },
    { name: `animations/${animName}.json`, content: lottieJson }
  ];

  return createZip(files);
}

const outDir = path.join(__dirname, 'public', 'animations');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'farmer-home.lottie'), generateLottieFile('farmer-home', [0.08, 0.5, 0.24]));
fs.writeFileSync(path.join(outDir, 'farmer-scan.lottie'), generateLottieFile('farmer-scan', [0.1, 0.6, 0.3]));
fs.writeFileSync(path.join(outDir, 'farmer-rain.lottie'), generateLottieFile('farmer-rain', [0.12, 0.45, 0.75]));
fs.writeFileSync(path.join(outDir, 'farmer-market.lottie'), generateLottieFile('farmer-market', [0.85, 0.55, 0.1]));
fs.writeFileSync(path.join(outDir, 'farmer-voice.lottie'), generateLottieFile('farmer-voice', [0.55, 0.25, 0.75]));

console.log('✅ Generated 5 .lottie animation packages successfully in public/animations/');
