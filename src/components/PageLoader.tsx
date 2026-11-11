import {useEffect, useState} from 'react';
import {motion, AnimatePresence, useReducedMotion} from 'motion/react';
import {BrandMark} from './GeometricArt';

export function PageLoader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    // Smooth progress counter to 100% in ~600ms
    const startTime = performance.now();
    const duration = 600; // ms

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% momentarily before opening the cinematic curtain
        const timer = setTimeout(() => {
          setVisible(false);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gabby:loader-done'));
          }
        }, 80);
        return () => clearTimeout(timer);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    // Fail-safe timeout so the website is NEVER blocked
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setVisible(false);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gabby:loader-done'));
      }
    }, 1200);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fallbackTimer);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('gabby:loader-done'));
        }
      }}
    >
      {visible && (
        <motion.div
          key="cinematic-loader"
          initial={{opacity: 1}}
          exit={{
            y: '-100%',
            transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1]},
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101426] text-white select-none overflow-hidden"
          aria-label="Loading portfolio experience"
          role="status"
        >
          {/* Ambient luminous glow backdrops */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#087BFF]/25 via-[#792BFF]/20 to-[#E83DCE]/15 blur-3xl animate-pulse"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with Orbital Geometric Rings */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Outer rotating geometric dashes */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(0, 213, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
              </svg>

              {/* Counter-rotating accent ring */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse]"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="rgba(121, 43, 255, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="12 18"
                />
              </svg>

              {/* Central Glowing Brand Logo with Scale & Fade */}
              <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                className="relative z-10 p-3 rounded-2xl bg-[#101426]/80 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,123,255,0.35)]"
              >
                <BrandMark className="w-12 h-12 sm:w-14 sm:h-14" />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="mt-6 flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                GABBY TEQ
              </span>
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#00D5FF] font-medium">
                Creating Digital Experiences
              </span>
            </motion.div>

            {/* High-tech Progress Counter & Bar */}
            <div className="mt-8 w-56 sm:w-64 flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-between text-xs font-mono">
                <span className="text-white/45 text-[11px]">INITIALIZING</span>
                <span className="text-[#00D5FF] font-semibold tabular-nums">
                  {progress}%
                </span>
              </div>

              {/* Progress bar track */}
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#00D5FF] via-[#087BFF] to-[#E83DCE]"
                  style={{width: `${progress}%`}}
                  transition={{ease: 'easeOut', duration: 0.1}}
                />
              </div>
            </div>
          </div>

          {/* Bottom subtle identity stamp */}
          <div className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] tracking-widest text-white/40 uppercase">
            Joseph Gabriel Olaoluwa &bull; Creative Developer
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
