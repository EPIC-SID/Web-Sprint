import React from 'react';
import { Bell, AlertTriangle, FileText } from 'lucide-react';

const ALERTS = [
  {
    id: 'a1',
    title: 'PCCOE Autonomous Exam Form Submission Deadline',
    category: 'Urgent',
    date: 'Today, 2:00 PM',
    description: 'In-sem and end-sem exam forms for SE, TE, and BE must be submitted through the ERP portal with no late fee.',
    type: 'warning',
  },
  {
    id: 'a2',
    title: 'DBMS & Operating Systems Question Bank Uploaded',
    category: 'Academics',
    date: 'Yesterday',
    description: 'Unit 1 to Unit 4 previous year solved papers & model answers are live on Cohort Google Drive repository.',
    type: 'info',
  },
  {
    id: 'a3',
    title: 'Mandatory PCCOE Account Login Rollout',
    category: 'Notice',
    date: 'May 1st',
    description: 'All Cohort features and student-only repositories will require login via @pccoepune.org Google Workspace ID.',
    type: 'notice',
  },
];

export const HeadsUpPage: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      <div>
        <div className="flex items-center gap-2">
          <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>c/headsup</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            Circulars & Alerts
          </span>
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Important college circulars, exam schedule notifications, and question bank releases.
        </p>
      </div>

      <div className="space-y-4">
        {ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-2xl p-5 transition-all shadow-xl ${
              darkMode
                ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 shadow-black/30'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/50'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`p-2 rounded-xl shrink-0 ${
                alert.type === 'warning'
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : alert.type === 'info'
                  ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
              }`}>
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : alert.type === 'info' ? (
                  <FileText className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    alert.type === 'warning'
                      ? 'text-amber-500'
                      : alert.type === 'info'
                      ? 'text-blue-500'
                      : 'text-purple-500'
                  }`}>
                    {alert.category}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>• {alert.date}</span>
                </div>
                <h3 className={`text-sm font-bold mb-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{alert.title}</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
