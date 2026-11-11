import {useEffect, useRef, useState} from 'react';
import {ArrowRight, Compass} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';

const HERO_VIDEO_SRC =
  '/assets/aistudio/WhatsApp_Video_2026-11-10_at_16.31.24_b3076132.mp4';
const HERO_POSTER_SRC = '/assets/hero-poster.jpg';

const MARQUEE_ITEMS = [
  'Web Design & Development',
  'Graphic Design',
  'Branding & Visual Identity',
  'Digital Creativity',
  'Technology Solutions',
  'Creative Consultation',
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0});
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || videoFailed) return;
    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay blocked fallback remains visually represented via poster frame.
      });
    }
  }, [videoFailed]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -py * 4.5,
      rotateY: px * 4.5,
    });
  };

  const handlePointerLeave = () => {
    setTilt({rotateX: 0, rotateY: 0});
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-[#F5F7FA]"
    >
      {/* Ambient studio atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#00D5FF]/14 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 w-[460px] h-[460px] rounded-full bg-[#792BFF]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Left Column: Typographic Hierarchy & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.p
              initial={prefersReduced ? false : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="text-sm sm:text-[15px] font-semibold tracking-tight text-[#087BFF] mb-4"
            >
              Creative Thinker. Digital Innovator. Technology Enthusiast.
            </motion.p>

            <motion.h1
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
              className="font-display font-extrabold text-[#101426] tracking-tight leading-[1.06] text-balance text-4xl sm:text-5xl lg:text-[3.5rem]"
            >
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-[#087BFF] via-[#792BFF] to-[#E83DCE] bg-clip-text text-transparent">
                Gabby Teq.
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1]}}
              className="mt-5 text-base sm:text-lg leading-relaxed text-[#101426]/75 max-w-xl"
            >
              I turn ideas into beautiful digital experiences through creativity,
              technology, and innovation.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1]}}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={() => scrollToSection('#portfolio')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#101426] text-white font-semibold text-sm sm:text-[15px] shadow-[0_14px_30px_-10px_rgba(16,20,38,0.38)] hover:bg-[#087BFF] hover:shadow-[0_16px_34px_-10px_rgba(8,123,255,0.45)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#101426] border border-[#101426]/14 font-semibold text-sm sm:text-[15px] hover:border-[#792BFF]/50 hover:text-[#792BFF] shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#792BFF] focus-visible:ring-offset-2"
              >
                <Compass className="w-4 h-4 text-[#FF8A24]" />
                <span>Let&apos;s Work Together</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Signature Animated Intro Video Showcase */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, scale: 0.96, y: 14}}
            animate={{opacity: 1, scale: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7 relative"
          >
            {/* Subtle glowing Blue, Purple, and Magenta background aura around the video */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 sm:-inset-7 rounded-[40px] bg-gradient-to-tr from-[#087BFF]/28 via-[#792BFF]/24 to-[#E83DCE]/26 blur-2xl opacity-90"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 right-8 w-44 h-44 rounded-full bg-[#FF8A24]/20 blur-2xl"
            />

            {/* Lightweight Floating 3D Geometric Accents */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute -top-5 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D5FF] to-[#087BFF] opacity-85 shadow-lg animate-float-slow rotate-12"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute -bottom-4 -left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8A24] to-[#FFC247] opacity-90 shadow-lg animate-float-delayed -rotate-12"
            />

            {/* Glassmorphic Rounded Video Frame with 3D Perspective Tilt */}
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative rounded-[28px] p-2.5 sm:p-3.5 bg-white/80 backdrop-blur-xl border border-white shadow-[0_28px_72px_-18px_rgba(16,20,38,0.22)]"
            >
              <div
                className="relative w-full overflow-hidden rounded-[18px] bg-white border border-[#101426]/6"
                style={{aspectRatio: '848 / 476'}}
              >
                {videoFailed ? (
                  <img
                    src={HERO_POSTER_SRC}
                    alt="GABBY TEQ 3D animated studio identity"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={HERO_VIDEO_SRC}
                    poster={HERO_POSTER_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="GABBY TEQ animated brand introduction video"
                    onError={() => setVideoFailed(true)}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Studio Discipline Marquee Ribbon Divider */}
        <div className="mt-14 sm:mt-16 overflow-hidden border-y border-[#101426]/8 py-4">
          <div className="animate-gabby-marquee flex items-center gap-8 text-xs sm:text-sm font-medium text-[#101426]/60 whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <div key={`${item}-${idx}`} className="flex items-center gap-8">
                <span>{item}</span>
                <span
                  aria-hidden="true"
                  className="text-[#087BFF] font-bold select-none"
                >
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
