import React, { useState } from 'react';
import { Search, ThumbsUp, ExternalLink, Plus } from 'lucide-react';

interface XDProject {
  id: string;
  title: string;
  description: string;
  category: string;
  creator: {
    name: string;
    branch: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  upvotes: number;
  thumbnail: string;
  hasUpvoted?: boolean;
}

const MOCK_XD: XDProject[] = [
  {
    id: 'xd_1',
    title: 'PCCOE Smart Campus Transit & Parking AI',
    description:
      'Real-time computer vision system using CCTV feeds to monitor 4-wheeler and 2-wheeler parking availability with navigation cues on campus.',
    category: 'AI / ML',
    creator: {
      name: 'Aarav Sharma',
      branch: 'AI & Data Science',
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['YOLOv8', 'FastAPI', 'OpenCV', 'React'],
    upvotes: 142,
    thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800',
  },
  {
    id: 'xd_2',
    title: 'Pulse: Peer Doubt Resolver & Notes Exchanger',
    description:
      'Decentralized peer study network tailored for SPPU syllabus where students earn karma points by answering junior branch queries.',
    category: 'Full-Stack',
    creator: {
      name: 'Siddhant Deshmukh',
      branch: 'Computer Engg',
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['Next.js 15', 'Supabase', 'Tailwind', 'tRPC'],
    upvotes: 98,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  },
  {
    id: 'xd_3',
    title: 'Automated Solar Tracker Rover',
    description:
      'Dual-axis photodiode tracker with autonomous obstacle avoidance rover built for the PCCOE Renewable Energy Lab.',
    category: 'IoT / Embedded',
    creator: {
      name: 'Tanmay Joshi',
      branch: 'E&TC',
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['ESP32', 'C++', 'FreeRTOS', 'MQTT'],
    upvotes: 76,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  },
];

const CATEGORIES = ['All', 'AI / ML', 'Full-Stack', 'IoT / Embedded', 'CyberSec'];

export const XDPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<XDProject[]>(MOCK_XD);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Full-Stack');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newDemo, setNewDemo] = useState('');

  const handleUpvote = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const hasUpvoted = !p.hasUpvoted;
          return {
            ...p,
            hasUpvoted,
            upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newProj: XDProject = {
      id: `xd_${Date.now()}`,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      creator: {
        name: 'Siddhant Deshmukh',
        branch: 'Computer Engg',
      },
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: newGithub || 'https://github.com',
      demoUrl: newDemo || 'https://github.com',
      upvotes: 1,
      hasUpvoted: true,
      thumbnail:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    };

    setProjects([newProj, ...projects]);
    setShowModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setNewGithub('');
    setNewDemo('');
  };

  const filtered = projects.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-foreground">Cohort XD Showcase</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Exchange
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Discover and upvote open-source student creations built right here at PCCOE
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition cursor-pointer flex items-center gap-1.5 shrink-0 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3.5 py-2 border border-border sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or tech stacks..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-secondary">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
                  {proj.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition line-clamp-1 mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {proj.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-secondary text-foreground text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-border flex items-center justify-between">
              <div className="text-[11px] text-muted-foreground">
                By <strong className="text-foreground">{proj.creator.name}</strong>
              </div>

              <div className="flex items-center gap-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleUpvote(proj.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    proj.hasUpvoted
                      ? 'bg-amber-500 text-white'
                      : 'bg-secondary hover:bg-amber-500/10 hover:text-amber-500 text-foreground'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${proj.hasUpvoted ? 'fill-white' : ''}`} />
                  <span>{proj.upvotes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <h2 className="text-lg font-bold text-foreground mb-4">Submit Project to Cohort XD</h2>
            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-Powered Smart Campus Navigation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none cursor-pointer"
                >
                  <option value="AI / ML">AI / ML</option>
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="IoT / Embedded">IoT / Embedded</option>
                  <option value="CyberSec">CyberSec</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="What does your project do and what problem does it solve?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Tech Stack Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Supabase, Python, Tailwind"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newDemo}
                    onChange={(e) => setNewDemo(e.target.value)}
                    className="w-full bg-secondary rounded-xl px-3 py-2 border border-border text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-muted-foreground hover:bg-secondary transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition cursor-pointer"
                >
                  Publish to XD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
