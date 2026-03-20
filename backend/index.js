const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API!' });
});

// POST /api/generate — free AI image generation via Pollinations.ai
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, width = 1024, height = 1024 } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty prompt is required.' });
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    // Verify the image is reachable by making a HEAD request
    const headRes = await fetch(imageUrl, { method: 'HEAD' });
    if (!headRes.ok) {
      return res.status(502).json({ error: 'Image generation service is currently unavailable.' });
    }

    return res.json({
      success: true,
      imageUrl,
      prompt: prompt.trim(),
      width,
      height,
    });
  } catch (err) {
    console.error('Image generation error:', err);
    return res.status(500).json({ error: 'Failed to generate image. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
