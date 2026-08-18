import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  club: string;
  date: string;
  time: string;
  location: string;
  category: 'Technical' | 'Cultural' | 'Academic' | 'Hackathon';
  description: string;
  registered?: boolean;
}

const MOCK_EVENTS: EventItem[] = [
  {
    id: 'ev_1',
    title: 'OWASP PCCOE 24-Hour CTF Championship',
    club: 'OWASP Student Chapter',
    date: 'March 1, 2026',
    time: '10:00 AM onwards',
    location: 'CCF Labs & Online Portal',
    category: 'Hackathon',
    description:
      'National cybersecurity capture the flag competition with web exploitation, binary reverse engineering, OSINT, and forensics.',
  },
  {
    id: 'ev_2',
    title: 'Google Solution Challenge Info Bootcamp',
    club: 'GDGC PCCOE',
    date: 'March 8, 2026',
    time: '4:30 PM - 6:30 PM',
    location: 'LRDC Auditorium Floor 1',
    category: 'Technical',
    description:
      'Hands-on workshop on building sustainable solutions mapped to UN SDGs using Flutter, Google Cloud, and Gemini AI APIs.',
  },
  {
    id: 'ev_3',
    title: 'Algorithma 2026 Intra-College Coding Sprint',
    club: 'ACM Student Chapter',
    date: 'March 14, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Dept Lab 4 & 5',
    category: 'Technical',
    description:
      'Competitive speed coding tournament with dynamic programming, graph algorithms, and prize pool up to ₹15,000.',
  },
  {
    id: 'ev_4',
    title: 'Swarangam Annual Drama & Theatre Auditions',
    club: 'PCCOE Art Circle',
    date: 'March 18, 2026',
    time: '5:00 PM onwards',
    location: 'Main Amphitheatre Ground',
    category: 'Cultural',
    description:
      'Auditions for the prestigious Purushottam Karandak and Firodiya Karandak one-act play teams.',
  },
];

const CATEGORIES = ['All', 'Hackathon', 'Technical', 'Cultural', 'Academic'];

export const CalendarPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState(MOCK_EVENTS);

  const toggleRegister = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: !e.registered } : e))
    );
  };

  const filtered =
    activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory);

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">PCCOE Campus Calendar</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Stay on top of upcoming hackathons, CTFs, workshops, and club audition deadlines
          </p>
        </div>

        <button
          onClick={() => alert('Event submission opened for Club Leads!')}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition cursor-pointer flex items-center gap-1.5 shrink-0 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Campus Event</span>
        </button>
      </div>

      {/* Category Filter */}
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

      {/* Events Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-black/5 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {event.club}
                </span>
                <span className="text-xs font-semibold text-foreground/80">{event.category}</span>
              </div>

              <h3 className="text-base font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {event.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-foreground" />
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate max-w-[160px]">{event.location}</span>
                </div>

                <button
                  onClick={() => toggleRegister(event.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    event.registered
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {event.registered ? 'Registered ✓' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
