require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const POLLINATIONS_BASE_URL =
  process.env.POLLINATIONS_BASE_URL || 'https://image.pollinations.ai';

// Allow all origins in dev; tighten in production via ALLOWED_ORIGIN env var
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the GenPix API!' });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/generate
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, width = 1024, height = 1024 } = req.body ?? {};

    // --- Validation ---
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty prompt is required.' });
    }

    const w = Math.min(Math.max(Number(width) || 1024, 256), 2048);
    const h = Math.min(Math.max(Number(height) || 1024, 256), 2048);

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 1_000_000);
    const imageUrl = `${POLLINATIONS_BASE_URL}/prompt/${encodedPrompt}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=flux`;

    console.log(`[generate] prompt="${prompt.trim().slice(0, 60)}" size=${w}x${h} seed=${seed}`);

    // 90-second timeout — Pollinations can be slow
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);

    let imageRes;
    try {
      imageRes = await fetch(imageUrl, {
        headers: { 'User-Agent': 'GenPix/1.0' },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!imageRes.ok) {
      const body = await imageRes.text().catch(() => '');
      console.error(`[generate] Pollinations error ${imageRes.status}:`, body.slice(0, 200));
      return res.status(502).json({
        error: `Image generation service returned ${imageRes.status}. Please try again.`,
      });
    }

    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

    // Guard: make sure we're streaming an image, not an error page
    if (!contentType.startsWith('image/')) {
      const body = await imageRes.text().catch(() => '');
      console.error('[generate] Non-image content-type:', contentType, body.slice(0, 200));
      return res.status(502).json({ error: 'Image generation service returned unexpected data.' });
    }

    const buffer = await imageRes.arrayBuffer();

    if (!buffer.byteLength) {
      return res.status(502).json({ error: 'Received empty image from generation service.' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Generated-Seed', seed);

    console.log(`[generate] success — ${buffer.byteLength} bytes`);
    return res.send(Buffer.from(buffer));

  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[generate] timed out after 90s');
      return res.status(504).json({ error: 'Image generation timed out after 90 seconds. Please try again.' });
    }

    // Node fetch / undici connection errors
    const cause = err.cause?.code || err.code || '';
    if (cause === 'UND_ERR_CONNECT_TIMEOUT' || cause === 'ECONNREFUSED' || cause === 'ENOTFOUND') {
      console.error('[generate] upstream connection error:', cause);
      return res.status(502).json({ error: 'Could not reach the image generation service. Please try again.' });
    }

    console.error('[generate] unexpected error:', err);
    return res.status(500).json({ error: 'Failed to generate image. Please try again.' });
  }
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`GenPix backend running on http://localhost:${PORT}`);
});
