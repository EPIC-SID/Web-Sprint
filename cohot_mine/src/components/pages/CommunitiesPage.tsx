import React, { useState } from 'react';
import { Bell, Check, SlidersHorizontal, Users } from 'lucide-react';

interface CommunityCardData {
  id: string;
  name: string;
  handle: string;
  description: string;
  membersCount: number;
  banner: string;
  logo: string;
  category: string;
}

interface CommunitiesPageProps {
  communities?: any[];
  darkMode?: boolean;
}

const SDW_COMMUNITIES: CommunityCardData[] = [
  {
    id: 'iic',
    name: "Institution's Innovation Council - PCCOE",
    handle: '@iicpccoe',
    description:
      "Institution's Innovation Council at PCCOE fostering innovation, startups, problem-solving, and entrepreneurship culture.",
    membersCount: 6,
    banner:
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
  },
  {
    id: 'isr',
    name: 'Institutional Social Responsibility - PCCOE',
    handle: '@isrpccoe',
    description:
      'Institutional Social Responsibility community at PCCOE promoting social awareness, community welfare, and outreach programs.',
    membersCount: 1,
    banner:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/isr.png',
    category: 'SDW',
  },
  {
    id: 'ir',
    name: 'International Relations Cell - PCCOE',
    handle: '@ircpccoe',
    description:
      'Institutional Research Cell community encouraging research culture, paper publication, global exchange, and international conferences.',
    membersCount: 3,
    banner:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
  },
  {
    id: 'nss',
    name: 'National Service Scheme - PCCOE',
    handle: '@nsspccoe',
    description:
      'National Service Scheme (NSS) community at PCCOE encouraging social service, blood donation camps, village development, and nation building.',
    membersCount: 1,
    banner:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/nss.png',
    category: 'SDW',
  },
  {
    id: 'artcircle',
    name: 'PCCOE Art Circle',
    handle: '@artcirclepccoe',
    description:
      'The Art Circle community at PCCOE celebrating creativity through drawing, painting, theatre drama, classical music, and cultural arts.',
    membersCount: 4,
    banner:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/clubs/artcircle.png',
    category: 'SDW',
  },
  {
    id: 'sports',
    name: 'PCCOE Sports Cell',
    handle: '@sportscellpccoe',
    description:
      'Sports Cell community at PCCOE dedicated to sports activities, fitness, annual athletic meets, tournaments, and national participation.',
    membersCount: 3,
    banner:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
  },
];

export const CommunitiesPage: React.FC<CommunitiesPageProps> = ({ darkMode = true }) => {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [subscribedAll, setSubscribedAll] = useState(false);
  const [subscribedMap, setSubscribedMap] = useState<Record<string, boolean>>({
    iic: false,
    isr: false,
    ir: false,
    nss: false,
    artcircle: true,
    sports: false,
  });

  const toggleSub = (id: string) => {
    setSubscribedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribeAll = () => {
    const nextState = !subscribedAll;
    setSubscribedAll(nextState);
    const updated: Record<string, boolean> = {};
    SDW_COMMUNITIES.forEach((c) => {
      updated[c.id] = nextState;
    });
    setSubscribedMap(updated);
  };

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
            Join discussions and connect with your peers.
          </p>
        </div>

        {/* Department Filter Dropdown */}
        <div className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs self-start border transition-colors ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08] text-zinc-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <SlidersHorizontal className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
          <span className={`${darkMode ? 'text-zinc-400' : 'text-slate-500'} font-medium`}>Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className={`bg-transparent font-semibold outline-none cursor-pointer pr-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <option value="All Departments" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
              All Departments
            </option>
            <option value="Computer" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
              Computer Engineering
            </option>
            <option value="IT" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
              Information Technology
            </option>
            <option value="AIDS" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
              AI & Data Science
            </option>
            <option value="ENTC" className={darkMode ? 'bg-[#0e0e13] text-white' : 'bg-white text-slate-900'}>
              Electronics & Telecommunication
            </option>
          </select>
        </div>
      </div>

      {/* Section 1: Student Development and Welfare (SDW) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Student Development and Welfare (SDW)
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
          {SDW_COMMUNITIES.map((club) => {
            const isSubbed = subscribedMap[club.id];
            return (
              <div
                key={club.id}
                className={`border rounded-[18px] overflow-hidden shadow-xl transition-all flex flex-col justify-between group ${
                  darkMode
                    ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/50'
                }`}
              >
                {/* Banner Area (155px height) */}
                <div>
                  <div className="relative h-[155px] w-full overflow-hidden bg-black">
                    <img
                      src={club.banner}
                      alt={club.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                      darkMode ? 'from-[#0e0e13] via-transparent to-black/20' : 'from-white/80 via-transparent to-black/20'
                    }`} />

                    {/* Subscribe Bell Button (Top Right) */}
                    <button
                      onClick={() => toggleSub(club.id)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer border ${
                        isSubbed
                          ? 'bg-[#2dd4bf] border-[#2dd4bf] text-black'
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
                    <div className={`w-9 h-9 rounded-full p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0 border ${
                      darkMode ? 'bg-white ring-2 ring-[#0e0e13]' : 'bg-white ring-2 ring-white border-slate-200'
                    }`}>
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Club Content */}
                  <div className="px-4 pb-3">
                    <h3 className={`text-[13px] font-bold group-hover:text-[#2dd4bf] transition line-clamp-1 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
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
                <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[10px] ${
                  darkMode ? 'border-white/[0.06] text-zinc-500' : 'border-slate-100 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{club.membersCount} members</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
