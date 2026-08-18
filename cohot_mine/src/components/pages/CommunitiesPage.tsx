import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Check,
  Globe,
  Info,
  Plus,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-fidelity IIC Logo Vector
const IICLogoVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="white" />
    <path
      d="M32 40C32 28 42 22 52 22C64 22 70 30 68 42C66 54 52 58 46 68C42 74 40 82 40 82"
      stroke="#FF6B00"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M68 60C68 72 58 78 48 78C36 78 30 70 32 58C34 46 48 42 54 32C58 26 60 18 60 18"
      stroke="#0088FF"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="11" fill="#7C3AED" />
    <circle cx="34" cy="30" r="7" fill="#10B981" />
    <circle cx="66" cy="70" r="7" fill="#F59E0B" />
  </svg>
);

export interface CommunityCardData {
  id: string;
  name: string;
  handle: string;
  description: string;
  membersCount: number;
  banner: string;
  logo: string;
  category: 'SDW' | 'Technical' | 'Academic' | 'Special';
  department?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export const ALL_COMMUNITIES: CommunityCardData[] = [
  {
    id: 'iic',
    name: "Institution's Innovation Council - PCCOE",
    handle: '@iicpccoe',
    description:
      "Institution's Innovation Council at PCCOE fostering innovation, startups, problem-solving mindset, and entrepreneurial thinking.",
    membersCount: 6,
    banner:
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=80',
    logo: 'iic-custom',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/iicpccoe',
    linkedin: 'https://linkedin.com/company/iicpccoe',
  },
  {
    id: 'gdgc',
    name: 'Google Developer Groups PCCOE',
    handle: '@gdgcpccoe',
    description:
      'Google Developer Groups on Campus PCCOE empowering students to build real-world web, cloud, Android, and AI solutions with Google technologies.',
    membersCount: 680,
    banner:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/gdgc.png',
    category: 'Technical',
    department: 'Computer',
    instagram: 'https://instagram.com/gdg_pccoe',
    linkedin: 'https://linkedin.com/company/gdg-pccoe',
  },
  {
    id: 'higher-studies-upsc',
    name: 'Higher Studies Club for UPSC / MPSC - PCCOE',
    handle: '@hscupscpccoe',
    description:
      'Comprehensive mentorship and peer preparation group for civil services exams including UPSC CSE, MPSC, and state administrative services.',
    membersCount: 320,
    banner:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&auto=format&fit=crop&q=80',
    logo: 'https://api.iconify.design/lucide:book-open.svg?color=%23818cf8',
    category: 'Academic',
    department: 'All Departments',
    instagram: 'https://instagram.com/hsc_upsc_pccoe',
  },
  {
    id: 'higher-studies-cat',
    name: 'Higher Studies Club for CAT / GMAT / GRE - PCCOE',
    handle: '@hsccatpccoe',
    description:
      "Guiding PCCOE engineers toward top management institutions (IIMs) and international master's programs with quant prep, verbal drills, and profile reviews.",
    membersCount: 180,
    banner:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80',
    logo: 'https://api.iconify.design/lucide:graduation-cap.svg?color=%23f59e0b',
    category: 'Academic',
    department: 'All Departments',
    instagram: 'https://instagram.com/hsc_cat_pccoe',
  },
  {
    id: 'owasp',
    name: 'OWASP PCCOE Student Chapter',
    handle: '@owasppccoe',
    description:
      'Open Web Application Security Project student chapter at PCCOE dedicated to cybersecurity, web vulnerability research, CTFs, and ethical hacking.',
    membersCount: 410,
    banner:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/owasp.png',
    category: 'Technical',
    department: 'Computer',
    instagram: 'https://instagram.com/owasp_pccoe',
    linkedin: 'https://linkedin.com/company/owasp-pccoe',
  },
  {
    id: 'acm',
    name: 'ACM PCCOE Student Chapter',
    handle: '@acmpccoe',
    description:
      'Association for Computing Machinery student chapter at PCCOE promoting computing research, competitive programming, data structures, and algorithms.',
    membersCount: 450,
    banner:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/acm.png',
    category: 'Technical',
    department: 'Computer',
    instagram: 'https://instagram.com/acm_pccoe',
    linkedin: 'https://linkedin.com/company/acm-pccoe',
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks PCCOE Student Chapter',
    handle: '@gfgpccoe',
    description:
      'Official GeeksforGeeks Campus Body at PCCOE helping students master DSA, web development, interview prep, hackathons, and coding sprints.',
    membersCount: 520,
    banner:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/gfg.png',
    category: 'Technical',
    department: 'IT',
    instagram: 'https://instagram.com/gfg_pccoe',
  },
  {
    id: 'aimsa',
    name: 'AiMSA - AI & ML Student Association',
    handle: '@aimsapccoe',
    description:
      'AiMSA is the premier AI & ML student body at PCCOE driving machine learning workshops, deep learning bootcamps, and data science sprints.',
    membersCount: 390,
    banner:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/aimsa.png',
    category: 'Technical',
    department: 'AIDS',
    instagram: 'https://instagram.com/aimsa_pccoe',
  },
  {
    id: 'isr',
    name: 'Institutional Social Responsibility - PCCOE',
    handle: '@isrpccoe',
    description:
      'Institutional Social Responsibility community at PCCOE promoting social awareness, community welfare, environmental sustainability, and outreach programs.',
    membersCount: 1,
    banner:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/isr.png',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/isr_pccoe',
  },
  {
    id: 'ir',
    name: 'International Relations Cell - PCCOE',
    handle: '@ircpccoe',
    description:
      'Institutional Research and International Relations Cell community encouraging research culture, paper publication, global exchange, and international conferences.',
    membersCount: 3,
    banner:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/irc_pccoe',
  },
  {
    id: 'nss',
    name: 'National Service Scheme - PCCOE',
    handle: '@nsspccoe',
    description:
      'National Service Scheme (NSS) community at PCCOE encouraging social service, blood donation camps, village development, and nation building.',
    membersCount: 1,
    banner:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/nss.png',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/nss_pccoe',
  },
  {
    id: 'artcircle',
    name: 'PCCOE Art Circle',
    handle: '@artcirclepccoe',
    description:
      'The Art Circle community at PCCOE celebrating creativity through drawing, painting, theatre drama, classical music, dance, and cultural arts.',
    membersCount: 4,
    banner:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/artcircle.png',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/artcircle_pccoe',
  },
  {
    id: 'sports',
    name: 'PCCOE Sports Cell',
    handle: '@sportscellpccoe',
    description:
      'Sports Cell community at PCCOE dedicated to athletic activities, fitness, annual athletic meets, tournaments, and national participation.',
    membersCount: 3,
    banner:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
    department: 'All Departments',
    instagram: 'https://instagram.com/sportscell_pccoe',
  },
  {
    id: 'iotclub',
    name: 'IoT & Embedded Systems Club',
    handle: '@iotclubpccoe',
    description:
      'Hands-on robotics, hardware prototyping, microcontrollers, and IoT sensor design community at PCCOE.',
    membersCount: 260,
    banner:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/iotclub.png',
    category: 'Technical',
    department: 'ENTC',
    instagram: 'https://instagram.com/iot_pccoe',
  },
  {
    id: 'lfdt',
    name: 'Linux & Free Development Tribe (LFDT)',
    handle: '@lfdtpccoe',
    description:
      'Open-source software, Linux kernel exploration, Git workflows, and FOSS contribution community at PCCOE.',
    membersCount: 210,
    banner:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1600&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/lfdt.png',
    category: 'Technical',
    department: 'Computer',
    instagram: 'https://instagram.com/lfdt_pccoe',
  },
];

interface CommunitiesPageProps {
  communities?: any[];
  darkMode?: boolean;
  selectedCommunityId?: string | null;
  onSelectCommunity?: (id: string | null) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CommunitiesPage: React.FC<CommunitiesPageProps> = ({
  darkMode = true,
  selectedCommunityId: propSelectedId,
  onSelectCommunity: propOnSelect,
  onNavigateTab,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'SDW' | 'Technical' | 'Academic'>('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [subscribedAll, setSubscribedAll] = useState(false);
  const [subscribedMap, setSubscribedMap] = useState<Record<string, boolean>>({
    iic: false,
    gdgc: true,
    owasp: true,
    acm: false,
    gfg: false,
    aimsa: true,
    isr: false,
    ir: false,
    nss: false,
    artcircle: true,
    sports: false,
    'higher-studies-upsc': false,
    'higher-studies-cat': false,
    iotclub: false,
    lfdt: false,
  });

  const activeSelectedId = propSelectedId !== undefined ? propSelectedId : internalSelectedId;

  const handleSelectCommunity = (id: string | null) => {
    if (propOnSelect) {
      propOnSelect(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  const toggleSub = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSubscribedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribeAll = () => {
    const nextState = !subscribedAll;
    setSubscribedAll(nextState);
    const updated: Record<string, boolean> = {};
    ALL_COMMUNITIES.forEach((c) => {
      updated[c.id] = nextState;
    });
    setSubscribedMap(updated);
  };

  const handleShare = (community: CommunityCardData) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/communities/${community.id}`);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // Find active selected community
  const selectedCommunity = activeSelectedId
    ? ALL_COMMUNITIES.find((c) => c.id === activeSelectedId) || ALL_COMMUNITIES[0]
    : null;

  // Helper to render club logo cleanly
  const renderClubLogo = (logo: string, name: string) => {
    if (logo === 'iic-custom') {
      return <IICLogoVector className="w-full h-full object-contain p-0.5" />;
    }
    return (
      <img
        src={logo}
        alt={name}
        className="w-full h-full object-contain"
      />
    );
  };

  // =========================================================================
  // COMMUNITY DETAIL VIEW (REPLICATING SCREENSHOT)
  // =========================================================================
  if (selectedCommunity) {
    const isSubscribed = Boolean(subscribedMap[selectedCommunity.id]);

    return (
      <div className={`space-y-5 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
        {/* Top Panoramic Banner */}
        <div className="relative h-48 sm:h-60 md:h-64 w-full overflow-hidden rounded-2xl bg-black border border-white/[0.08] shadow-md">
          <img
            src={selectedCommunity.banner}
            alt={selectedCommunity.name}
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

          {/* Back Button */}
          <button
            onClick={() => handleSelectCommunity(null)}
            className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition cursor-pointer z-20 shadow-lg"
            title="Back to all communities"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Spider-Man Hanging Sticker (Top Left) */}
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute top-2 left-14 w-8 h-8 pointer-events-none opacity-90 z-10 drop-shadow-md"
          />
        </div>

        {/* Community Info & Action Bar Container */}
        <div className="px-1 sm:px-2">
          {/* Main Info Row (Logo + Text + Action Buttons) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-10 sm:-mt-12 relative z-10 mb-3">
            {/* Left: Logo & Titles */}
            <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
              {/* Logo Box */}
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl p-2 shadow-xl flex items-center justify-center shrink-0 border overflow-hidden transition-transform hover:scale-105 ${
                  darkMode
                    ? 'bg-white border-white/20 ring-4 ring-[#050507]'
                    : 'bg-white border-slate-200 ring-4 ring-[#fafafa]'
                }`}
              >
                {renderClubLogo(selectedCommunity.logo, selectedCommunity.name)}
              </div>

              {/* Title & Handles */}
              <div className="min-w-0 flex-1 pt-4 sm:pt-6">
                <h1 className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedCommunity.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs font-mono">
                  <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>
                    {selectedCommunity.handle}
                  </span>
                  <div className="flex items-center gap-1.5 ml-1">
                    <a
                      href={selectedCommunity.instagram || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={`transition p-0.5 ${darkMode ? 'text-zinc-400 hover:text-pink-400' : 'text-slate-400 hover:text-pink-600'}`}
                      title="Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={selectedCommunity.linkedin || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={`transition p-0.5 ${darkMode ? 'text-zinc-400 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-600'}`}
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={selectedCommunity.website || '#'}
                      className={`transition p-0.5 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                      title="Website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions (Share + Subscribe) */}
            <div className="flex items-center gap-2 self-start sm:self-center pt-2 sm:pt-6 shrink-0">
              <button
                onClick={() => handleShare(selectedCommunity)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition cursor-pointer relative ${
                  darkMode
                    ? 'border-white/10 bg-[#121218] hover:bg-white/[0.08] text-zinc-300 hover:text-white'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
                }`}
                title="Share community link"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -bottom-7 right-0 bg-black text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30">
                    Copied!
                  </span>
                )}
              </button>

              <button
                onClick={(e) => toggleSub(selectedCommunity.id, e)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                  isSubscribed
                    ? darkMode
                      ? 'bg-zinc-800 text-zinc-200 border border-white/15 hover:bg-zinc-700'
                      : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    : 'bg-[#24a0ed] hover:bg-[#24a0ed]/90 text-white shadow-blue-500/20'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl mt-2.5 ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            {selectedCommunity.description}
          </p>

          {/* Member Count */}
          <div className={`flex items-center gap-1.5 text-xs font-medium mt-2.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            <Users className="w-3.5 h-3.5" />
            <span>{selectedCommunity.membersCount + (isSubscribed ? 1 : 0)} members</span>
          </div>
        </div>

        {/* Club Lead Callout Box */}
        <div
          className={`border rounded-2xl p-4 flex items-start gap-3 my-4 transition ${
            darkMode
              ? 'border-blue-500/30 bg-blue-950/20 text-zinc-300'
              : 'border-blue-200 bg-blue-50/70 text-slate-700'
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs leading-relaxed">
            <div className={`font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Are you a club lead?</div>
            <p>
              If you are the official lead for this club, you can get admin access to manage this page. Contact the developers via{' '}
              <button
                onClick={() => onNavigateTab?.('contact')}
                className="text-blue-500 hover:underline font-semibold cursor-pointer inline"
              >
                the contact form
              </button>{' '}
              to get started.
            </p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="space-y-3 pt-1">
          <div className="relative inline-flex items-center gap-2">
            <h2 className={`text-sm font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Recent activity
            </h2>
            <img
              src={darkMode ? '/assets/dark2.png' : '/assets/dark1.svg'}
              alt=""
              className="absolute -top-3.5 -left-3 w-6 h-6 pointer-events-none opacity-90"
            />
          </div>

          {/* Activity Empty State Card */}
          <div
            className={`rounded-2xl border py-14 px-6 flex flex-col items-center justify-center text-center shadow-inner transition ${
              darkMode
                ? 'border-white/[0.06] bg-[#0c0c11]'
                : 'border-slate-200 bg-white shadow-sm'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 border ${
                darkMode
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  : 'bg-indigo-50 text-indigo-600 border-indigo-100'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Community posts starting soon!
            </h3>
            <p className={`text-xs max-w-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Stay tuned for upcoming discussions, events, and announcements from this community.
            </p>
          </div>
        </section>

        {/* Spider-Man Bottom Decal */}
        <div className="flex justify-between items-center pt-4 opacity-70">
          <span className="text-[10px] font-mono tracking-widest uppercase text-red-500/80 font-bold">
            SPIDER-MAN
          </span>
          <img
            src={darkMode ? '/assets/dark6.png' : '/assets/light6.svg'}
            alt=""
            className="w-6 h-6 pointer-events-none"
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN COMMUNITIES GRID VIEW
  // =========================================================================
  const filteredCommunities = ALL_COMMUNITIES.filter((club) => {
    const matchesDept =
      selectedDept === 'All Departments' ||
      club.department === 'All Departments' ||
      club.department === selectedDept;
    const matchesCat =
      selectedCategory === 'All' || club.category === selectedCategory;
    return matchesDept && matchesCat;
  });

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header with Title + Department Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="relative inline-flex items-center">
            <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              c/communities
            </h1>
            <img
              src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
              alt=""
              className="absolute -top-3.5 left-[104px] w-6 h-6 pointer-events-none z-10"
            />
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Join discussions, student chapters, and connect with your peers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs */}
          <div
            className={`flex items-center p-1 rounded-xl border text-xs ${
              darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {(['All', 'SDW', 'Technical', 'Academic'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#24a0ed] text-white shadow-sm font-semibold'
                    : darkMode
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Department Filter Dropdown */}
          <div
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs border transition-colors ${
              darkMode
                ? 'bg-[#0e0e13] border-white/[0.08] text-zinc-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <SlidersHorizontal className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
            <span className={`${darkMode ? 'text-zinc-400' : 'text-slate-500'} font-medium`}>Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className={`bg-transparent font-semibold outline-none cursor-pointer pr-1 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              <option value="All Departments" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
                All Departments
              </option>
              <option value="Computer" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
                Computer Engg
              </option>
              <option value="IT" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
                Information Tech
              </option>
              <option value="AIDS" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
                AI & Data Science
              </option>
              <option value="ENTC" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
                E&TC Engg
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Communities Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Explore Communities ({filteredCommunities.length})
          </h2>

          <button
            onClick={handleSubscribeAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              darkMode
                ? 'bg-[#121217] hover:bg-white/[0.08] text-white border-white/[0.1]'
                : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-sm'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`} />
            <span>{subscribedAll ? 'Subscribed All' : 'Subscribe All'}</span>
          </button>
        </div>

        {/* 2-Column Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommunities.map((club) => {
            const isSubbed = subscribedMap[club.id];
            return (
              <div
                key={club.id}
                onClick={() => handleSelectCommunity(club.id)}
                className={`border rounded-[18px] overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  darkMode
                    ? 'bg-[#0e0e13] border-white/[0.08] hover:border-[#24a0ed]/50 hover:shadow-cyan-500/10 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/50'
                }`}
              >
                {/* Banner Area */}
                <div>
                  <div className="relative h-[145px] w-full overflow-hidden bg-black">
                    <img
                      src={club.banner}
                      alt={club.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                        darkMode
                          ? 'from-[#0e0e13] via-transparent to-black/30'
                          : 'from-white/80 via-transparent to-black/30'
                      }`}
                    />

                    {/* Category Badge (Top Left) */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                      {club.category}
                    </div>

                    {/* Subscribe Bell Button (Top Right) */}
                    <button
                      onClick={(e) => toggleSub(club.id, e)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer border ${
                        isSubbed
                          ? 'bg-[#24a0ed] border-[#24a0ed] text-white shadow-lg'
                          : 'bg-black/60 border-white/15 text-white hover:bg-black/80'
                      }`}
                      title={isSubbed ? 'Subscribed' : 'Subscribe'}
                    >
                      {isSubbed ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Bell className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Overlapping Club Logo */}
                  <div className="px-4 -mt-5 relative z-10 flex items-end justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl p-1 shadow-md flex items-center justify-center overflow-hidden shrink-0 border transition-transform group-hover:scale-105 ${
                        darkMode
                          ? 'bg-white ring-2 ring-[#0e0e13]'
                          : 'bg-white ring-2 ring-white border-slate-200'
                      }`}
                    >
                      {renderClubLogo(club.logo, club.name)}
                    </div>
                  </div>

                  {/* Club Content */}
                  <div className="px-4 pb-3">
                    <h3
                      className={`text-[13px] font-bold group-hover:text-[#24a0ed] transition line-clamp-1 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {club.name}
                    </h3>
                    <div className={`text-[10px] mb-1.5 font-mono ${darkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                      {club.handle}
                    </div>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                      {club.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className={`px-4 py-2.5 border-t flex items-center justify-between text-[10px] ${
                    darkMode ? 'border-white/[0.06] text-zinc-500' : 'border-slate-100 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{club.membersCount + (isSubbed ? 1 : 0)} members</span>
                  </div>
                  <span className="text-[#24a0ed] font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View page →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
