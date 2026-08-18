import React, { useState, useEffect } from 'react';
import { Search, UserPlus, UserCheck, MessageSquare, GraduationCap, ShieldCheck } from 'lucide-react';
import { fetchFriends, toggleFriendConnection } from '../../lib/api';
import type { PeerStudent } from '../../lib/api';

interface FriendsPageProps {
  currentUserId?: string;
}

const BRANCHES = ['All', 'Computer', 'IT', 'AI & DS', 'E&TC', 'Mechanical'];

export const FriendsPage: React.FC<FriendsPageProps> = ({ currentUserId }) => {
  const [search, setSearch] = useState('');
  const [activeBranch, setActiveBranch] = useState('All');
  const [peers, setPeers] = useState<PeerStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends(currentUserId).then((data) => {
      setPeers(data);
      setLoading(false);
    });
  }, [currentUserId]);

  const handleToggleConnect = async (peerId: string, currentStatus: string) => {
    const isCurrentlyConnected = currentStatus === 'connected';

    // Optimistic UI update
    setPeers((prev) =>
      prev.map((p) =>
        p.id === peerId
          ? { ...p, status: isCurrentlyConnected ? 'none' : 'connected' }
          : p
      )
    );

    if (currentUserId) {
      try {
        await toggleFriendConnection(currentUserId, peerId, isCurrentlyConnected);
      } catch (err) {
        console.warn('Toggle connection error:', err);
      }
    }
  };

  const filtered = peers.filter((p) => {
    const matchesBranch =
      activeBranch === 'All' || p.branch.toLowerCase().includes(activeBranch.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      (p.bio && p.bio.toLowerCase().includes(search.toLowerCase()));
    return matchesBranch && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-xl font-bold text-white tracking-tight">
            c/friends
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30">
            Live Network
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Connect and collaborate with peers across all PCCOE departments.
        </p>
      </div>

      {/* Search & Branch Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 bg-[#121217] rounded-xl px-3.5 py-2 border border-white/[0.08] sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name or skill..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {BRANCHES.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBranch(b)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeBranch === b
                  ? 'bg-[#2dd4bf] text-black font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Peers Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-500">Loading PCCOE peer directory...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((peer) => (
            <div
              key={peer.id}
              className="bg-[#0e0e13] border border-white/[0.08] rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 transition-all group shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    {peer.avatar ? (
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div
                        className={`w-11 h-11 rounded-full ${peer.color} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {peer.initials}
                      </div>
                    )}
                    {peer.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0e0e13]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-[#2dd4bf] transition">
                        {peer.name}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                    </div>
                    <div className="text-xs text-zinc-500 truncate font-mono">{peer.username}</div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
                      <GraduationCap className="w-3 h-3 text-zinc-400" />
                      <span>
                        {peer.branch} • {peer.year}
                      </span>
                    </div>
                  </div>
                </div>

                {peer.bio && (
                  <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                    {peer.bio}
                  </p>
                )}

                {peer.skills && peer.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {peer.skills.slice(0, 3).map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-zinc-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => handleToggleConnect(peer.id, peer.status)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    peer.status === 'connected'
                      ? 'bg-white/[0.06] text-zinc-300 hover:bg-rose-500/20 hover:text-rose-400'
                      : 'bg-[#2dd4bf] text-black font-bold hover:bg-[#20c997]'
                  }`}
                >
                  {peer.status === 'connected' ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert(`Direct message started with ${peer.name}!`)}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition cursor-pointer border border-white/[0.06]"
                  title="Message"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
