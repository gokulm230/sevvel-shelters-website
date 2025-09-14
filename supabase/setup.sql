-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  location text not null,
  status text not null check (status in ('Ongoing', 'Planning', 'Completed')),
  units text not null,
  completion text not null,
  images text[] default '{}',
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Set up row level security
alter table public.projects enable row level security;

-- Create policies
-- Allow anyone to read visible projects
create policy "Anyone can view visible projects"
  on public.projects for select
  using (visible = true);

-- Only authenticated users can manage projects
create policy "Authenticated users can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');
  
create policy "Authenticated users can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');
  
create policy "Authenticated users can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');
  
-- Create storage bucket for project images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true);

-- Set up storage policies
create policy "Public can view project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Authenticated users can upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Authenticated users can update project images"
  on storage.objects for update
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');