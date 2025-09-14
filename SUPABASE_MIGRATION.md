# Supabase Migration Guide

This document guides you through completing the migration from Firebase to Supabase in your Sevvel Shelters project.

## Completing the Migration

1. **Update Environment Variables**:
   - Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Set Up Supabase Database**:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Run the SQL script in `supabase/setup.sql` to create the necessary tables and policies

3. **Create an Admin User**:
   - In Supabase dashboard, go to Authentication > Users
   - Click "Invite user" and enter your email
   - Set a password for your admin user

4. **Replace Firebase Files with Supabase**:
   - Rename `lib/projects-supabase.ts` to `lib/projects.ts` (replacing the old file)
   - Remove or archive the old `lib/firebase.ts` file

5. **Test the Application**:
   - Run the application and try to log in with your Supabase admin user
   - Test CRUD operations on projects
   - Verify image uploads and retrieval work properly

## Supabase Project Structure

### Database Tables
- `projects`: Stores all project information

### Storage Buckets
- `project-images`: Stores all project images with public access

### Authentication
- Email/Password authentication for admin users

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)