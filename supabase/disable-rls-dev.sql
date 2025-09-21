-- Temporary solution: Disable RLS for development
-- WARNING: This removes security restrictions. Only use for development!

-- Disable Row Level Security for projects table
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- To re-enable RLS later (for production), run:
-- ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;