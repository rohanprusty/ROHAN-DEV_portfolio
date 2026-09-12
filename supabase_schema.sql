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

-- ============================================
-- PROOF OF WORK / ENGINEERING ACTIVITY TABLES
-- ============================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username text UNIQUE NOT NULL,
    github_username text,
    leetcode_username text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- 2. GitHub Stats Table
CREATE TABLE IF NOT EXISTS public.github_stats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    total_repositories integer DEFAULT 0 NOT NULL,
    public_repositories integer DEFAULT 0 NOT NULL,
    private_repositories integer DEFAULT 0 NOT NULL,
    starred_repositories integer DEFAULT 0 NOT NULL,
    followers integer DEFAULT 0 NOT NULL,
    following integer DEFAULT 0 NOT NULL,
    total_contributions integer DEFAULT 0 NOT NULL,
    current_streak integer DEFAULT 0 NOT NULL,
    longest_streak integer DEFAULT 0 NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- 3. GitHub Contributions Table
CREATE TABLE IF NOT EXISTS public.github_contributions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    date text NOT NULL,
    contribution_count integer DEFAULT 0 NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT github_contributions_user_date_key UNIQUE (user_id, date)
);

-- 4. GitHub Repositories Table
CREATE TABLE IF NOT EXISTS public.github_repositories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    github_repo_id text NOT NULL,
    name text NOT NULL,
    full_name text NOT NULL,
    url text,
    description text,
    is_private boolean DEFAULT false NOT NULL,
    is_fork boolean DEFAULT false NOT NULL,
    stars integer DEFAULT 0 NOT NULL,
    forks integer DEFAULT 0 NOT NULL,
    language text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT github_repos_user_repo_key UNIQUE (user_id, github_repo_id)
);

-- 5. GitHub Starred Repositories Table
CREATE TABLE IF NOT EXISTS public.github_starred_repositories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    github_repo_id text NOT NULL,
    name text NOT NULL,
    full_name text NOT NULL,
    url text,
    starred_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT github_starred_user_repo_key UNIQUE (user_id, github_repo_id)
);

-- 6. LeetCode Stats Table
CREATE TABLE IF NOT EXISTS public.leetcode_stats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    total_solved integer DEFAULT 0 NOT NULL,
    easy_solved integer DEFAULT 0 NOT NULL,
    medium_solved integer DEFAULT 0 NOT NULL,
    hard_solved integer DEFAULT 0 NOT NULL,
    ranking integer DEFAULT 0 NOT NULL,
    streak integer DEFAULT 0 NOT NULL,
    total_active_days integer DEFAULT 0 NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- 7. LeetCode Contributions Table
CREATE TABLE IF NOT EXISTS public.leetcode_contributions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    date text NOT NULL,
    submission_count integer DEFAULT 0 NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT leetcode_contributions_user_date_key UNIQUE (user_id, date)
);

-- 8. LeetCode Submissions Table
CREATE TABLE IF NOT EXISTS public.leetcode_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    submission_id text NOT NULL,
    title text NOT NULL,
    title_slug text NOT NULL,
    timestamp text NOT NULL,
    status text,
    language text,
    created_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT leetcode_submissions_user_sub_key UNIQUE (user_id, submission_id)
);

-- 9. Sync Logs Table
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider text NOT NULL,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    status text NOT NULL,
    started_at timestamptz DEFAULT now() NOT NULL,
    completed_at timestamptz,
    error_message text,
    records_updated integer DEFAULT 0 NOT NULL
);

-- Enable RLS & Allow public read access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_starred_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leetcode_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leetcode_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leetcode_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on users" ON public.users FOR ALL USING (true);

CREATE POLICY "Allow public select on github_stats" ON public.github_stats FOR SELECT USING (true);
CREATE POLICY "Allow public all on github_stats" ON public.github_stats FOR ALL USING (true);

CREATE POLICY "Allow public select on github_contributions" ON public.github_contributions FOR SELECT USING (true);
CREATE POLICY "Allow public all on github_contributions" ON public.github_contributions FOR ALL USING (true);

CREATE POLICY "Allow public select on github_repositories" ON public.github_repositories FOR SELECT USING (true);
CREATE POLICY "Allow public all on github_repositories" ON public.github_repositories FOR ALL USING (true);

CREATE POLICY "Allow public select on github_starred_repositories" ON public.github_starred_repositories FOR SELECT USING (true);
CREATE POLICY "Allow public all on github_starred_repositories" ON public.github_starred_repositories FOR ALL USING (true);

CREATE POLICY "Allow public select on leetcode_stats" ON public.leetcode_stats FOR SELECT USING (true);
CREATE POLICY "Allow public all on leetcode_stats" ON public.leetcode_stats FOR ALL USING (true);

CREATE POLICY "Allow public select on leetcode_contributions" ON public.leetcode_contributions FOR SELECT USING (true);
CREATE POLICY "Allow public all on leetcode_contributions" ON public.leetcode_contributions FOR ALL USING (true);

CREATE POLICY "Allow public select on leetcode_submissions" ON public.leetcode_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public all on leetcode_submissions" ON public.leetcode_submissions FOR ALL USING (true);

CREATE POLICY "Allow public select on sync_logs" ON public.sync_logs FOR SELECT USING (true);
CREATE POLICY "Allow public all on sync_logs" ON public.sync_logs FOR ALL USING (true);