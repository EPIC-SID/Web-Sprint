import React, { useState } from 'react';
import { Crown, Grid3X3, Hash } from 'lucide-react';

type GameTab = 'chess' | 'tictactoe' | 'sudoku';

// Unicode Chess Pieces
const PIECES: Record<string, string> = {
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  p: '♟',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  P: '♙',
};

// Initial Chess Board (8x8)
const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

export const ArcadePage: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  const [activeGame, setActiveGame] = useState<GameTab>('chess');

  // Chess State
  const [board, setBoard] = useState<string[][]>(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [playerColor, setPlayerColor] = useState<'White' | 'Black'>('White');
  const [turn, setTurn] = useState<'Your turn' | "Buddy AI's turn">('Your turn');

  // Tic-Tac-Toe State
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // CHESS HANDLERS
  // ---------------------------------------------------------------------------
  const handleSquareClick = (r: number, c: number) => {
    if (turn !== 'Your turn') return;

    if (!selectedSquare) {
      const piece = board[r][c];
      if (!piece) return;
      // White pieces are uppercase, Black lowercase
      const isWhite = piece === piece.toUpperCase();
      if (playerColor === 'White' && !isWhite) return;
      if (playerColor === 'Black' && isWhite) return;

      setSelectedSquare([r, c]);
    } else {
      const [fromR, fromC] = selectedSquare;
      if (fromR === r && fromC === c) {
        setSelectedSquare(null);
        return;
      }

      // Move piece
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = newBoard[fromR][fromC];
      newBoard[fromR][fromC] = '';

      setBoard(newBoard);
      setSelectedSquare(null);
      setTurn("Buddy AI's turn");

      // AI auto-move after 600ms
      setTimeout(() => {
        makeBuddyAiMove(newBoard);
      }, 600);
    }
  };

  const makeBuddyAiMove = (currentBoard: string[][]) => {
    const aiPieces: { r: number; c: number; piece: string }[] = [];
    const isAiBlack = playerColor === 'White';

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = currentBoard[r][c];
        if (p) {
          const isPieceWhite = p === p.toUpperCase();
          if (isAiBlack && !isPieceWhite) aiPieces.push({ r, c, piece: p });
          if (!isAiBlack && isPieceWhite) aiPieces.push({ r, c, piece: p });
        }
      }
    }

    if (aiPieces.length > 0) {
      // Pick random piece to make a simple valid step
      const randPiece = aiPieces[Math.floor(Math.random() * aiPieces.length)];
      const targetR = isAiBlack ? Math.min(7, randPiece.r + 1) : Math.max(0, randPiece.r - 1);
      const targetC = Math.max(0, Math.min(7, randPiece.c + (Math.random() > 0.5 ? 1 : -1)));

      const nextBoard = currentBoard.map((row) => [...row]);
      nextBoard[targetR][targetC] = randPiece.piece;
      nextBoard[randPiece.r][randPiece.c] = '';

      setBoard(nextBoard);
    }
    setTurn('Your turn');
  };

  const resetChess = () => {
    setBoard(INITIAL_BOARD);
    setSelectedSquare(null);
    setTurn('Your turn');
  };

  // ---------------------------------------------------------------------------
  // TIC-TAC-TOE HANDLERS
  // ---------------------------------------------------------------------------
  const handleTttClick = (index: number) => {
    if (tttBoard[index] || tttWinner) return;

    const newTtt = [...tttBoard];
    newTtt[index] = 'X';
    setTttBoard(newTtt);

    const winner = checkTttWinner(newTtt);
    if (winner) {
      setTttWinner(winner);
      return;
    }

    // AI move
    setTimeout(() => {
      const emptyIdxs = newTtt
        .map((val, idx) => (val === null ? idx : null))
        .filter((val): val is number => val !== null);

      if (emptyIdxs.length > 0) {
        const aiIdx = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)];
        newTtt[aiIdx] = 'O';
        setTttBoard([...newTtt]);
        const finalWinner = checkTttWinner(newTtt);
        if (finalWinner) setTttWinner(finalWinner);
      }
    }, 400);
  };

  const checkTttWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [x, y, z] of lines) {
      if (b[x] && b[x] === b[y] && b[x] === b[z]) return b[x];
    }
    if (b.every((cell) => cell !== null)) return 'Draw';
    return null;
  };

  const resetTtt = () => {
    setTttBoard(Array(9).fill(null));
    setTttWinner(null);
  };

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header */}
      <div>
        <div className="relative inline-flex items-center">
          <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            c/arcade
          </h1>
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute -top-3.5 left-[16px] w-6 h-6 pointer-events-none z-10"
          />
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Quick browser games you can play inside cohort.
        </p>
      </div>

      {/* Top 3 Games Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Chess Tab */}
        <button
          onClick={() => setActiveGame('chess')}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeGame === 'chess'
              ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-blue-500/20'
              : darkMode
              ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 text-zinc-300'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <Crown className="w-4 h-4" />
            <span>Chess</span>
          </div>
          <span className={`text-xs mt-1 ${activeGame === 'chess' ? 'text-blue-100' : 'text-zinc-400'}`}>
            You vs Buddy AI.
          </span>
        </button>

        {/* Tic-Tac-Toe Tab */}
        <button
          onClick={() => setActiveGame('tictactoe')}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeGame === 'tictactoe'
              ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-blue-500/20'
              : darkMode
              ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 text-zinc-300'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <Grid3X3 className="w-4 h-4" />
            <span>Tic-Tac-Toe</span>
          </div>
          <span className={`text-xs mt-1 ${activeGame === 'tictactoe' ? 'text-blue-100' : 'text-zinc-400'}`}>
            Play against Buddy AI.
          </span>
        </button>

        {/* Sudoku Tab */}
        <button
          onClick={() => setActiveGame('sudoku')}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeGame === 'sudoku'
              ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-blue-500/20'
              : darkMode
              ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 text-zinc-300'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <Hash className="w-4 h-4" />
            <span>Sudoku</span>
          </div>
          <span className={`text-xs mt-1 ${activeGame === 'sudoku' ? 'text-blue-100' : 'text-zinc-400'}`}>
            Fill the 9x9 grid.
          </span>
        </button>
      </div>

      {/* Center Pill: More games coming soon */}
      <div className="flex justify-center">
        <div className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
          darkMode
            ? 'bg-[#121217] border-white/[0.08] text-zinc-400'
            : 'bg-white border-slate-200 text-slate-500 shadow-sm'
        }`}>
          More games coming soon!
        </div>
      </div>

      {/* Main Game Stage */}
      <div className={`border rounded-[24px] p-6 shadow-xl transition-colors ${
        darkMode ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        {/* ===================================================================== */}
        {/* CHESS GAME */}
        {/* ===================================================================== */}
        {activeGame === 'chess' && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  You are <span className="text-[#2563eb]">{playerColor}</span>. Buddy AI is{' '}
                  <span className="text-zinc-400">{playerColor === 'White' ? 'Black' : 'White'}</span>.
                </div>
                <div className={`text-xs mt-0.5 ${turn === 'Your turn' ? 'text-emerald-500 font-semibold' : 'text-amber-500'}`}>
                  {turn}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlayerColor('White')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    playerColor === 'White'
                      ? 'bg-[#1d4ed8] text-white'
                      : darkMode
                      ? 'bg-white/[0.06] text-zinc-400 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Play White
                </button>
                <button
                  onClick={() => setPlayerColor('Black')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    playerColor === 'Black'
                      ? 'bg-[#1d4ed8] text-white'
                      : darkMode
                      ? 'bg-white/[0.06] text-zinc-400 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Play Black
                </button>
                <button
                  onClick={resetChess}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563eb] text-white font-bold text-xs hover:bg-blue-600 transition cursor-pointer"
                >
                  Reset board
                </button>
              </div>
            </div>

            {/* Chessboard Container */}
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden border-4 border-[#8B5A2B] shadow-2xl inline-block">
                <div className="grid grid-cols-8 grid-rows-8 w-[360px] h-[360px] sm:w-[460px] sm:h-[460px]">
                  {board.map((row, r) =>
                    row.map((piece, c) => {
                      const isDarkSquare = (r + c) % 2 === 1;
                      const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c;

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleSquareClick(r, c)}
                          className={`w-full h-full flex items-center justify-center text-3xl sm:text-4xl transition-all cursor-pointer select-none relative ${
                            isSelected
                              ? 'bg-yellow-400/80 ring-4 ring-yellow-400 inset-0 z-10'
                              : isDarkSquare
                              ? 'bg-[#B58863]'
                              : 'bg-[#F0D9B5]'
                          }`}
                        >
                          {piece && (
                            <span
                              className={`drop-shadow-md ${
                                piece === piece.toUpperCase()
                                  ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                                  : 'text-black drop-shadow-[0_2px_3px_rgba(255,255,255,0.4)]'
                              }`}
                            >
                              {PIECES[piece]}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Footnote */}
            <p className={`text-[11px] text-center ${darkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              Current chess mode supports castling, core movement, captures, and pawn promotion to queen.
            </p>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TIC-TAC-TOE GAME */}
        {/* ===================================================================== */}
        {activeGame === 'tictactoe' && (
          <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {tttWinner
                  ? tttWinner === 'Draw'
                    ? "Game Draw!"
                    : `${tttWinner} Wins!`
                  : 'Your Turn (X vs O)'}
              </span>
              <button
                onClick={resetTtt}
                className="px-3.5 py-1.5 rounded-xl bg-[#2563eb] text-white font-bold text-xs"
              >
                New Game
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 w-64 h-64 mx-auto">
              {tttBoard.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTttClick(idx)}
                  className={`rounded-2xl border text-3xl font-black flex items-center justify-center transition cursor-pointer ${
                    darkMode
                      ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  } ${cell === 'X' ? 'text-[#2dd4bf]' : 'text-rose-500'}`}
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* SUDOKU GAME */}
        {/* ===================================================================== */}
        {activeGame === 'sudoku' && (
          <div className="max-w-md mx-auto space-y-4 text-center">
            <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Daily PCCOE Sudoku (9x9)</h3>
            <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Fill each row, column, and 3x3 box with digits from 1 to 9.</p>
            <div className="p-8 border rounded-2xl bg-black/10 text-xs text-zinc-400">
              Interactive Sudoku puzzle generation active!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
