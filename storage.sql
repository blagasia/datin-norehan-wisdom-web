
-- Create a bucket for media storage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'Media Library',
  true,
  52428800, -- 50MB limit
  '{image/png,image/jpeg,image/gif,image/webp,image/svg+xml}'
)
ON CONFLICT (id) DO NOTHING;

-- Set up policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Set up policy to allow public to view files
CREATE POLICY "Allow public to view files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');

-- Set up policy to allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND owner = auth.uid());

-- Set up policy to allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND owner = auth.uid());
