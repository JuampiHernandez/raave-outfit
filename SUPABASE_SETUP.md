# Supabase Setup Guide

This guide will help you set up Supabase for the RAAVE Outfitter app.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in the details:
   - **Name**: RAAVE Outfitter
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is perfect for getting started
4. Click "Create new project" and wait for it to initialize (~2 minutes)

### 2. Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL

This will create:
- ✅ `outfits` table to store generated images
- ✅ Indexes for fast lookups
- ✅ Row Level Security policies

### 3. Get Your API Credentials

1. Go to **Project Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...` (long string)

### 4. Update Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. Also add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 5. Restart the Dev Server

```bash
npm run dev
```

## ✅ Verify It's Working

1. Go to http://localhost:3000
2. Generate an outfit for a Twitter handle (e.g., `elonmusk`)
3. Go to the **Gallery** page - you should see your generated outfit!
4. Try searching for the same handle again - it should load instantly from cache

## 📊 Database Structure

### `outfits` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `handle` | TEXT | Twitter handle (unique) |
| `platform` | TEXT | Social platform (always 'twitter' for now) |
| `style` | TEXT | Assigned rave style |
| `original_image_url` | TEXT | Original avatar URL (nullable) |
| `generated_image_base64` | TEXT | Generated outfit image (base64) |
| `created_at` | TIMESTAMPTZ | When created |
| `updated_at` | TIMESTAMPTZ | Last update |

## 🔐 Security

The database uses Row Level Security (RLS) with these policies:
- ✅ **Read**: Anyone can view outfits (for gallery)
- ✅ **Insert/Update**: Anyone can create/update outfits

**For production**, you should:
1. Add authentication
2. Restrict write operations to authenticated users
3. Add rate limiting

## 📤 Manual Upload API

For handles that fail avatar fetching, you can manually upload outfits:

```bash
curl -X POST http://localhost:3000/api/upload-outfit \
  -H "Content-Type: application/json" \
  -d '{
    "handle": "username",
    "style": "STREET HYPEBEAST",
    "imageBase64": "base64_encoded_image_here"
  }'
```

## 🎨 Features Enabled

### 1. **Caching**
- First search: Generates new outfit (slow, ~20-30 seconds)
- Subsequent searches: Returns cached result (instant!)

### 2. **Gallery**
- Visit `/gallery` to see all generated outfits
- Automatically updates when new outfits are created
- Shows handle, style, and creation date

### 3. **Manual Upload**
- For profiles that can't be fetched automatically
- Use the `/api/upload-outfit` endpoint
- Upload your own styled images

## 🐛 Troubleshooting

### "Database features will be disabled" Warning
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local`
- Restart the dev server after adding env variables

### Gallery Shows No Outfits
- Check Supabase dashboard → Table Editor → `outfits` table
- Verify the table was created correctly
- Try generating a new outfit

### Insert/Update Fails
- Check RLS policies in Supabase dashboard
- Verify the SQL schema was executed correctly
- Check browser console for detailed errors

## 💡 Next Steps

1. **Add Authentication**: Restrict who can generate outfits
2. **Add Image Storage**: Store images in Supabase Storage instead of base64 in database (more efficient)
3. **Add Pagination**: For when you have hundreds of outfits
4. **Add Search/Filter**: Filter gallery by style, date, handle

---

Need help? Check the [Supabase Documentation](https://supabase.com/docs) or open an issue!

