-- ============================================================
-- FacultyPlus — Supabase Database Setup
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_name TEXT NOT NULL,
  job_title     TEXT NOT NULL,
  category      TEXT NOT NULL,
  location      TEXT NOT NULL,
  description   TEXT,
  email         TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 3. Public can INSERT (submit jobs)
CREATE POLICY "Public can insert jobs"
  ON jobs FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Public can only SELECT approved jobs
CREATE POLICY "Public can view approved jobs"
  ON jobs FOR SELECT
  TO anon
  USING (status = 'approved');

-- 5. Authenticated role (admin service-role key) can do everything
CREATE POLICY "Admin full access"
  ON jobs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Also allow service_role unrestricted access (used by Edge Functions)
-- service_role bypasses RLS by default in Supabase — no extra policy needed.

-- ============================================================
-- OPTIONAL: Seed data for testing
-- ============================================================
-- INSERT INTO jobs (institute_name, job_title, category, location, email, description, status)
-- VALUES
--   ('IIT Chennai', 'Professor - Computer Science', 'Engineering', 'Chennai, Tamil Nadu', 'hr@iitc.edu.in', 'PhD required. 5+ years experience.', 'approved'),
--   ('ABC Polytechnic', 'Lecturer - Mechanical', 'Polytechnic', 'Coimbatore, Tamil Nadu', 'recruit@abcpoly.edu', 'M.E / M.Tech preferred.', 'approved');
