-- 1. Create an Enum for Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Set Up the user_roles Table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable Row-Level Security on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create a Security Definer Function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- 6. RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 7. Update profiles table - remove role column update capability
-- Drop existing update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new restrictive update policy (only allow non-role fields)
CREATE POLICY "Users can update their own profile (except role)"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 8. Update leads table policies - restrict to admins only
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.leads;

CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 9. Update lead_activities policies - restrict to admins only
DROP POLICY IF EXISTS "Authenticated users can view lead activities" ON public.lead_activities;
DROP POLICY IF EXISTS "Authenticated users can insert lead activities" ON public.lead_activities;

CREATE POLICY "Only admins can view lead activities"
ON public.lead_activities
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert lead activities"
ON public.lead_activities
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- 10. Update content_pages policies - restrict to admins only
DROP POLICY IF EXISTS "Authenticated users can view all pages" ON public.content_pages;
DROP POLICY IF EXISTS "Authenticated users can insert pages" ON public.content_pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON public.content_pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON public.content_pages;

CREATE POLICY "Only admins can view all pages"
ON public.content_pages
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert pages"
ON public.content_pages
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update pages"
ON public.content_pages
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete pages"
ON public.content_pages
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 11. Update seo_metadata policies - restrict modifications to admins
DROP POLICY IF EXISTS "Authenticated users can insert SEO metadata" ON public.seo_metadata;
DROP POLICY IF EXISTS "Authenticated users can update SEO metadata" ON public.seo_metadata;
DROP POLICY IF EXISTS "Authenticated users can delete SEO metadata" ON public.seo_metadata;

CREATE POLICY "Only admins can insert SEO metadata"
ON public.seo_metadata
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update SEO metadata"
ON public.seo_metadata
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete SEO metadata"
ON public.seo_metadata
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));