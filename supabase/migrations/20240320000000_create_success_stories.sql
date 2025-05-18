-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public)
VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to story images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads for story images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates for story images" ON storage.objects;

-- Set up storage policies
CREATE POLICY "Allow public read access to story images"
ON storage.objects FOR SELECT
USING (bucket_id = 'story-images');

-- Allow public uploads for story images
CREATE POLICY "Allow public uploads for story images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'story-images');

-- Allow public updates for story images
CREATE POLICY "Allow public updates for story images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'story-images'); 