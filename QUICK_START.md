# 🚀 Quick Start Guide - Colores del Sol

Get your app running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get Your API Key

### Google Gemini API Key (Only one needed!)
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

That's it! No other API keys needed 🎉

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_OWNER_ADDRESS=0x0000000000000000000000000000000000000000
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## Step 5: Test the App

1. Enter a Twitter handle (e.g., "vitalik" without the @)
2. Click "Style Me!" 🎨
3. Wait for your Colores del Sol transformation!
4. Share it on Twitter with one click! 🐦

## What Happens Behind the Scenes?

1. **Avatar Fetching**: Gets the profile picture from Unavatar.io (free service, no API needed!)
2. **AI Generation**: Gemini transforms the image with Colores del Sol colors
3. **Display Results**: Shows before/after comparison
4. **Share**: One-click Twitter sharing with pre-filled message

## Common Issues

### "Profile not found"
- Make sure the Twitter handle exists and is spelled correctly
- Remove the @ symbol if you included it
- The Twitter profile must have a public avatar image
- Try a well-known handle like "vitalik" or "elonmusk" to test

### "No avatar available"
- This profile doesn't have a profile picture
- Try a different profile

### "Failed to generate outfit"
- Check your Gemini API key is valid
- Ensure you have sufficient API quota
- The image URL might not be accessible

## Next Steps

### For Development
- Modify the color scheme in `tailwind.config.ts`
- Customize the AI prompt in `lib/gemini-api.ts`
- Add more platforms in `components/PlatformSelector.tsx`

### For Production
1. **Create Assets**: Add images to `/public` folder
   - icon.png (1024x1024)
   - splash.png (200x200)
   - og-image.png (1200x630)
   - screenshot images

2. **Deploy to Vercel**:
   ```bash
   npm run build
   # Then deploy via Vercel dashboard or CLI
   ```

3. **Set Up Mini App**:
   - Visit https://www.base.dev/preview?tab=account
   - Generate account association
   - Update manifest in `app/.well-known/farcaster.json/route.ts`

4. **Publish**:
   - Post your app URL in the Base app
   - Your Mini App is now live!

## Project Structure

```
📁 app/
  📁 api/
    📁 resolve-identity/    ← Talent Protocol API
    📁 generate-outfit/     ← Gemini AI API
  📁 .well-known/
    📁 farcaster.json/      ← Mini App Manifest
  📄 page.tsx              ← Main app UI
  📄 layout.tsx            ← Metadata & SDK

📁 components/             ← React components
📁 lib/                    ← API clients & utils
📁 public/                 ← Static assets (add images here!)
```

## API Costs (as of 2025)

### Talent Protocol
- **Free tier**: Available for testing
- Search requests are included

### Google Gemini
- **Free tier**: 15 requests per minute
- **Gemini 2.5 Flash Image Preview**: 
  - Input: $0.30 per 1M tokens
  - Output: $0.039 per image
- Each outfit generation ≈ $0.04-0.05

### Estimated Costs
- 100 outfit generations ≈ $4-5
- 1,000 outfit generations ≈ $40-50

## Tips for Success

1. **Test with various handles** from different platforms
2. **Check console logs** for detailed error messages
3. **Use the free tier** for development and testing
4. **Monitor API usage** in the respective dashboards
5. **Create beautiful assets** for better Mini App presentation

## Need Help?

- 📖 Check the main README.md for detailed documentation
- 🐛 Look at error messages in the browser console
- 🔑 Verify your API keys are correct and active
- 📚 Review the docs folders for API references

---

Happy building! 🌞✨

