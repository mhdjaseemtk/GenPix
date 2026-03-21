<p align="center">
  <span style="font-size:2rem">✦</span>
</p>

<h1 align="center">GenPix — AI Image Generator</h1>

<p align="center">
  <strong>Create stunning, high-quality images from text prompts — instantly and for free.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Overview

**GenPix** is a full-stack AI image generation web application that lets users turn natural-language prompts into beautiful visuals in seconds. Powered by [Pollinations.ai](https://pollinations.ai) on the backend, GenPix provides a sleek, modern interface for creating, previewing, and downloading AI-generated images — no design skills or API keys required.

---

## 🖼️ Features

| Feature | Description |
|---|---|
| **Prompt-to-Image** | Describe any scene and get a high-quality AI-generated image in seconds |
| **Multiple Aspect Ratios** | Choose from Square (1:1), Landscape (16:9), Portrait (9:16), and Wide (21:9) |
| **Instant Download** | Download generated images as PNG with a single click |
| **Prompt Suggestions** | Pre-built creative prompts to spark inspiration |
| **Circular Gallery** | Interactive 3D circular image gallery on the landing page (powered by OGL / WebGL) |
| **Dark Theme** | Premium dark UI with lime-green accents and smooth animations |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile devices |
| **Zero Auth Required** | No sign-up, no API key — start generating immediately |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [OGL](https://github.com/oframe/ogl) | WebGL-based circular gallery |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Primary font |
| [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) | Accent pixel font |

### Backend
| Technology | Purpose |
|---|---|
| [Express.js 5](https://expressjs.com/) | HTTP server & API routing |
| [Pollinations.ai](https://pollinations.ai/) | Free AI image generation (no API key) |
| [CORS](https://www.npmjs.com/package/cors) | Cross-origin request handling |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the Repository

```bash
git clone https://github.com/mhdjaseemtk/flight-landing.git
cd flight-landing
```

### 2. Set Up the Backend

```bash
cd backend
npm install
npm run dev
```

The backend server will start at **http://localhost:5000**.

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server will start at **http://localhost:3000**.

### 4. Open the App

Navigate to [http://localhost:3000](http://localhost:3000) in your browser. Click **"Get Started"** or go to [/generate](http://localhost:3000/generate) to start creating images!

### Environment Variables (Optional)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Backend server port |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend API URL used by the frontend |

To connect the frontend to a deployed backend, create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=https://your-deployed-backend.com
```

---

## 📁 Project Structure

```
GenPix/
├── backend/
│   ├── index.js              # Express server & /api/generate endpoint
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── public/               # Static assets (gallery images 1.jpg–7.jpg)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx    # Root layout (Navbar + Footer)
│   │   │   ├── page.tsx      # Landing page (Hero + Gallery)
│   │   │   ├── globals.css   # Global styles, theme tokens, animations
│   │   │   ├── generate/
│   │   │   │   └── page.tsx  # AI image generation page
│   │   │   ├── about/        # About page
│   │   │   ├── pricing/      # Pricing page
│   │   │   ├── blog/         # Blog page
│   │   │   └── contact/      # Contact page
│   │   │
│   │   └── components/
│   │       ├── Navbar.tsx          # Sticky navigation bar
│   │       ├── HeroSection.tsx     # Hero banner with CTA
│   │       ├── FeaturesSection.tsx # Circular gallery showcase
│   │       ├── CircularGallery.tsx # WebGL 3D circular gallery (OGL)
│   │       ├── ImageCarousel.tsx   # Image carousel component
│   │       └── Footer.tsx         # Site footer
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
└── README.md
```

---

## 🔌 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{ "message": "Welcome to the GenPix API!" }
```

### `POST /api/generate`

Generate an AI image from a text prompt.

**Request Body:**
```json
{
  "prompt": "A futuristic city skyline at sunset with flying cars",
  "width": 1024,
  "height": 1024
}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `prompt` | `string` | ✅ | — | Text description of the desired image |
| `width` | `number` | ❌ | `1024` | Output image width in pixels |
| `height` | `number` | ❌ | `1024` | Output image height in pixels |

**Success Response:** `200 OK` — Returns the generated image as a binary blob (`image/jpeg`).

**Error Responses:**

| Status | Description |
|---|---|
| `400` | Missing or empty prompt |
| `502` | Image generation service unavailable |
| `500` | Internal server error |

---

## 🎨 Design System

GenPix uses a carefully crafted design system built on **Tailwind CSS 4** with custom theme tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#a3e635` | Primary lime-green accent |
| `--color-accent-dim` | `#84cc16` | Subdued accent variant |
| `--color-bg` | `#090909` | App background |
| `--color-surface` | `#111111` | Card / elevated surfaces |
| `--color-border` | `rgba(255,255,255,0.08)` | Subtle borders |
| `--font-sans` | Space Grotesk | Primary typeface |
| `--font-pixel` | Pixelify Sans | Decorative pixel font |

### Custom Animations

- **`animate-spin-slow`** — Slow rotating icon in the navbar
- **`animate-fade-up`** — Staggered fade-in entrance animations
- **`animate-shimmer`** — Loading skeleton shimmer effect
- **`animate-pulse-dot`** — Pulsing status indicator
- **`animate-beam`** — Glowing beam effect

---

## 🧑‍💻 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m "Add amazing feature"`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Tips

- The backend uses `node --watch` compatible syntax — restart the server after changes, or use a tool like `nodemon`.
- The frontend supports hot-reload via Next.js dev server.
- All styling should use Tailwind CSS utility classes and the design tokens defined in `globals.css`.

---

## 📄 License

This project is licensed under the **ISC License**. See the backend `package.json` for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mhdjaseemtk">mhdjaseemtk</a>
</p>