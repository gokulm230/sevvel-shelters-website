-- Fix RLS policies for projects table
-- This script will update the policies to be more permissive for development

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;

-- Create more permissive policies that work with both authenticated and anonymous users
-- Note: In production, you should restrict these to authenticated users only

-- Allow anyone to insert projects (for development)
CREATE POLICY "Anyone can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update projects (for development)
CREATE POLICY "Anyone can update projects"
  ON public.projects FOR UPDATE
  USING (true);

-- Allow anyone to delete projects (for development)
CREATE POLICY "Anyone can delete projects"
  ON public.projects FOR DELETE
  USING (true);

-- Alternatively, if you want to completely disable RLS for development:
-- ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- Note: For production, you should use proper authentication-based policies:
/*
CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE
  USING (auth.uid() IS NOT NULL);
*/