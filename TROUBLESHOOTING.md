# 🔧 Troubleshooting Guide

## 404 Error on API Routes

If you're getting 404 errors for `/api/resolve-identity` or `/api/generate-outfit`:

### Solution 1: Restart the Dev Server
Next.js sometimes needs a restart after creating new API routes.

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Solution 2: Clear Next.js Cache
```bash
# Stop the dev server
# Delete the .next folder
rm -rf .next

# Restart
npm run dev
```

### Solution 3: Check Environment Variables
Make sure your `.env.local` file exists and has the required keys:

```env
TALENT_PROTOCOL_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_OWNER_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: After adding/changing `.env.local`, you MUST restart the dev server!

## Profile Not Found Error

If you get "Profile not found on Talent Protocol":

1. **Try a different handle**: Not all social media handles are indexed on Talent Protocol
2. **Try a different platform**: The same person might be on multiple platforms
3. **Check the handle format**: 
   - ✅ Correct: `vitalik` 
   - ❌ Wrong: `@vitalik`

### Good Test Handles to Try:

**Twitter/X:**
- `vitalik`
- `naval`
- `balajis`

**Farcaster:**
- `dwr.eth`
- `v`
- `jessepollak`

**Lens:**
- `stani.lens`
- `lens`

**GitHub:**
- `vitalik`
- `torvalds`

## Gemini API Errors

### "Failed to generate outfit"

1. **Check API Key**: Make sure your Gemini API key is valid
2. **Check Quota**: Visit https://aistudio.google.com to check your quota
3. **Image URL Issues**: The profile picture URL might not be accessible

### Rate Limits
- Free tier: 15 requests per minute
- If you hit the limit, wait 1 minute and try again

## Common Issues

### "CORS Error"
This shouldn't happen with Next.js API routes, but if it does:
- Make sure you're accessing the app at `http://localhost:3000`
- Don't access it via IP address

### TypeScript Errors
```bash
# Restart TypeScript server in your IDE
# Or run
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Debug Mode

To see detailed logs, check your terminal where `npm run dev` is running. You'll see:
- `Searching Talent Protocol with identity: twitter:vitalik`
- `Talent API Response: { total: X, results: Y }`

If you don't see these logs, the API route isn't being called.

## Still Having Issues?

1. Check the browser console for detailed error messages
2. Check the terminal where `npm run dev` is running
3. Verify all files were created correctly:

```bash
# Check if API routes exist
ls -la app/api/resolve-identity/route.ts
ls -la app/api/generate-outfit/route.ts

# Check if lib files exist
ls -la lib/talent-api.ts
ls -la lib/gemini-api.ts
```

## Verification Checklist

Before running the app, verify:

- [ ] Node.js is installed (`node --version` should show v20.x)
- [ ] Dependencies are installed (`node_modules` folder exists)
- [ ] `.env.local` file exists with valid API keys
- [ ] Dev server is running (`npm run dev`)
- [ ] Accessing at `http://localhost:3000`
- [ ] Browser console shows no errors on page load

---

**Quick Fix for Most Issues:**
```bash
# Stop server (Ctrl+C)
rm -rf .next
npm install
npm run dev
```

