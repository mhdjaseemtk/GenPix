require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.POLLINATIONS_API_KEY || '';
const POLLINATIONS_BASE_URL =
  process.env.POLLINATIONS_BASE_URL || 'https://image.pollinations.ai';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GenPix API!' });
});

// POST /api/generate - AI image generation via Pollinations.ai
// Returns the image as a proxied blob to avoid CORS issues
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, width = 1024, height = 1024 } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty prompt is required.' });
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `${POLLINATIONS_BASE_URL}/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

    // 60-second timeout to avoid hanging requests
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    let imageRes;
    try {
      imageRes = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'GenPix/1.0',
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!imageRes.ok) {
      const errorBody = await imageRes.text().catch(() => '');
      console.error(`Pollinations error: ${imageRes.status} ${imageRes.statusText}`, errorBody);
      return res.status(502).json({ error: 'Image generation service is currently unavailable.' });
    }

    // Stream the image back to the client
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-cache');

    const buffer = await imageRes.arrayBuffer();
    return res.send(Buffer.from(buffer));
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Image generation timed out after 60s');
      return res.status(504).json({ error: 'Image generation timed out. Please try again.' });
    }

    if (err.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
      console.error('Image generation upstream connection timed out:', err.cause);
      return res.status(504).json({
        error: 'The image provider did not respond in time. Please try again in a moment.',
      });
    }

    console.error('Image generation error:', err);
    return res.status(500).json({ error: 'Failed to generate image. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`GenPix backend running on http://localhost:${PORT}`);
});
