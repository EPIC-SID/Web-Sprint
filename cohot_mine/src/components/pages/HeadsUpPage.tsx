import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Notice {
  id: string;
  type: 'Urgent' | 'Resource' | 'Academic';
  title: string;
  department: string;
  timestamp: string;
  content: string;
  linkUrl?: string;
  linkText?: string;
}

const NOTICES: Notice[] = [
  {
    id: 'n1',
    type: 'Urgent',
    title: 'PCCOE Institutional Account Verification Notice',
    department: 'Admin & Dean Academics',
    timestamp: '2 hours ago',
    content:
      'Full access to placement drives, CTF portals, and internal project submissions will soon mandate signing in with your official @pccoepune.org college email ID.',
  },
  {
    id: 'n2',
    type: 'Resource',
    title: 'Theory of Computation (TOC) & DBMS End-Sem Question Banks Released',
    department: 'Computer & IT Dept',
    timestamp: 'Yesterday',
    content:
      'End-semester unit-wise question banks and SPPU previous 5-year solved papers are now uploaded to the Cohort resource drive.',
    linkUrl: 'https://drive.google.com',
    linkText: 'Access Question Bank Drive',
  },
  {
    id: 'n3',
    type: 'Academic',
    title: 'SPPU In-Sem Examination Timetable (TE & BE)',
    department: 'Exam Section',
    timestamp: '3 days ago',
    content:
      'In-semester assessment timetable for Third Year and Final Year engineering students has been declared on the SPPU portal.',
  },
];

export const HeadsUpPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-2xl font-bold text-foreground">C/HeadsUp</h1>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            Live Bulletins
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Official PCCOE college circulars, exam notifications, and resource bank alerts
        </p>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {NOTICES.map((n) => (
          <div
            key={n.id}
            className={`border rounded-2xl p-5 transition hover:shadow-md ${
              n.type === 'Urgent'
                ? 'bg-amber-500/8 border-amber-500/30'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    n.type === 'Urgent'
                      ? 'bg-amber-500 text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {n.type}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {n.department} • {n.timestamp}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-foreground mb-2">{n.title}</h3>
            <p className="text-xs text-foreground/80 leading-relaxed mb-3">{n.content}</p>

            {n.linkUrl && (
              <a
                href={n.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <span>{n.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
