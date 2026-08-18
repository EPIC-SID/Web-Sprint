-- ==============================================================================
-- COHORT PCCOE - MASTER SEED & COMPLETE LIVE DATABASE SCRIPT (IDEMPOTENT)
-- ==============================================================================
-- Run this in your Supabase SQL Editor:

-- 1. Enable insert policies for anonymous/frontend interactions
DROP POLICY IF EXISTS "Allow profile insert" ON public.profiles;
CREATE POLICY "Allow profile insert" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow posts insert" ON public.posts;
CREATE POLICY "Allow posts insert" ON public.posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow post_comments insert" ON public.post_comments;
CREATE POLICY "Allow post_comments insert" ON public.post_comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow post_likes insert" ON public.post_likes;
CREATE POLICY "Allow post_likes insert" ON public.post_likes FOR INSERT WITH CHECK (true);

-- Drop foreign key constraint on profiles.id if strictly required for seeded peers
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. Seed Students across PCCOE Departments
INSERT INTO public.profiles (id, email, name, avatar_url, branch, year, bio, skills, role, is_verified)
VALUES
  (
    'a1b2c3d4-1111-4a5b-8c9d-0e1f2a3b4c01',
    'shravan.kolhe@pccoepune.org',
    'C157_Shravan Kolhe',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    'Computer Engineering',
    'TE',
    'Competitive programmer, ACM Core team, exploring Distributed Systems and Rust.',
    ARRAY['C++', 'Python', 'Docker', 'FastAPI'],
    'student',
    true
  ),
  (
    'a1b2c3d4-2222-4a5b-8c9d-0e1f2a3b4c02',
    'felina.mathew@pccoepune.org',
    'FELINA MATHEW',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    'Information Technology',
    'TE',
    'UI/UX Enthusiast, GDGC Design Lead, building clean modern web interactions.',
    ARRAY['Figma', 'React', 'TailwindCSS', 'Next.js'],
    'student',
    true
  ),
  (
    'a1b2c3d4-3333-4a5b-8c9d-0e1f2a3b4c03',
    'arnav.telangi@pccoepune.org',
    'Arnav Telangi',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    'AI & Data Science',
    'SE',
    'Deep Learning & NLP researcher, experimenting with LLM agents and PyTorch.',
    ARRAY['PyTorch', 'TensorFlow', 'LangChain', 'Python'],
    'student',
    true
  ),
  (
    'a1b2c3d4-4444-4a5b-8c9d-0e1f2a3b4c04',
    'tanmay.joshi@pccoepune.org',
    'Tanmay Joshi',
    NULL,
    'E&TC',
    'SE',
    'IoT Club Hardware Team Lead, working on ESP32 mesh networks and drones.',
    ARRAY['ESP32', 'FreeRTOS', 'Embedded C', 'KiCad'],
    'student',
    true
  ),
  (
    'a1b2c3d4-5555-4a5b-8c9d-0e1f2a3b4c05',
    'ananya.roy@pccoepune.org',
    'Ananya Roy',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
    'Computer Engineering',
    'BE',
    'OWASP PCCOE CTF Lead, focused on Web Security, Penetration Testing & Cryptography.',
    ARRAY['Burp Suite', 'Ghidra', 'Wireshark', 'Python'],
    'student',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  branch = EXCLUDED.branch,
  year = EXCLUDED.year,
  bio = EXCLUDED.bio,
  skills = EXCLUDED.skills,
  is_verified = true;

-- 3. Seed Initial Posts
INSERT INTO public.posts (id, author_id, category, content, tags, media_url)
VALUES
  (
    'f1b2c3d4-0001-4a5b-8c9d-0e1f2a3b4c01',
    'a1b2c3d4-1111-4a5b-8c9d-0e1f2a3b4c01',
    'Announcement',
    'TOC solutions are up on Cohort 📖
have a look whenever you want... panic studying before the exam is still an option 🤫',
    ARRAY['TOC', 'Exams', 'Resources'],
    'https://drive.google.com/drive/folders/1vK-5yOIEpuYwEnlvyUx_n_JXfj...'
  ),
  (
    'f1b2c3d4-0002-4a5b-8c9d-0e1f2a3b4c02',
    'a1b2c3d4-2222-4a5b-8c9d-0e1f2a3b4c02',
    'Academic',
    'Friendly announcement for those still "searching for resources" 🧐

The DBMS full question bank answer key is now available on Cohort.
So before asking "Does anyone have answers?" in every group chat, maybe check Cohort first 😎

Here you go: https://drive.google.com/file/d/1uiy3jr-alX54_ZaWD34d8j0gOyW8ktQ u/view?usp=sharing',
    ARRAY['DBMS', 'QuestionBank', 'ComputerEngg'],
    NULL
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Comments
INSERT INTO public.post_comments (post_id, author_id, content)
VALUES
  ('f1b2c3d4-0001-4a5b-8c9d-0e1f2a3b4c01', 'a1b2c3d4-3333-4a5b-8c9d-0e1f2a3b4c03', 'Cohort goated ngl'),
  ('f1b2c3d4-0002-4a5b-8c9d-0e1f2a3b4c02', 'a1b2c3d4-1111-4a5b-8c9d-0e1f2a3b4c01', 'Requesting one for TOC n MOT as well 🤌 y''all my only hope 🙏')
ON CONFLICT DO NOTHING;

-- 5. CONNECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'accepted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public connections select" ON public.connections;
CREATE POLICY "Public connections select" ON public.connections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public connections insert" ON public.connections;
CREATE POLICY "Public connections insert" ON public.connections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public connections delete" ON public.connections;
CREATE POLICY "Public connections delete" ON public.connections FOR DELETE USING (true);

-- 6. CONNECT TEAMMATE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.connect_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  hackathon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[] DEFAULT '{}',
  team_size TEXT DEFAULT '1 / 4 Members',
  deadline TEXT DEFAULT 'Open',
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.connect_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public connect_requests select" ON public.connect_requests;
CREATE POLICY "Public connect_requests select" ON public.connect_requests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public connect_requests insert" ON public.connect_requests;
CREATE POLICY "Public connect_requests insert" ON public.connect_requests FOR INSERT WITH CHECK (true);

-- Seed initial Hackathon Connect requests
INSERT INTO public.connect_requests (author_id, hackathon, title, description, required_skills, team_size, deadline)
VALUES
  (
    'a1b2c3d4-1111-4a5b-8c9d-0e1f2a3b4c01',
    'Smart India Hackathon (SIH 2026)',
    'AI-assisted Smart Grid Energy Optimizer',
    'Building an edge-AI optimization platform for decentralized micro-grids. Looking for 1 React frontend dev and 1 embedded specialist.',
    ARRAY['React', 'Tailwind', 'ESP32', 'FastAPI'],
    '4 / 6 Members',
    'Registration closes March 15'
  ),
  (
    'a1b2c3d4-5555-4a5b-8c9d-0e1f2a3b4c05',
    'OWASP PCCOE CTF 2026',
    'Cyber Warfare & Reverse Engineering Squad',
    'Forming a competitive 4-member squad for the upcoming national CTF. Seeking students experienced with Web Exploitation or Ghidra binary analysis.',
    ARRAY['Burp Suite', 'Ghidra', 'Cryptography', 'Python'],
    '2 / 4 Members',
    'CTF starts March 1st'
  )
ON CONFLICT DO NOTHING;
