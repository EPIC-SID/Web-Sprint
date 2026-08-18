-- ==============================================================================
-- COHORT PCCOE - COMPLETE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Paste this entire script into your Supabase SQL Editor and click "Run".
-- It creates all tables, triggers, foreign keys, indexes, and RLS security policies.

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PROFILES TABLE (Linked to auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  branch TEXT DEFAULT 'Computer Engineering',
  year TEXT DEFAULT 'TE',
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  github TEXT,
  linkedin TEXT,
  role TEXT DEFAULT 'student',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. COMMUNITIES TABLE (Clubs, Chapters, Societies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.communities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT NOT NULL,
  category TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  banner_url TEXT,
  leads TEXT[] DEFAULT '{}',
  members_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 4. COMMUNITY MEMBERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.community_members (
  community_id TEXT REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'lead', 'core', 'member'
  joined_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (community_id, user_id)
);

-- ==============================================================================
-- 5. POSTS TABLE (Campus Feed)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'Announcement', -- 'Hackathon', 'Club Announcement', 'Resource', 'Announcement', 'Opportunity'
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  media_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. POST LIKES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

-- ==============================================================================
-- 7. POST COMMENTS TABLE (Replies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 8. XD PROJECTS TABLE (Cohort Exchange Showcase)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.xd_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'AI / ML', 'Full-Stack', 'IoT / Embedded', etc.
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  demo_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  upvotes_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 9. XD PROJECT UPVOTES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.xd_project_upvotes (
  project_id UUID REFERENCES public.xd_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (project_id, user_id)
);

-- ==============================================================================
-- 10. CAMPUS SPOTS TABLE (Campus Maps & Navigation)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.campus_spots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Labs', 'Library', 'Canteen', 'Auditorium', etc.
  building TEXT NOT NULL,
  floor TEXT NOT NULL,
  description TEXT,
  timing TEXT,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  coord_x NUMERIC NOT NULL,
  coord_y NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 11. CALENDAR EVENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  community_id TEXT REFERENCES public.communities(id) ON DELETE SET NULL,
  organizer_name TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  registration_url TEXT,
  category TEXT DEFAULT 'Technical',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 12. MESSAGES TABLE (Encrypted Campus Chat)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 13. NOTIFICATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'like', 'comment', 'event', 'system'
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 14. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url, is_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    CASE WHEN NEW.email LIKE '%@pccoepune.org' THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xd_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xd_project_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- COMMUNITIES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Communities are viewable by everyone"
  ON public.communities FOR SELECT USING (true);

CREATE POLICY "Community members can view member lists"
  ON public.community_members FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join communities"
  ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave communities"
  ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- POSTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Posts are viewable by everyone"
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
  ON public.posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- ------------------------------------------------------------------------------
-- POST LIKES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Likes are viewable by everyone"
  ON public.post_likes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like posts"
  ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- POST COMMENTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Comments are viewable by everyone"
  ON public.post_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments"
  ON public.post_comments FOR DELETE USING (auth.uid() = author_id);

-- ------------------------------------------------------------------------------
-- XD PROJECTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Projects are viewable by everyone"
  ON public.xd_projects FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON public.xd_projects FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own projects"
  ON public.xd_projects FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own projects"
  ON public.xd_projects FOR DELETE USING (auth.uid() = creator_id);

CREATE POLICY "Project upvotes are viewable by everyone"
  ON public.xd_project_upvotes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upvote projects"
  ON public.xd_project_upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove upvote"
  ON public.xd_project_upvotes FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- CAMPUS SPOTS & CALENDAR EVENTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Campus spots are viewable by everyone"
  ON public.campus_spots FOR SELECT USING (true);

CREATE POLICY "Calendar events are viewable by everyone"
  ON public.calendar_events FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- MESSAGES POLICIES (Private 1:1 Encrypted Chat)
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own sent or received messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- ------------------------------------------------------------------------------
-- NOTIFICATIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications as read"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- 16. SEED DATA (Default PCCOE Communities & Campus Spots)
-- ==============================================================================
INSERT INTO public.communities (id, name, acronym, category, logo_url, tagline, description, leads)
VALUES
  ('owasp', 'OWASP PCCOE Student Chapter', 'OWASP', 'Technical', '/assets/clubs/owasp.png', 'Securing the Cyber Frontier', 'The premier cybersecurity student community at PCCOE organizing CTFs and security workshops.', ARRAY['Ananya Roy', 'Pratham K.']),
  ('gdgc', 'Google Developer Groups on Campus', 'GDGC', 'Technical', '/assets/clubs/gdgc.png', 'Building Solutions with Google Tech', 'Google Developer Groups on Campus PCCOE bridges theory and practice for students.', ARRAY['Rohan Patil', 'Sneha M.']),
  ('acm', 'ACM PCCOE Student Chapter', 'ACM', 'Technical', '/assets/clubs/acm.png', 'Advancing Computing as a Science', 'Dedicated to competitive programming, algorithms, and national-level coding sprints.', ARRAY['Aditya Deshpande']),
  ('lfdt', 'Linux & Free Software Development Team', 'LFDT', 'Technical', '/assets/clubs/lfdt.png', 'Open Source Freedom & Linux Kernel', 'Fostering open-source contributions, kernel development, and FOSS tooling.', ARRAY['Kunal S.']),
  ('iotclub', 'PCCOE IoT & Robotics Club', 'IOT Club', 'Technical', '/assets/clubs/iotclub.png', 'Hardware, Sensors & Robotics', 'Designing embedded systems, rovers, and sensor networks for industrial applications.', ARRAY['Tanmay Joshi']),
  ('gfg', 'GeeksforGeeks Student Chapter', 'GFG', 'Technical', '/assets/clubs/gfg.png', 'DSA & Placement Excellence', 'Preparing students for top-tier product tech interviews and placement rounds.', ARRAY['Pooja N.']),
  ('aimsa', 'AI & Data Science Student Association', 'AIMSA', 'Technical', '/assets/clubs/aimsa.png', 'Generative AI & Machine Learning', 'Community exploring machine learning models, PyTorch, and NLP applications.', ARRAY['Aarav Sharma']),
  ('isr', 'Institute for Social Responsibility', 'ISR', 'Social', '/assets/clubs/isr.png', 'Social Impact & Tech for Good', 'Empowering communities through grassroots social initiatives and tech literacy.', ARRAY['Mihir P.']),
  ('nss', 'National Service Scheme', 'NSS', 'Social', '/assets/clubs/nss.png', 'Not Me But You', 'Government-recognized youth voluntary service and community development wing.', ARRAY['Gaurav K.']),
  ('artcircle', 'PCCOE Art Circle', 'Art Circle', 'Cultural', '/assets/clubs/artcircle.png', 'Drama, Music & Cultural Expression', 'Award-winning cultural, theatrical, and fine arts student troupe.', ARRAY['Mihir Joshi'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.campus_spots (id, name, category, building, floor, description, timing, amenities, image_url, coord_x, coord_y)
VALUES
  ('spot_ccf', 'Central Computing Facility (CCF Labs)', 'Labs', 'Computer & IT Building', '2nd & 3rd Floor', 'High-performance GPU workstations for AI, practicals, and CTF hackathons.', '8:00 AM - 8:00 PM', ARRAY['Gigabit LAN', 'Air Conditioned', 'NVIDIA GPUs'], 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 38.5, 35.0),
  ('spot_library', 'Central Library & Digital Hub', 'Library', 'Main Admin Wing', '1st & 2nd Floor', '50,000+ reference volumes, quiet study cubicles, IEEE journals access.', '7:30 AM - 10:00 PM', ARRAY['Silent Study Zone', 'IEEE Access', 'Wi-Fi 6'], 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', 55.0, 25.0),
  ('spot_canteen', 'Main Canteen & Courtyard', 'Canteen', 'Campus Center Ground', 'Ground Level', 'Student hangout hub offering snacks, meals, juices, and coffee bar.', '8:00 AM - 7:00 PM', ARRAY['Outdoor Seating', 'UPI Enabled', 'Fast Food'], 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 62.0, 65.0),
  ('spot_auditorium', 'LRDC Auditorium', 'Auditorium', 'LRDC Building', 'Ground Floor', '800-seat acoustic auditorium for TEDxPCCOE, fests, and guest lectures.', 'Event Schedule', ARRAY['Dolby Surround', 'Stage Lighting', 'Green Rooms'], 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', 22.0, 50.0)
ON CONFLICT (id) DO NOTHING;
