import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
}

export const LiquidFlowBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = (parent?.clientWidth || window.innerWidth) * dpr;
      canvas.height = (parent?.clientHeight || 650) * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const points: TrailPoint[] = [];
    let lastMousePos = { x: -1000, y: -1000 };
    let isMoving = false;
    let idleTimer: any = null;
    let globalAlpha = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const vx = x - (lastMousePos.x > 0 ? lastMousePos.x : x);
      const vy = y - (lastMousePos.y > 0 ? lastMousePos.y : y);
      const speed = Math.sqrt(vx * vx + vy * vy);

      lastMousePos = { x, y };
      isMoving = true;

      // Add fluid disturbance point
      points.push({
        x,
        y,
        vx: vx * 0.4,
        vy: vy * 0.4,
        age: 0,
        maxAge: Math.min(65, 30 + speed * 1.5),
        size: Math.min(180, 70 + speed * 3.5),
      });

      // Cap max points
      if (points.length > 35) points.shift();

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 250);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Smoothly adjust global alpha based on movement
      if (isMoving || points.length > 0) {
        globalAlpha = Math.min(1, globalAlpha + 0.08);
      } else {
        globalAlpha = Math.max(0, globalAlpha - 0.03);
      }

      if (globalAlpha > 0.01 && points.length > 0) {
        ctx.save();
        ctx.globalAlpha = globalAlpha;

        const isDark = document.documentElement.classList.contains('dark');

        // Draw and update each fluid ripple point
        for (let i = points.length - 1; i >= 0; i--) {
          const pt = points[i];
          pt.age += 1;
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vx *= 0.94;
          pt.vy *= 0.94;

          const life = 1 - pt.age / pt.maxAge;
          if (life <= 0) {
            points.splice(i, 1);
            continue;
          }

          const currentRadius = pt.size * (0.6 + (1 - life) * 0.6);

          // Liquid smoke gradient
          const grad = ctx.createRadialGradient(
            pt.x,
            pt.y,
            0,
            pt.x + Math.sin(time + i) * 15,
            pt.y + Math.cos(time + i) * 15,
            currentRadius
          );

          if (isDark) {
            // Dark Mode: Glowing Violet / Indigo / Fuchsia Caustic Smoke
            const alphaVal = life * 0.35;
            grad.addColorStop(0, `rgba(168, 85, 247, ${alphaVal * 0.9})`);
            grad.addColorStop(0.35, `rgba(99, 102, 241, ${alphaVal * 0.7})`);
            grad.addColorStop(0.7, `rgba(236, 72, 153, ${alphaVal * 0.3})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          } else {
            // Light Mode: Silky White / Pearlescent Smoke Fluid
            const alphaVal = life * 0.65;
            grad.addColorStop(0, `rgba(220, 228, 255, ${alphaVal * 0.85})`);
            grad.addColorStop(0.3, `rgba(235, 240, 255, ${alphaVal * 0.7})`);
            grad.addColorStop(0.65, `rgba(240, 235, 255, ${alphaVal * 0.4})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover filter blur-[28px] transition-opacity duration-300 pointer-events-none"
      />
    </div>
  );
};
