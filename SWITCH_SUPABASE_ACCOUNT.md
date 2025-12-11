# Switch Supabase Account - Complete Guide

## Overview
This guide will help you switch the Sevvel Shelters website from the current Supabase account to a new one.

---

## **Step 1: Get New Supabase Credentials**

1. Go to [supabase.com](https://supabase.com)
2. Log in to your **NEW** Supabase account
3. Create a new project or select an existing one
4. Navigate to **Project Settings** → **API** (left sidebar)
5. Copy the following:
   - **Project URL** - looks like: `https://xxxxxxxxx.supabase.co`
   - **Anon Key** - a long JWT token starting with `eyJ...`

---

## **Step 2: Update Environment Variables**

Edit the `.env.local` file in your project root:

```bash
# File: .env.local

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_NEW_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEW_ANON_KEY
```

**Replace:**
- `YOUR_NEW_PROJECT_ID` - with your actual project ID from the URL
- `YOUR_NEW_ANON_KEY` - with your actual Anon Key

---

## **Step 3: Set Up Database Schema**

Your new Supabase account needs the database tables and policies. Follow these steps:

### **Option A: Using Supabase SQL Editor (Easiest)**

1. In your new Supabase project, go to **SQL Editor**
2. Click **+ New Query**
3. Copy and paste the entire contents of `supabase/setup.sql`
4. Click **Run**

The script will create:
- ✅ `projects` table (for real estate projects)
- ✅ Row Level Security policies
- ✅ Storage bucket for project images
- ✅ Storage access policies

### **Option B: Using Migration Script**

```bash
# Run the setup script
supabase db push --db-url "postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres"
```

---

## **Step 4: Verify Configuration**

### **Test Supabase Connection**

1. Open your terminal in the project directory
2. Run: `npm run dev`
3. Visit `http://localhost:3000/admin`
4. Try to load projects - if they display, the connection works!

### **Debugging**

If you see errors, check:

```bash
# Check if environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## **Step 5: Set Up Authentication (if using Admin Login)**

If you need admin authentication:

1. In your new Supabase project, go to **Authentication** → **Providers**
2. Enable your preferred provider (Email, Google, etc.)
3. Configure the redirect URL: `http://localhost:3000/auth/callback`

---

## **Step 6: Update Storage Bucket (if needed)**

If you want to upload project images:

1. In Supabase, go to **Storage**
2. Create a bucket named `project-images`
3. Make it **public** for public viewing
4. Set the appropriate access policies

---

## **Step 7: Migrate Old Data (Optional)**

If you have existing projects in the old account:

### **Export from Old Account:**
```bash
# Use Supabase CLI to export data
supabase db dump --db-url "postgresql://OLD_CONNECTION_STRING" > backup.sql
```

### **Import to New Account:**
```bash
# Import the backup
supabase db push --db-url "postgresql://NEW_CONNECTION_STRING" < backup.sql
```

---

## **Important Environment Variables**

These variables are used throughout the application:

| Variable | Purpose | Visibility |
|----------|---------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public (browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous key for database queries | Public (browser) |

⚠️ **Note:** The `NEXT_PUBLIC_` prefix means these are exposed to the browser. This is intentional for public database access. Never include admin keys with this prefix.

---

## **Files That Use Supabase**

These files reference Supabase and should work automatically once credentials are updated:

- `lib/supabase.ts` - Server-side Supabase client
- `lib/supabase-browser.ts` - Browser-side Supabase client
- `app/admin/projects/page.tsx` - Admin projects page
- `hooks/use-projects.ts` - Projects data hook

---

## **Quick Checklist**

- [ ] Got new Supabase credentials (URL + Anon Key)
- [ ] Updated `.env.local` with new credentials
- [ ] Ran `setup.sql` in new Supabase SQL Editor
- [ ] Verified tables exist in new account
- [ ] Tested connection by running `npm run dev`
- [ ] Checked admin page loads project data
- [ ] (Optional) Set up authentication providers

---

## **Troubleshooting**

### **"Supabase not configured" error**
- Check `.env.local` has correct values
- Restart the dev server: `npm run dev`
- Check environment variables loaded: `node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"`

### **"Permission denied" on database queries**
- Verify Row Level Security policies are set up
- Check that `visible = true` on projects
- Ensure Anon Key has correct permissions

### **Images not uploading**
- Verify `project-images` bucket exists
- Check bucket is marked **Public**
- Verify storage policies allow uploads

### **Projects table not found**
- Make sure you ran the entire `setup.sql` script
- Check SQL execution had no errors
- Verify in Supabase Tables editor that the table exists

---

## **Additional Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Guide](https://supabase.com/docs/guides/cli)
- [NextJS + Supabase Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## **Need Help?**

If you encounter any issues:
1. Check the error message carefully
2. Verify credentials in `.env.local`
3. Check browser console for network errors
4. Ensure database tables exist in new Supabase account
5. Restart the development server
