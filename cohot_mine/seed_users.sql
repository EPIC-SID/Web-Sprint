-- ==============================================================================
-- COHORT PCCOE - SEED STUDENTS & REAL BACKEND FOR FRIENDS & CONNECT
-- ==============================================================================
-- Run this script in your Supabase SQL Editor to:
-- 1. Relax profiles insert policy for student directory seeding
-- 2. Insert 8 verified PCCOE students across departments
-- 3. Create connections table for 1-click student networking
-- 4. Create connect_requests table for hackathon & project teammate finder

-- 1. Allow profile insertion for student directory
DROP POLICY IF EXISTS "Allow profile insert" ON public.profiles;
CREATE POLICY "Allow profile insert" ON public.profiles FOR INSERT WITH CHECK (true);

-- 2. Drop foreign key constraint on profiles.id if strictly required for seeded peers
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 3. Seed Students across PCCOE Departments
INSERT INTO public.profiles (id, email, name, avatar_url, branch, year, bio, skills, role, is_verified)
VALUES
  (
    'a1b2c3d4-1111-4a5b-8c9d-0e1f2a3b4c01',
    'shravan.kolhe@pccoepune.org',
    'C157_Shravan Kolhe',
    NULL,
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
    NULL,
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
  ),
  (
    'a1b2c3d4-6666-4a5b-8c9d-0e1f2a3b4c06',
    'aarav.sharma@pccoepune.org',
    'Aarav Sharma',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    'AI & Data Science',
    'BE',
    'SIH 2024 Winner, building Edge-AI computer vision pipelines for campus automation.',
    ARRAY['YOLOv8', 'OpenCV', 'FastAPI', 'React'],
    'student',
    true
  ),
  (
    'a1b2c3d4-7777-4a5b-8c9d-0e1f2a3b4c07',
    'riya.patel@pccoepune.org',
    'Riya Patel',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'Information Technology',
    'TE',
    'Full-stack developer & mobile app enthusiast, Google Solution Challenge participant.',
    ARRAY['Flutter', 'Firebase', 'Node.js', 'PostgreSQL'],
    'student',
    true
  ),
  (
    'a1b2c3d4-8888-4a5b-8c9d-0e1f2a3b4c08',
    'rohit.deshmukh@pccoepune.org',
    'Rohit Deshmukh',
    NULL,
    'Mechanical Engineering',
    'TE',
    'Team Kratos Racing (Formula Student), CAD/CAE designer and telemetry lead.',
    ARRAY['SolidWorks', 'ANSYS', 'MATLAB', 'Telemetry'],
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

-- 4. CONNECTIONS / FRIENDSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'accepted', -- 'pending', 'accepted'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public connections select" ON public.connections FOR SELECT USING (true);
CREATE POLICY "Users can create connections" ON public.connections FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete connections" ON public.connections FOR DELETE USING (true);

-- 5. CONNECT TEAMMATE REQUESTS TABLE
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
CREATE POLICY "Public connect_requests select" ON public.connect_requests FOR SELECT USING (true);
CREATE POLICY "Users can insert connect_requests" ON public.connect_requests FOR INSERT WITH CHECK (true);

-- Seed initial Hackathon Connect requests
INSERT INTO public.connect_requests (author_id, hackathon, title, description, required_skills, team_size, deadline)
VALUES
  (
    'a1b2c3d4-6666-4a5b-8c9d-0e1f2a3b4c06',
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
  ),
  (
    'a1b2c3d4-7777-4a5b-8c9d-0e1f2a3b4c07',
    'Google Solution Challenge 2026',
    'Sustainable Campus Food Waste Redistribution App',
    'Developing a Flutter + Firebase app connecting local college messes and canteens to NGOs in Pune to minimize food wastage.',
    ARRAY['Flutter', 'Firebase', 'Figma', 'UI/UX'],
    '3 / 4 Members',
    'Submissions due April 10'
  );
