# Colores del Sol 🌞

Transform your profile picture with vibrant "Colores del Sol" colors - featuring bright reds, oranges, yellows, and purples!

A Base Mini App that fetches your social media avatar and generates a stylish outfit using AI image generation.

## Features

- 🎨 AI-powered outfit generation using Google Gemini 2.5 Flash
- 🐦 Twitter profile picture transformation
- 🖼️ Direct avatar fetching using [Unavatar.io](https://unavatar.io) (no API keys needed!)
- 📱 Optimized for Base App as a Mini App
- 🎭 Beautiful, responsive UI with Tailwind CSS
- ⚡ Fast and efficient image processing
- ✨ Built-in Twitter sharing with pre-filled text

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs**: 
  - Google Gemini 2.5 Flash (AI image generation)
  - [Unavatar.io](https://unavatar.io) (Twitter avatars - free, no API key!)
- **Mini App SDK**: @farcaster/miniapp-sdk (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikey))
- That's it! No other API keys needed 🎉

### Installation

1. **Clone the repository** (or you're already here!)

2. **Install dependencies**:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_OWNER_ADDRESS=0x...
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
raave_app/
├── app/
│   ├── api/
│   │   ├── resolve-identity/     # Talent Protocol integration
│   │   └── generate-outfit/      # Gemini AI integration
│   ├── .well-known/
│   │   └── farcaster.json/       # Mini app manifest
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main app page
│   └── globals.css               # Global styles
├── components/
│   ├── PlatformSelector.tsx      # Platform selection UI
│   ├── HandleInput.tsx           # Handle input with validation
│   ├── LoadingState.tsx          # Loading animations
│   └── ResultsDisplay.tsx        # Results comparison view
├── lib/
│   ├── talent-api.ts             # Talent Protocol client
│   ├── gemini-api.ts             # Gemini AI client
│   └── utils.ts                  # Helper functions
└── public/                       # Static assets (add your images here)
```

## Required Assets

Create these images in the `/public` folder:

1. **icon.png** - App icon (1024x1024px, PNG)
2. **splash.png** - Splash screen (200x200px recommended, PNG)
3. **raave-banner.png** - Social sharing image (1500x500px, PNG) - Currently in use
4. **hero.png** - Hero image (1200x630px, PNG/JPG)
5. **screenshot1.png, screenshot2.png, screenshot3.png** - App screenshots (1284x2778px portrait, PNG)

> **Tip**: Use [Mini App Assets Generator](https://www.miniappassets.com/) to generate properly formatted assets.

## Usage

1. **Enter a Twitter handle** (without the @ symbol)
2. **Click "Style Me!"**
3. **Wait for the magic** ✨
   - The app fetches your Twitter avatar via Unavatar.io
   - Gemini AI transforms it with Colores del Sol colors
4. **Download or share on Twitter** with one click!

## Deploying as a Mini App

### 1. Deploy to Vercel

```bash
npm run build
# Deploy to Vercel
```

### 2. Update Environment Variables

In Vercel, add your production environment variables:
- `TALENT_PROTOCOL_API_KEY`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_URL` (your Vercel URL)
- `NEXT_PUBLIC_OWNER_ADDRESS` (your Base Account address)

### 3. Generate Account Association

1. Visit [Base Build Preview Tool](https://www.base.dev/preview?tab=account)
2. Enter your deployed URL
3. Click "Verify" and sign with your Base Account
4. Copy the generated `accountAssociation` fields
5. Update `app/.well-known/farcaster.json/route.ts` with the values

### 4. Publish Your Mini App

Create a post in the Base app with your app's URL to publish!

## API Endpoints

### POST /api/resolve-identity

Resolves a social media handle to a Talent Protocol profile.

**Request**:
```json
{
  "handle": "vitalik",
  "platform": "twitter"
}
```

**Response**:
```json
{
  "success": true,
  "profile": {
    "id": "...",
    "displayName": "Vitalik Buterin",
    "imageUrl": "https://...",
    "bio": "..."
  }
}
```

### POST /api/generate-outfit

Generates a Colores del Sol outfit from an avatar URL.

**Request**:
```json
{
  "imageUrl": "https://..."
}
```

**Response**:
```json
{
  "success": true,
  "image": "base64_encoded_image_data"
}
```

## Error Handling

The app handles these error scenarios:
- ❌ Profile not found on Talent Protocol
- ❌ Profile has no avatar
- ❌ Invalid handle format
- ❌ API request failures
- ❌ Image generation failures

## Development

### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - feel free to use this project for your own Mini Apps!

## Resources

- [Talent Protocol API Docs](https://docs.talentprotocol.com/)
- [Google Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Base Mini Apps Docs](https://docs.base.org/mini-apps)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

For issues or questions:
- Check the documentation in the `/docs` folders
- Review the API error messages in the console
- Ensure all API keys are valid and have proper permissions

---

Built with ❤️ using Talent Protocol, Google Gemini, and Base Mini Apps.

