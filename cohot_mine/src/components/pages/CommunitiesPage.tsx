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
  isSubscribed?: boolean;
}

interface CommunitiesPageProps {
  communities?: any[];
}

const SDW_COMMUNITIES: CommunityCardData[] = [
  {
    id: 'iic',
    name: "Institution's Innovation Council - PCCOE",
    handle: '@iicpccoe',
    description:
      "Institution's Innovation Council at PCCOE fostering innovation, startups, problem-solving, and entrepreneurship culture.",
    membersCount: 6,
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
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
    banner: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
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
    banner: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
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
    banner: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
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
    banner: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
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
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    logo: '/assets/cohort-logo.png',
    category: 'SDW',
  },
];

export const CommunitiesPage: React.FC<CommunitiesPageProps> = () => {
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
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out] text-[#e4e4e7]">
      {/* Header with Title + Department Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 relative">
            <h1 className="font-heading text-xl font-bold text-white tracking-tight">
              c/communities
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Join discussions and connect with your peers.
          </p>
        </div>

        {/* Department Filter Dropdown */}
        <div className="flex items-center gap-2 bg-[#0e0e13] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-zinc-300 self-start">
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-400 font-medium">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-transparent text-white font-semibold outline-none cursor-pointer pr-1"
          >
            <option value="All Departments" className="bg-[#0e0e13] text-white">
              All Departments
            </option>
            <option value="Computer" className="bg-[#0e0e13] text-white">
              Computer Engineering
            </option>
            <option value="IT" className="bg-[#0e0e13] text-white">
              Information Technology
            </option>
            <option value="AIDS" className="bg-[#0e0e13] text-white">
              AI & Data Science
            </option>
            <option value="ENTC" className="bg-[#0e0e13] text-white">
              Electronics & Telecommunication
            </option>
          </select>
        </div>
      </div>

      {/* Section 1: Student Development and Welfare (SDW) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-tight">
            Student Development and Welfare (SDW)
          </h2>

          <button
            onClick={handleSubscribeAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121217] hover:bg-white/[0.08] text-xs font-semibold text-white border border-white/[0.1] transition cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-zinc-300" />
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
                className="bg-[#0e0e13] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl shadow-black/40 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                {/* Banner Area */}
                <div>
                  <div className="relative h-36 w-full overflow-hidden bg-black">
                    <img
                      src={club.banner}
                      alt={club.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/30 pointer-events-none" />

                    {/* Subscribe Bell Button (Top Right) */}
                    <button
                      onClick={() => toggleSub(club.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer border ${
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
                  <div className="px-4 -mt-6 relative z-10 flex items-end justify-between mb-2">
                    <div className="w-11 h-11 rounded-full bg-white p-1 ring-4 ring-[#0e0e13] shadow-lg flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Club Content */}
                  <div className="px-4 pb-3">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#2dd4bf] transition line-clamp-1">
                      {club.name}
                    </h3>
                    <div className="text-[11px] text-zinc-500 mb-2 font-mono">
                      {club.handle}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {club.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />
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
