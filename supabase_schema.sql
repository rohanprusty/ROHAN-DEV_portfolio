-- ============================================
-- PORTFOLIO VISITOR COUNTER
-- ============================================

-- 1. Table for unique visitors
CREATE TABLE IF NOT EXISTS public.visitors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_hash text UNIQUE NOT NULL,
    visited_at timestamptz DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- 3. Anonymous users can insert visitors
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.visitors;

CREATE POLICY "Allow anonymous inserts"
ON public.visitors
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Anonymous users can read visitor records
DROP POLICY IF EXISTS "Allow anonymous selects" ON public.visitors;

CREATE POLICY "Allow anonymous selects"
ON public.visitors
FOR SELECT
TO anon
USING (true);


-- ============================================
-- GLOBAL SITE COUNTER
-- ============================================

-- 5. Create global statistics table
CREATE TABLE IF NOT EXISTS public.site_stats (
    id integer PRIMARY KEY,
    visitor_count integer NOT NULL DEFAULT 0
);

-- 6. Create the single counter row
INSERT INTO public.site_stats (id, visitor_count)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- ATOMIC INCREMENT FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_count integer;
BEGIN
    UPDATE public.site_stats
    SET visitor_count = visitor_count + 2
    WHERE id = 1
    RETURNING visitor_count INTO new_count;

    RETURN new_count;
END;
$$;


-- ============================================
-- PERMISSIONS
-- ============================================

GRANT EXECUTE
ON FUNCTION public.increment_visitor_count()
TO anon;

GRANT EXECUTE
ON FUNCTION public.increment_visitor_count()
TO authenticated;