import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../../../data/mockData';
import { useAuth } from '../../../context/AuthContext';
import { Search, UserPlus, Check, Filter } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

interface ConnectViewProps {
  onNotify: (msg: string) => void;
}

export const ConnectView: React.FC<ConnectViewProps> = ({ onNotify }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [connectedUsers, setConnectedUsers] = useState<{ [id: string]: boolean }>({});

  const branches = ['All', 'Computer Engineering', 'AI & Data Science', 'Information Technology', 'Electronics & Telecommunication'];

  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.bio?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      selectedBranch === 'All' || student.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const handleConnect = (studentName: string, studentId: string) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    setConnectedUsers((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
    const isNowConnected = !connectedUsers[studentId];
    onNotify(
      isNowConnected
        ? `Connection request sent to ${studentName}!`
        : `Cancelled connection request with ${studentName}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Student Connect Hub</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live Directory
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Discover peer developers, design leads, researchers, and hackathon teammates across PCCOE
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, skills (e.g. 'React', 'PyTorch', 'Figma')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-indigo-500"
          >
            {branches.map((b) => (
              <option key={b} value={b} className="bg-[#121216] text-white">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.map((student) => {
          const isConnected = connectedUsers[student.id];

          return (
            <div
              key={student.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl ring-2 ring-indigo-500/30 object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {student.name}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium mt-0.5">
                        {student.branch}
                      </p>
                      <span className="text-[11px] text-zinc-400">
                        {student.year}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleConnect(student.name, student.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isConnected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bio */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-4 font-normal">
                  {student.bio}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {student.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-zinc-400">
                <span className="text-[11px] text-zinc-500 font-mono">
                  {student.email}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:text-[#0a66c2] hover:bg-white/[0.05] transition"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
