# 📋 Deployment Checklist - Colores del Sol Mini App

Complete this checklist before deploying to production.

## ✅ Pre-Deployment Tasks

### 1. Environment Setup
- [ ] All dependencies installed (`npm install`)
- [ ] `.env.local` created with valid API keys
- [ ] App runs successfully in development (`npm run dev`)
- [ ] Tested with multiple handles/platforms

### 2. Assets Creation
Create these files in the `/public` folder:

- [ ] **icon.png** - App icon (1024x1024px, PNG)
- [ ] **splash.png** - Splash screen (200x200px, PNG)
- [ ] **og-image.png** - Social sharing (1200x630px)
- [ ] **hero.png** - Hero image (1200x630px)
- [ ] **screenshot1.png** - App screenshot (1284x2778px portrait)
- [ ] **screenshot2.png** - App screenshot (1284x2778px portrait)
- [ ] **screenshot3.png** - App screenshot (1284x2778px portrait)

> 💡 Use [Mini App Assets Generator](https://www.miniappassets.com/) for properly formatted assets

### 3. Code Review
- [ ] No console.errors in production code
- [ ] All TODO comments resolved
- [ ] Error handling in place for all API calls
- [ ] Loading states implemented
- [ ] Mobile responsive design tested

### 4. API Keys & Quotas
- [ ] Talent Protocol API key is valid
- [ ] Gemini API key is valid
- [ ] Checked API rate limits/quotas
- [ ] Considered costs for expected traffic

## 🚀 Deployment Steps

### Step 1: Build & Test
```bash
# Build the production version
npm run build

# Test the production build locally
npm start
```

- [ ] Production build succeeds without errors
- [ ] App works correctly in production mode

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. [ ] Push code to GitHub/GitLab
2. [ ] Import project in Vercel dashboard
3. [ ] Connect repository
4. [ ] Deploy

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

- [ ] Deployment successful
- [ ] Got deployment URL

### Step 3: Configure Production Environment

In Vercel Dashboard > Settings > Environment Variables, add:

- [ ] `TALENT_PROTOCOL_API_KEY` = [your_key]
- [ ] `GEMINI_API_KEY` = [your_key]
- [ ] `NEXT_PUBLIC_URL` = [your_vercel_url]
- [ ] `NEXT_PUBLIC_OWNER_ADDRESS` = [your_base_account_address]

After adding, redeploy:
```bash
vercel --prod
```

### Step 4: Verify Deployment

- [ ] Visit your production URL
- [ ] Test complete user flow (select platform → enter handle → generate)
- [ ] Check browser console for errors
- [ ] Test on mobile device/viewport
- [ ] Verify manifest is accessible at `/.well-known/farcaster.json`

### Step 5: Generate Account Association

1. [ ] Visit [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
2. [ ] Enter your production URL
3. [ ] Click "Submit"
4. [ ] Click "Verify" and sign with your Base Account wallet
5. [ ] Copy the generated `accountAssociation` object
6. [ ] Update `app/.well-known/farcaster.json/route.ts`:
   ```typescript
   accountAssociation: {
     header: "eyJmaWQiOjk...", // Paste your values
     payload: "eyJkb21haW...",
     signature: "MHgxMGQwZGU...",
   }
   ```
7. [ ] Redeploy to production

### Step 6: Validate Mini App Configuration

1. [ ] Visit [Base Build Preview Tool](https://www.base.dev/preview)
2. [ ] Enter your production URL
3. [ ] Verify:
   - [ ] Embed preview displays correctly
   - [ ] Launch button works
   - [ ] Account association shows "Verified"
   - [ ] All metadata fields are populated

### Step 7: Final Testing

- [ ] Test app launch from Base Build preview
- [ ] Verify splash screen displays
- [ ] Complete full user flow in preview
- [ ] Check all error states work
- [ ] Test download functionality
- [ ] Verify social sharing metadata

## 📱 Publishing to Base App

### Step 1: Create a Post
- [ ] Open the Base app
- [ ] Create a new post
- [ ] Include your production URL
- [ ] Add engaging description about Colores del Sol
- [ ] Post!

### Step 2: Monitor
- [ ] Watch for embed to render
- [ ] Test launch from the post
- [ ] Monitor for user feedback

## 🔧 Post-Deployment

### Monitoring
- [ ] Set up Vercel Analytics (optional)
- [ ] Monitor API usage in Talent Protocol dashboard
- [ ] Monitor API usage in Google Cloud Console
- [ ] Check for error logs in Vercel

### Optimization
- [ ] Review performance metrics
- [ ] Optimize images if needed
- [ ] Check bundle size
- [ ] Consider adding analytics

### Maintenance
- [ ] Document any issues encountered
- [ ] Plan for API key rotation
- [ ] Set up monitoring alerts for quota limits

## 📊 Success Metrics

Track these after launch:
- [ ] Number of outfit generations
- [ ] Most popular platform
- [ ] Average generation time
- [ ] Error rate
- [ ] User retention

## 🆘 Troubleshooting

### Common Issues After Deployment

**Manifest not found**
- Check that `/.well-known/farcaster.json` is accessible
- Verify route file is in correct location
- Check Vercel build logs

**Account association failed**
- Ensure you're using the correct Base Account address
- Re-sign the manifest with the correct wallet
- Check signature format is correct

**Images not loading**
- Verify all image URLs are HTTPS
- Check images exist in `/public` folder
- Confirm `next.config.js` image domains config

**API errors in production**
- Double-check environment variables in Vercel
- Verify API keys are production-ready
- Check API quota hasn't been exceeded

## 📚 Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Base Mini Apps Docs](https://docs.base.org/mini-apps)
- [Base Build Preview Tool](https://www.base.dev/preview)
- [Talent Protocol Docs](https://docs.talentprotocol.com/)
- [Google Gemini Docs](https://ai.google.dev/gemini-api/docs)

---

## ✨ Ready to Launch?

Once all items are checked:
1. ✅ Deploy to production
2. ✅ Generate account association
3. ✅ Validate everything works
4. ✅ Post to Base app
5. 🎉 Celebrate your launch!

**Your Colores del Sol Mini App is ready to shine! 🌞**

