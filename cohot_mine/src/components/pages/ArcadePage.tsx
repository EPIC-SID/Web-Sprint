import React, { useState } from 'react';
import { Trophy, Zap, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const TRIVIA_QUESTIONS: Question[] = [
  {
    q: 'In which year was PCCOE established?',
    options: ['1999', '2001', '1995', '2005'],
    answer: 0,
  },
  {
    q: 'Which student body organizes the famous national-level Algorithma coding sprint at PCCOE?',
    options: ['GDGC', 'ACM Student Chapter', 'OWASP', 'CSI'],
    answer: 1,
  },
  {
    q: 'What does LRDC Auditorium stand for at PCCOE?',
    options: [
      'Learning & Resource Development Center',
      'Leadership Research & Design Center',
      'Late R.D. Chinchwad Center',
      'Lab Resource & Data Center',
    ],
    answer: 0,
  },
  {
    q: 'Which cultural theatre competition has PCCOE Art Circle repeatedly won accolades in?',
    options: ['Purushottam Karandak', 'Dadasaheb Phalke Sprint', 'DramaXpo', 'NatyaFest'],
    answer: 0,
  },
];

export const ArcadePage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === TRIVIA_QUESTIONS[currentIdx].answer) {
      setScore((s) => s + 100);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-foreground">Cohort Campus Arcade</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Minigame
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Test your PCCOE campus trivia and compete for karma points!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-card border border-border px-3.5 py-1.5 rounded-xl">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-foreground">{score} pts</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Question {currentIdx + 1} of {TRIVIA_QUESTIONS.length}
            </span>
            <span>+{100} Karma per correct answer</span>
          </div>

          <h2 className="text-lg font-bold text-foreground leading-relaxed">
            {TRIVIA_QUESTIONS[currentIdx].q}
          </h2>

          <div className="space-y-3">
            {TRIVIA_QUESTIONS[currentIdx].options.map((opt, idx) => {
              const isChosen = selectedOpt === idx;
              const isCorrect = idx === TRIVIA_QUESTIONS[currentIdx].answer;

              let btnStyle = 'bg-secondary hover:bg-secondary/80 border-border text-foreground';
              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-500';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-500/15 border-rose-500/40 text-rose-500';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOpt !== null}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && (
                    <>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition cursor-pointer"
            >
              {currentIdx + 1 < TRIVIA_QUESTIONS.length ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4 shadow-md">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Quiz Completed!</h2>
          <p className="text-sm text-muted-foreground">
            You scored <strong className="text-foreground">{score} points</strong> out of{' '}
            {TRIVIA_QUESTIONS.length * 100} points!
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
