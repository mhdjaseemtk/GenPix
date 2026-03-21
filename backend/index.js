const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GenPix API!' });
});

// POST /api/generate — free AI image generation via Pollinations.ai
// Returns the image as a proxied blob to avoid CORS/403 issues
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, width = 1024, height = 1024 } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty prompt is required.' });
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    // Fetch the image from Pollinations on the server side (avoids browser CORS/403)
    const imageRes = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'GenPix/1.0',
      },
    });

    if (!imageRes.ok) {
      return res.status(502).json({ error: 'Image generation service is currently unavailable.' });
    }

    // Stream the image back to the client
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-cache');

    const buffer = await imageRes.arrayBuffer();
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Image generation error:', err);
    return res.status(500).json({ error: 'Failed to generate image. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`GenPix backend running on http://localhost:${PORT}`);
});
