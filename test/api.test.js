const http = require('http');
const app = require('../server');

let server;
const TEST_PORT = 5099;

function request(options, postData = null, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        ...options,
        headers: {
          ...(contentType ? { 'Content-Type': contentType } : {}),
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
          ...(options.headers || {})
        }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve({ status: res.statusCode, headers: res.headers, body: parsed });
          } catch {
            resolve({ status: res.statusCode, headers: res.headers, body });
          }
        });
      }
    );

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// Construct a raw multipart/form-data body
function buildMultipartBody(fields, files) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  let body = '';

  for (const [key, value] of Object.entries(fields)) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    body += `${value}\r\n`;
  }

  for (const file of files) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${file.fieldname}"; filename="${file.filename}"\r\n`;
    body += `Content-Type: ${file.mimetype}\r\n\r\n`;
    body += file.content + '\r\n';
  }

  body += `--${boundary}--\r\n`;

  return {
    boundary,
    body: Buffer.from(body, 'binary')
  };
}

async function runTests() {
  console.log('🚀 Starting KisanMitra Backend Integration Tests...\n');
  let passed = 0;
  let failed = 0;

  server = app.listen(TEST_PORT);

  try {
    // Test 1: Health Check
    console.log('🧪 Test 1: GET /health');
    const healthRes = await request({ method: 'GET', path: '/health' });
    if (healthRes.status === 200 && healthRes.body.status === 'UP') {
      console.log('  ✅ PASSED: Health check returned UP\n');
      passed++;
    } else {
      console.error('  ❌ FAILED:', healthRes);
      failed++;
    }

    // Test 2: Root Info
    console.log('🧪 Test 2: GET /');
    const rootRes = await request({ method: 'GET', path: '/' });
    if (rootRes.status === 200 && rootRes.body.version) {
      console.log(`  ✅ PASSED: Root info API version ${rootRes.body.version}\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED:', rootRes);
      failed++;
    }

    // Test 3: Weather & Irrigation API
    console.log('🧪 Test 3: GET /api/weather (Dry scenario: lat=28.61, lon=77.20, daysSinceWatered=3)');
    const weatherRes = await request({
      method: 'GET',
      path: '/api/weather?lat=28.6139&lon=77.2090&daysSinceWatered=3'
    });
    if (weatherRes.status === 200 && weatherRes.body.success && weatherRes.body.data.recommendation) {
      console.log(`  ✅ PASSED: Weather Decision -> "${weatherRes.body.data.recommendation.decision}" (${weatherRes.body.data.recommendation.action})\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED:', weatherRes);
      failed++;
    }

    // Test 3B: Weather & Irrigation (Heavy Rain Simulation Verification)
    console.log('🧪 Test 3B: Weather Service "Do Not Irrigate" Algorithm Validation');
    const { generateFallbackForecast, analyzeIrrigationSchedule } = require('../src/services/weatherService');
    const rainForecast = generateFallbackForecast(19.0, 72.8, true); // simulate heavy rain
    const rainAnalysis = analyzeIrrigationSchedule(rainForecast, 5);
    if (rainAnalysis.recommendation.action === 'DO_NOT_IRRIGATE' && rainAnalysis.recommendation.decision.toLowerCase().includes('do not irrigate')) {
      console.log(`  ✅ PASSED: Rain Forecast Triggered -> "${rainAnalysis.recommendation.decision}" (${rainAnalysis.recommendation.action}) Reason: ${rainAnalysis.recommendation.reason}\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED: Rain algorithm did not return DO_NOT_IRRIGATE:', rainAnalysis);
      failed++;
    }

    // Test 4: Mandi Market Prices API
    console.log('🧪 Test 4: GET /api/mandi (cropName=Wheat, district=Nashik)');
    const mandiRes = await request({
      method: 'GET',
      path: '/api/mandi?cropName=Wheat&district=Nashik&lat=19.9975&lon=73.7898'
    });
    if (
      mandiRes.status === 200 &&
      mandiRes.body.success &&
      mandiRes.body.data.top3NearestMandis.length > 0
    ) {
      const topMandi = mandiRes.body.data.top3NearestMandis[0];
      console.log(`  ✅ PASSED: Top Mandi "${topMandi.marketName}" with Modal Price: ₹${topMandi.modalPrice}/Quintal (Distance: ${topMandi.distanceKm} km)\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED:', mandiRes);
      failed++;
    }

    // Test 5: Voice API with Base64 audioBlob
    console.log('🧪 Test 5: POST /api/voice (Regional Audio Query)');
    const dummyBase64Audio = 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
    const voicePayload = JSON.stringify({
      audioBlob: dummyBase64Audio,
      sourceLanguage: 'hi'
    });
    const voiceRes = await request({ method: 'POST', path: '/api/voice' }, voicePayload);
    if (
      voiceRes.status === 200 &&
      voiceRes.body.success &&
      voiceRes.body.data.transcribedText &&
      voiceRes.body.data.response?.audioBlob
    ) {
      console.log(`  ✅ PASSED: Voice Transcribed: "${voiceRes.body.data.transcribedText}"`);
      console.log(`            Response: "${voiceRes.body.data.response.answerRegional}"\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED:', voiceRes);
      failed++;
    }

    // Test 6: Vision API with Multipart Form Data Image
    console.log('🧪 Test 6: POST /api/vision (Crop Disease Detection)');
    // 1x1 transparent GIF buffer
    const mockImageBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    const multipart = buildMultipartBody(
      { cropType: 'Tomato' },
      [
        {
          fieldname: 'image',
          filename: 'leaf_sample.jpg',
          mimetype: 'image/jpeg',
          content: mockImageBuffer.toString('binary')
        }
      ]
    );

    const visionRes = await request(
      {
        method: 'POST',
        path: '/api/vision',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${multipart.boundary}`
        }
      },
      multipart.body,
      null
    );

    if (
      visionRes.status === 200 &&
      visionRes.body.success &&
      visionRes.body.data.diseaseName &&
      visionRes.body.data.treatmentPlan
    ) {
      console.log(`  ✅ PASSED: Detected Disease: "${visionRes.body.data.diseaseName}" (Confidence: ${Math.round(visionRes.body.data.confidenceScore * 100)}%)`);
      console.log(`            Organic Treatment: ${visionRes.body.data.treatmentPlan.organic[0]}\n`);
      passed++;
    } else {
      console.error('  ❌ FAILED:', visionRes);
      failed++;
    }

    // Test 7: Error handling for 404
    console.log('🧪 Test 7: 404 Route Handling');
    const notFoundRes = await request({ method: 'GET', path: '/api/nonexistent' });
    if (notFoundRes.status === 404 && !notFoundRes.body.success) {
      console.log('  ✅ PASSED: 404 returned properly\n');
      passed++;
    } else {
      console.error('  ❌ FAILED:', notFoundRes);
      failed++;
    }

    console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Test Execution Error:', error);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
