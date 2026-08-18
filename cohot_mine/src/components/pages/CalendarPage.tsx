import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  category?: 'Exam' | 'Academic' | 'Holiday' | 'Event';
  color?: string;
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'ev1',
    title: 'Red Channel Examination',
    date: '2026-08-03',
    category: 'Exam',
    color: 'bg-slate-200/80 text-slate-700 dark:bg-white/10 dark:text-zinc-300',
  },
  {
    id: 'ev2',
    title: 'Red Channel Result',
    date: '2026-08-05',
    category: 'Academic',
    color: 'bg-slate-200/80 text-slate-700 dark:bg-white/10 dark:text-zinc-300',
  },
  {
    id: 'ev3',
    title: 'In-Sem Evaluation (Phase 1)',
    date: '2026-08-12',
    category: 'Exam',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
  },
  {
    id: 'ev4',
    title: 'PCCOE Hackathon SIH Submission',
    date: '2026-08-21',
    category: 'Event',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300',
  },
  {
    id: 'ev5',
    title: 'Independence Day Holiday',
    date: '2026-08-15',
    category: 'Holiday',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
  },
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarPage: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [selectedDay, setSelectedDay] = useState<number | null>(18);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Build grid calendar cells
  const calendarDays = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(daysInPrevMonth - i).padStart(2, '0')}`,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({
      day: d,
      isCurrentMonth: true,
      dateString: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    });
  }

  // Next month leading days (to fill 35 or 42 grid cells)
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let n = 1; n <= remainingCells; n++) {
    calendarDays.push({
      day: n,
      isCurrentMonth: false,
      dateString: `${year}-${String(month + 2).padStart(2, '0')}-${String(n).padStart(2, '0')}`,
    });
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !selectedDay) return;

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const newEv: CalendarEvent = {
      id: `ev_${Date.now()}`,
      title: newEventTitle.trim(),
      date: dateString,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
    };

    setEvents([...events, newEv]);
    setNewEventTitle('');
    setShowEventModal(false);
  };

  return (
    <div className={`space-y-4 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="relative inline-flex items-center">
            <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              c/calendar
            </h1>
            <img
              src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
              alt=""
              className="absolute -top-3.5 left-[16px] w-6 h-6 pointer-events-none z-10"
            />
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Academic events and important dates.
          </p>
        </div>

        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2dd4bf] text-black font-bold text-xs hover:bg-[#20c997] transition cursor-pointer shadow-lg shadow-[#2dd4bf]/20"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Date</span>
        </button>
      </div>

      {/* Main Calendar Card */}
      <div className={`border rounded-[20px] overflow-hidden shadow-xl transition-colors ${
        darkMode ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        {/* Month Title & Chevron Controls */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          darkMode ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {monthName} {year}
          </h2>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                darkMode ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                darkMode ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Row */}
        <div className={`grid grid-cols-7 border-b text-center text-xs font-semibold ${
          darkMode ? 'bg-white/[0.02] border-white/[0.08] text-zinc-400' : 'bg-slate-100/70 border-slate-200 text-slate-500'
        }`}>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="py-2.5">
              {day}
            </div>
          ))}
        </div>

        {/* 7-Column Calendar Days Grid */}
        <div className={`grid grid-cols-7 ${darkMode ? 'divide-x divide-y divide-white/[0.06]' : 'divide-x divide-y divide-slate-200'}`}>
          {calendarDays.map((cDay, idx) => {
            const dayEvents = events.filter((e) => e.date === cDay.dateString);
            const isToday = cDay.isCurrentMonth && cDay.day === 18 && month === 7 && year === 2026;
            const isSelected = cDay.isCurrentMonth && selectedDay === cDay.day;

            return (
              <div
                key={idx}
                onClick={() => cDay.isCurrentMonth && setSelectedDay(cDay.day)}
                className={`min-h-[96px] p-2 flex flex-col justify-between transition-colors cursor-pointer relative ${
                  !cDay.isCurrentMonth
                    ? darkMode
                      ? 'bg-black/40 text-zinc-600'
                      : 'bg-slate-50/70 text-slate-400'
                    : isToday
                    ? darkMode
                      ? 'border-2 border-blue-500 z-10'
                      : 'border-2 border-blue-600 z-10'
                    : isSelected
                    ? darkMode
                      ? 'bg-white/[0.03]'
                      : 'bg-blue-50/40'
                    : darkMode
                    ? 'hover:bg-white/[0.02]'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Date Header Badge */}
                <div className="flex items-center justify-between mb-1">
                  {isToday ? (
                    <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-500/30">
                      {cDay.day}
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-semibold ${
                        !cDay.isCurrentMonth
                          ? 'opacity-40'
                          : darkMode
                          ? 'text-zinc-300'
                          : 'text-slate-800'
                      }`}
                    >
                      {cDay.day}
                    </span>
                  )}
                </div>

                {/* Event Tags inside Cell */}
                <div className="space-y-1 overflow-hidden">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate ${ev.color || 'bg-slate-200 text-slate-700'}`}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-[scaleIn_0.2s_ease-out] ${
            darkMode ? 'bg-[#0e0e13] border-white/[0.1]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Add Event for August {selectedDay || 18}, 2026
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className={`p-1 rounded-lg ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Event / Exam Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Sem Project Viva"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border outline-none ${
                    darkMode ? 'bg-[#121217] border-white/[0.08] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className={`px-3 py-1.5 rounded-xl ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#2dd4bf] text-black font-bold"
                >
                  Save Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
