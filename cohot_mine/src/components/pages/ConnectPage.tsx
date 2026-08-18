import React, { useState, useEffect } from 'react';
import { Search, Users, Trophy, Plus, Send, CheckCircle2 } from 'lucide-react';
import { fetchConnectRequests, createConnectRequest } from '../../lib/api';
import type { ConnectTeammateRequest } from '../../lib/api';

interface ConnectPageProps {
  currentUserId?: string;
  currentUser?: {
    name: string;
    branch?: string;
    year?: string;
  };
}

export const ConnectPage: React.FC<ConnectPageProps> = ({ currentUserId, currentUser }) => {
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState<ConnectTeammateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newHackathon, setNewHackathon] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSkills, setNewSkills] = useState('');

  useEffect(() => {
    fetchConnectRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const handleApply = (id: string) => {
    setApplied((prev) => ({ ...prev, [id]: true }));
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newHackathon) return;

    const skillsArray = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newReq: ConnectTeammateRequest = {
      id: `req_${Date.now()}`,
      hackathon: newHackathon,
      title: newTitle,
      author: {
        id: currentUserId || '',
        name: currentUser?.name || 'Siddhant Verma',
        branch: currentUser?.branch || 'Computer Engineering',
        year: currentUser?.year || 'TE',
      },
      description: newDesc,
      requiredSkills: skillsArray,
      teamSize: '1 / 4 Members',
      deadline: 'Open',
      isOpen: true,
    };

    setRequests([newReq, ...requests]);
    setShowModal(false);

    if (currentUserId) {
      try {
        await createConnectRequest(
          currentUserId,
          newHackathon,
          newTitle,
          newDesc,
          skillsArray,
          '1 / 4 Members',
          'Open'
        );
      } catch (err) {
        console.warn('Create connect request error:', err);
      }
    }

    setNewTitle('');
    setNewHackathon('');
    setNewDesc('');
    setNewSkills('');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out] text-[#e4e4e7]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-xl font-bold text-white tracking-tight">
              c/connect
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Team Finder
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Form teams for SIH 2026, Google Solution Challenge, and national CTFs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black text-xs font-bold hover:bg-[#20c997] transition cursor-pointer flex items-center gap-1.5 shrink-0 w-fit shadow-lg shadow-[#2dd4bf]/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post Requirement</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#121217] rounded-xl px-3.5 py-2 border border-white/[0.08]">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by hackathon, skill (e.g. React, IoT, Flutter), or keyword..."
          className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none"
        />
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-500">Loading hackathon teams...</div>
      ) : (
        <div className="space-y-4">
          {requests
            .filter(
              (r) =>
                r.hackathon.toLowerCase().includes(search.toLowerCase()) ||
                r.title.toLowerCase().includes(search.toLowerCase()) ||
                r.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
            )
            .map((req) => {
              const isApplied = applied[req.id];
              return (
                <div
                  key={req.id}
                  className="bg-[#0e0e13] border border-white/[0.08] rounded-2xl p-5 hover:border-white/20 transition flex flex-col justify-between shadow-xl shadow-black/30"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Trophy className="w-3 h-3" />
                          {req.hackathon}
                        </span>
                        <span className="text-xs text-zinc-500">• {req.deadline}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{req.title}</h3>
                    </div>

                    <button
                      onClick={() => handleApply(req.id)}
                      disabled={isApplied}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                          : 'bg-[#2dd4bf] text-black font-bold hover:bg-[#20c997]'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply to Team</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">{req.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-zinc-500">Required:</span>
                      <div className="flex flex-wrap gap-1">
                        {req.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 text-[10px] font-medium border border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {req.teamSize}
                      </span>
                      <span>
                        Posted by <strong className="text-white font-medium">{req.author.name}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Create Team Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e13] border border-white/[0.1] rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <h2 className="text-base font-bold text-white mb-4">Post Teammate Requirement</h2>
            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Hackathon / Event</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart India Hackathon 2026"
                  value={newHackathon}
                  onChange={(e) => setNewHackathon(e.target.value)}
                  className="w-full bg-[#121217] rounded-xl px-3 py-2 border border-white/[0.08] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Problem Statement / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-driven Smart Irrigation System"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#121217] rounded-xl px-3 py-2 border border-white/[0.08] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Description & Roles Needed</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your project and what kind of developers/designers you need..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#121217] rounded-xl px-3 py-2 border border-white/[0.08] text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-medium">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, PyTorch, Figma"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full bg-[#121217] rounded-xl px-3 py-2 border border-white/[0.08] text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold hover:bg-[#20c997] transition cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
