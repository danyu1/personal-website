'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

export default function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scanlineOffset = 0;
    let time = 0;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize particles
    const particleCount = prefersReducedMotion ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 15, // Orange/amber hues
      });
    }

    const animate = () => {
      time += 0.01;

      // Dark background with slight fade for trail effect
      ctx.fillStyle = 'rgba(3, 7, 18, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated gradient waves
      if (!prefersReducedMotion) {
        for (let i = 0; i < 3; i++) {
          const waveY = canvas.height * 0.3 + Math.sin(time + i * 2) * 50;
          const gradient = ctx.createRadialGradient(
            canvas.width / 2,
            waveY,
            0,
            canvas.width / 2,
            waveY,
            canvas.width * 0.6
          );
          gradient.addColorStop(0, `rgba(251, 146, 60, ${0.05 - i * 0.015})`);
          gradient.addColorStop(1, 'rgba(251, 146, 60, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 65%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Update particle position
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // Subtle pulsing opacity
          p.opacity = 0.3 + Math.sin(time * 2 + p.x * 0.01) * 0.2;
        }
      });

      // Draw connection lines between nearby particles
      if (!prefersReducedMotion) {
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              const opacity = (1 - dist / 150) * 0.15;
              ctx.strokeStyle = `rgba(251, 146, 60, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      }

      // Draw subtle grid
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.03)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw subtle scanlines
      const lineSpacing = 4;
      for (let y = 0; y < canvas.height + lineSpacing; y += lineSpacing) {
        const adjustedY = (y + scanlineOffset) % (canvas.height + lineSpacing);
        const opacity = 0.01 + Math.sin((adjustedY / canvas.height) * Math.PI * 2) * 0.005;

        ctx.strokeStyle = `rgba(251, 146, 60, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, adjustedY);
        ctx.lineTo(canvas.width, adjustedY);
        ctx.stroke();
      }

      // Animated highlight scanline
      if (!prefersReducedMotion) {
        const highlightY = (scanlineOffset * 2) % canvas.height;
        const gradient = ctx.createLinearGradient(0, highlightY - 40, 0, highlightY + 40);
        gradient.addColorStop(0, 'rgba(251, 146, 60, 0)');
        gradient.addColorStop(0.5, 'rgba(251, 146, 60, 0.02)');
        gradient.addColorStop(1, 'rgba(251, 146, 60, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, highlightY - 40, canvas.width, 80);

        scanlineOffset += 0.3;
        if (scanlineOffset > canvas.height + lineSpacing) {
          scanlineOffset = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
