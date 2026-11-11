import React, {useEffect, useRef, useState, useCallback} from 'react';
import {ArrowRight, Compass, MessageCircle, Sparkles} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

const HERO_VIDEO_SRC =
  '/assets/aistudio/WhatsApp_Video_2026-11-10_at_16.31.24_b3076132.mp4';
const HERO_POSTER_SRC = '/assets/hero-poster.jpg';

const MARQUEE_ITEMS = [
  'Web Development',
  'Web Design',
  'Graphic Design',
  'UI/UX Design',
  'GABBY TEQ',
  'Turning Ideas Into Digital Experiences',
  'Nigeria',
  'Creative Solutions',
  'Interactive Architecture',
];

// Staggered word animation helper for heading
function AnimatedHeadingWords({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={`${word}-${wordIdx}`} className="inline-block overflow-hidden py-0.5">
          <motion.span
            initial={{opacity: 0, y: '110%', filter: 'blur(8px)'}}
            animate={{opacity: 1, y: '0%', filter: 'blur(0px)'}}
            transition={{
              duration: 0.7,
              delay: delay + wordIdx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({x: 0, y: 0, pctX: 50, pctY: 50});
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  // Speed up video to finish in exactly 4 seconds, with browser compatibility
  const setSafePlaybackRate = (videoEl: HTMLVideoElement) => {
    const duration = videoEl.duration || 10;
    const targetRate = duration / 4.0; // 10.0 / 4.0 = 2.5x
    try {
      videoEl.playbackRate = targetRate;
    } catch {
      try {
        videoEl.playbackRate = Math.min(2.0, targetRate);
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    setSafePlaybackRate(videoEl);
  };

  const startPlayback = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl || videoCompleted) return;

    // Strict attributes for mobile & iframe autoplay compliance
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.volume = 0;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', 'true');

    setSafePlaybackRate(videoEl);

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay waiting for user gesture:', err);
          setIsPlaying(false);
        });
    }
  }, [videoCompleted]);

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl || videoCompleted) return;
    const duration = videoEl.duration;
    // Guard: only freeze on final frame once video has actually played past 0.5s
    if (
      duration &&
      duration > 1 &&
      videoEl.currentTime > 0.5 &&
      videoEl.currentTime >= duration - 0.2
    ) {
      videoEl.pause();
      setVideoCompleted(true);
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.pause();
    setVideoCompleted(true);
    setIsPlaying(false);
  };

  const handleVideoClick = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (videoCompleted) {
      // Replay smoothly
      videoEl.currentTime = 0;
      setVideoCompleted(false);
      startPlayback();
    } else if (videoEl.paused) {
      startPlayback();
    }
  };

  useEffect(() => {
    let started = false;

    const triggerStart = () => {
      if (started) return;
      started = true;
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.currentTime = 0;
        setVideoCompleted(false);
        startPlayback();
      }
    };

    // 1. Wait until page loader curtain reveals the Hero section
    window.addEventListener('gabby:loader-done', triggerStart, {once: true});

    // 2. Fallback timer in case loader was skipped, fast, or reduced motion
    const fallbackTimer = setTimeout(triggerStart, 1250);

    // 3. User interaction backup: if browser requires user gesture to play media
    const handleInteraction = () => {
      triggerStart();
      const videoEl = videoRef.current;
      if (videoEl && videoEl.paused && !videoCompleted) {
        startPlayback();
      }
    };

    window.addEventListener('pointerdown', handleInteraction, {passive: true});
    window.addEventListener('keydown', handleInteraction, {passive: true});
    window.addEventListener('touchstart', handleInteraction, {passive: true});
    window.addEventListener('scroll', handleInteraction, {passive: true, once: true});

    return () => {
      window.removeEventListener('gabby:loader-done', triggerStart);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      clearTimeout(fallbackTimer);
    };
  }, [startPlayback, videoCompleted]);

  // Mouse interaction with interpolated physics
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (prefersReduced || e.pointerType === 'touch' || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const pctX = Math.round((clientX / rect.width) * 100);
      const pctY = Math.round((clientY / rect.height) * 100);
      const normalizedX = (clientX / rect.width - 0.5) * 2;
      const normalizedY = (clientY / rect.height - 0.5) * 2;

      setMousePos({
        x: normalizedX,
        y: normalizedY,
        pctX,
        pctY,
      });
    },
    [prefersReduced],
  );

  const handlePointerLeave = useCallback(() => {
    setMousePos({x: 0, y: 0, pctX: 50, pctY: 50});
    resetCursor();
  }, [resetCursor]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const tiltX = -mousePos.y * 7;
  const tiltY = mousePos.x * 7;

  return (
    <section
      ref={containerRef}
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden w-full max-w-full bg-[#F5F7FA] transition-colors duration-300"
    >
      {/* Dynamic Mouse-responsive Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.pctX}% ${mousePos.pctY}%, rgba(8, 123, 255, 0.12), transparent 70%)`,
        }}
      />

      {/* Atmospheric Luminous Orbs */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0)`,
          transition: 'transform 300ms ease-out',
        }}
        className="pointer-events-none absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#00D5FF]/18 to-[#087BFF]/12 blur-3xl opacity-80 dark:opacity-90"
      />
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0)`,
          transition: 'transform 300ms ease-out',
        }}
        className="pointer-events-none absolute top-10 -right-24 w-[560px] h-[560px] rounded-full bg-gradient-to-bl from-[#792BFF]/16 via-[#E83DCE]/12 to-transparent blur-3xl opacity-80 dark:opacity-90"
      />

      {/* Floating 3D Geometric Accents */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0) rotate(${mousePos.x * 12}deg)`,
          transition: 'transform 200ms ease-out',
        }}
        className="pointer-events-none hidden lg:block absolute top-28 left-[44%] w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#087BFF]/30 to-[#00D5FF]/20 border border-white/60 dark:border-white/15 backdrop-blur-md shadow-[0_12px_28px_rgba(8,123,255,0.18)]"
      />
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0) rotate(${mousePos.y * -14}deg)`,
          transition: 'transform 200ms ease-out',
        }}
        className="pointer-events-none hidden lg:block absolute bottom-28 left-16 w-12 h-12 rounded-full border-2 border-[#E83DCE]/40 bg-gradient-to-br from-[#E83DCE]/20 to-transparent backdrop-blur-sm"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
          {/* Left Column: Typographic Hierarchy & Staggered Entrance */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Status Radar Badge */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-[#087BFF]/25 dark:border-white/15 text-[#087BFF] dark:text-[#00D5FF] text-xs font-semibold tracking-wide uppercase shadow-sm mb-5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#087BFF] dark:bg-[#00D5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#087BFF] dark:bg-[#00D5FF]" />
              </span>
              <span>GABBY TEQ &bull; CREATIVE DEVELOPER</span>
            </motion.div>

            {/* Cinematic Main Heading Reveal */}
            <h1 className="font-display font-extrabold text-[#101426] tracking-tight leading-[1.08] text-balance text-3xl sm:text-5xl lg:text-[3.35rem] break-words">
              <AnimatedHeadingWords text="Joseph Gabriel" delay={0.1} />{' '}
              <motion.span
                initial={prefersReduced ? false : {opacity: 0, y: 25, filter: 'blur(10px)'}}
                animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
                transition={{duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1]}}
                className="bg-gradient-to-r from-[#087BFF] via-[#792BFF] to-[#E83DCE] bg-clip-text text-transparent inline-block"
              >
                Olaoluwa.
              </motion.span>
            </h1>

            {/* Sub-role line */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="mt-4 flex items-center gap-2 text-sm sm:text-base font-semibold text-[#087BFF]"
            >
              <Sparkles className="w-4 h-4 text-[#792BFF]" />
              <span>Web Developer | Creative Designer | UI/UX Designer</span>
            </motion.div>

            {/* Value Proposition Description */}
            <motion.p
              initial={prefersReduced ? false : {opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1]}}
              className="mt-4 text-base sm:text-lg leading-relaxed text-[#101426]/75 max-w-xl font-medium"
            >
              Crafting immersive, high-performance digital experiences and robust web architectures
              where engineering excellence meets aesthetic distinction.
            </motion.p>

            {/* Interactive Magnetic CTAs */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1]}}
              className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full"
            >
              <Magnetic strength={0.25} cursorType="hover">
                <button
                  type="button"
                  onClick={() => scrollToSection('#portfolio')}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#101426] text-white font-semibold text-sm sm:text-[15px] shadow-[0_16px_34px_-10px_rgba(16,20,38,0.35)] hover:bg-[#087BFF] transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2 overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10">Explore Projects</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <Magnetic strength={0.25} cursorType="contact" cursorText="WHATSAPP">
                <a
                  href="https://wa.me/2347069536353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-[15px] shadow-[0_14px_28px_-10px_rgba(16,185,129,0.38)] transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25} cursorType="contact" cursorText="LET'S TALK">
                <button
                  type="button"
                  onClick={() => scrollToSection('#contact')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#101426] border border-[#101426]/14 font-semibold text-sm sm:text-[15px] hover:border-[#792BFF]/50 hover:text-[#792BFF] shadow-sm transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#792BFF] focus-visible:ring-offset-2 w-full sm:w-auto"
                >
                  <Compass className="w-4 h-4 text-[#FF8A24]" />
                  <span>Contact Me</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Column: Frameless Video Seamlessly Blending with the Page */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, scale: 0.94, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            transition={{duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7 relative w-full max-w-full"
          >
            {/* Multi-layered Soft Atmospheric Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#087BFF]/20 via-[#792BFF]/15 to-[#E83DCE]/18 blur-3xl opacity-80 transition-all duration-500"
              style={{
                transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
              }}
            />

            {/* Orbiting 3D Accent Ring */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute -top-6 -right-6 w-24 h-24 rounded-full border border-[#087BFF]/20 animate-[spin_24s_linear_infinite]"
              style={{
                transform: `rotateX(${tiltX * 0.5}deg) rotateY(${tiltY * 0.5}deg)`,
              }}
            />

            {/* Floating Glassmorphic 3D Feature Badges */}
            <motion.div
              aria-hidden="true"
              style={{
                transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
              }}
              className="pointer-events-none hidden sm:flex items-center gap-2.5 absolute -top-4 left-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(8,123,255,0.15)] z-20 text-[#101426]"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#087BFF] to-[#00D5FF] animate-ping" />
              <span className="font-mono text-xs font-bold tracking-wide">
                FULL-STACK &bull; UI/UX
              </span>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={{
                transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`,
              }}
              className="pointer-events-none hidden sm:flex items-center gap-2 absolute -bottom-3 right-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_28px_rgba(121,43,255,0.15)] z-20 text-[#101426]"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-xs font-semibold text-[#101426]/85">
                AVAILABLE FOR PROJECTS
              </span>
            </motion.div>

            {/* Borderless Frameless Video Container Blending into the Canvas */}
            <div
              style={{
                transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={handleVideoClick}
              onMouseEnter={() =>
                setCursor(
                  'project',
                  videoCompleted ? 'REPLAY' : isPlaying ? 'GABBY TEQ' : 'PLAY',
                )
              }
              onMouseLeave={() => resetCursor()}
              className="relative w-full max-w-2xl mx-auto flex items-center justify-center py-2 cursor-pointer select-none"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: '848 / 476',
                  maskImage:
                    'radial-gradient(ellipse 94% 90% at 50% 50%, black 72%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 94% 90% at 50% 50%, black 72%, transparent 100%)',
                }}
              >
                {/* Fallback play prompt if browser blocked autoplay before first gesture */}
                {!isPlaying && !videoCompleted && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/[0.03] transition-opacity duration-300 pointer-events-none"
                  >
                    <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white/95 backdrop-blur-md shadow-[0_12px_28px_rgba(8,123,255,0.28)] border border-[#087BFF]/35 flex items-center justify-center text-[#087BFF] animate-pulse">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {videoFailed ? (
                  <img
                    src={HERO_POSTER_SRC}
                    alt="Joseph Gabriel Olaoluwa (GABBY TEQ) animated studio identity"
                    style={{
                      transform: videoCompleted ? 'scale(1.48)' : 'scale(1)',
                      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transformOrigin: '50% 50%',
                    }}
                    className="w-full h-full object-cover block select-none mix-blend-multiply"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={HERO_VIDEO_SRC}
                    poster={HERO_POSTER_SRC}
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    aria-label="Joseph Gabriel Olaoluwa (GABBY TEQ) animated brand introduction video"
                    onError={(e) => {
                      console.warn('Video playback warning:', e);
                    }}
                    style={{
                      transform: videoCompleted ? 'scale(1.48)' : 'scale(1)',
                      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transformOrigin: '50% 50%',
                    }}
                    className="w-full h-full object-cover block select-none mix-blend-multiply"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Studio Discipline Marquee Ribbon Divider */}
        <div className="mt-14 sm:mt-18 overflow-hidden w-full max-w-full border-y border-[#101426]/8 py-4 bg-white/40 backdrop-blur-sm rounded-xl">
          <div className="animate-gabby-marquee flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wide text-[#101426]/70 dark:text-white/70 whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <div key={`${item}-${idx}`} className="flex items-center gap-8">
                <span>{item}</span>
                <span
                  aria-hidden="true"
                  className="text-[#087BFF] dark:text-[#00D5FF] font-bold select-none text-base"
                >
                  &bull;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
