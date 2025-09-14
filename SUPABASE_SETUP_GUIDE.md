# Supabase Setup Instructions

Follow these steps to properly set up your Supabase project:

## 1. Log into Supabase Dashboard

1. Go to [https://app.supabase.com/](https://app.supabase.com/)
2. Sign in with your account
3. Select your project: `kbnurwcwnxokpkeojpdu`

## 2. Run the SQL Setup Script

1. In the left sidebar, click on **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste the entire SQL script from `supabase/setup.sql`
4. Click the **"Run"** button

## 3. Verify the Setup

After running the script:

1. Go to **"Database"** > **"Tables"** in the sidebar
   - You should see a `projects` table listed
   
2. Go to **"Storage"** in the sidebar
   - You should see a `project-images` bucket listed

## 4. Create an Admin User

1. Go to **"Authentication"** > **"Users"** in the sidebar
2. Click **"Add User"** button
3. Fill in the details:
   - Email: `admin@sevvel.com`
   - Password: `Admin123!`

## 5. Restore the Original Code

After completing these steps, edit the following files to restore Supabase functionality:

### In `lib/projects.ts`:

1. Replace the temporary development code in `uploadProjectImage` function with the original code that actually uploads to Supabase

2. Replace the temporary development code in `addProject` function with the original code that inserts records into the database

## Troubleshooting

If you encounter errors:

- Make sure you're logged in with an account that has admin access to this Supabase project
- Check for any SQL syntax errors in the execution output
- Make sure your Supabase URL and key are correct in `lib/supabase.ts`
- Verify that the authenticated user has the correct permissions