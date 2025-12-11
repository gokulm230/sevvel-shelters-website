# Quick Start: Switch Supabase Account

## **⚡ 3-Minute Setup**

### **Step 1: Get Credentials**
- Go to [supabase.com](https://supabase.com) → Your new project
- Settings → API → Copy:
  - **Project URL** 
  - **Anon Key**

### **Step 2: Update `.env.local`**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### **Step 3: Set Up Database**
- In Supabase: Go to **SQL Editor**
- Create **+ New Query**
- Copy entire `supabase/setup.sql` file
- Click **Run**
- ✅ Done!

### **Step 4: Test**
```bash
npm run dev
# Visit http://localhost:3000
```

---

## **What Gets Created in New Account:**

```
✅ projects table
✅ Row Level Security policies
✅ project-images storage bucket
✅ Storage access policies
```

---

## **Configuration Files Modified:**

| File | Changes |
|------|---------|
| `.env.local` | URL & Anon Key |
| `supabase/setup.sql` | Run in SQL Editor (not file modification) |

---

## **That's it! Your website is now connected to the new Supabase account.** 🎉
