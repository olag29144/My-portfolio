import {useRef} from 'react';
import {ImagePlus, MapPin, MessageCircle, Sparkles, Trash2} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {AboutData} from '../types/portfolio';
import {ProfilePlaceholderArt} from './GeometricArt';
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

interface AboutSectionProps {
  about: AboutData;
  isEditing: boolean;
  onUpdate: (next: AboutData) => void;
}

export function AboutSection({about, isEditing, onUpdate}: AboutSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdate({...about, profileImageUrl: reader.result});
      }
    };
    reader.readAsDataURL(file);
  };

  const updatePillar = (id: string, field: 'title' | 'detail', value: string) => {
    onUpdate({
      ...about,
      focusPillars: about.focusPillars.map((p) =>
        p.id === id ? {...p, [field]: value} : p,
      ),
    });
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-white border-b border-[#101426]/6 overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      {/* Ambient luminous glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-0 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-[#00D5FF]/14 to-transparent blur-3xl opacity-80 dark:opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-6 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#E83DCE]/10 via-[#792BFF]/8 to-transparent blur-3xl opacity-80 dark:opacity-90"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mask-revealed Profile Artwork + 3D Elements */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, scale: 0.95, y: 24}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 relative"
          >
            {/* Glowing ambient backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 rounded-[40px] bg-gradient-to-tr from-[#087BFF]/22 via-[#792BFF]/18 to-[#FF8A24]/18 blur-2xl"
            />

            {/* Floating 3D Geometric Accents */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:flex items-center justify-center absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-white/90 dark:bg-[#141930]/90 backdrop-blur-md border border-white dark:border-white/15 shadow-[0_16px_32px_rgba(8,123,255,0.2)] animate-float-slow z-20"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#087BFF] to-[#00D5FF] rotate-12 shadow-inner" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:flex items-center justify-center absolute -bottom-6 -right-5 w-18 h-18 rounded-full bg-white/90 dark:bg-[#141930]/90 backdrop-blur-md border border-white dark:border-white/15 shadow-[0_16px_32px_rgba(121,43,255,0.2)] animate-float-delayed z-20"
            >
              <div className="w-8 h-8 rounded-full border-4 border-[#E83DCE] animate-spin" />
            </div>

            {/* Main Card with Smooth Clip Reveal */}
            <div
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => resetCursor()}
              className="relative rounded-[30px] p-3 sm:p-4 bg-[#F5F7FA] dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 shadow-[0_28px_70px_-20px_rgba(16,20,38,0.18)] dark:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.5)]"
            >
              <motion.div
                initial={
                  prefersReduced
                    ? false
                    : {clipPath: 'inset(10% 10% 10% 10% round 20px)', opacity: 0}
                }
                whileInView={{clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1}}
                viewport={{once: true, margin: '-60px'}}
                transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#101426]"
              >
                <ProfilePlaceholderArt
                  imageUrl={about.profileImageUrl}
                  alt="Joseph Gabriel Olaoluwa (GABBY TEQ) studio portrait"
                />
              </motion.div>

              <div className="mt-4 px-2 pb-1">
                {isEditing ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087BFF] text-white text-xs font-semibold hover:bg-[#087BFF]/90 transition-colors cursor-pointer"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>
                      {about.profileImageUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdate({...about, profileImageUrl: ''})
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/12 dark:border-white/15 text-xs font-medium text-[#101426]/80 dark:text-white/80 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Reset Avatar</span>
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <input
                      type="url"
                      value={about.profileImageUrl}
                      onChange={(e) =>
                        onUpdate({...about, profileImageUrl: e.target.value})
                      }
                      placeholder="Or paste an image URL..."
                      aria-label="Profile photo URL"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
                    <input
                      type="text"
                      value={about.profileCaption}
                      onChange={(e) =>
                        onUpdate({...about, profileCaption: e.target.value})
                      }
                      aria-label="Profile caption"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426]/80 dark:text-white/80 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-[#101426]/75 dark:text-white/75 leading-relaxed pt-1">
                    <span className="font-medium">{about.profileCaption}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#087BFF] dark:text-[#00D5FF] shrink-0 ml-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Nigeria
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Progressive Typography & Staggered Bio */}
          <div className="lg:col-span-7">
            {/* Section Tag */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, x: -15}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
              className="flex flex-wrap items-center gap-2 mb-3"
            >
              <span className="text-sm font-semibold text-[#792BFF] dark:text-[#00D5FF]">
                About Me
              </span>
              <span aria-hidden="true" className="text-[#101426]/20 dark:text-white/20">
                &bull;
              </span>
              <span className="text-xs font-mono font-semibold text-[#101426]/60 dark:text-white/60 uppercase tracking-wider">
                Brand: GABBY TEQ
              </span>
            </motion.div>

            {/* Progressive Heading */}
            {isEditing ? (
              <input
                type="text"
                value={about.heading}
                onChange={(e) => onUpdate({...about, heading: e.target.value})}
                aria-label="About section heading"
                className="w-full font-display font-bold text-3xl sm:text-4xl text-[#101426] dark:text-white tracking-tight bg-[#F5F7FA] dark:bg-white/10 border border-[#087BFF]/35 dark:border-white/20 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              />
            ) : (
              <motion.h2
                initial={prefersReduced ? false : {opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
                className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] dark:text-white tracking-tight leading-[1.14] text-balance"
              >
                {about.heading}
              </motion.h2>
            )}

            {/* Personal Introduction with Staggered Entrance */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="mt-5"
            >
              {isEditing ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101426]/65 dark:text-white/65">
                    Personal Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={about.intro}
                    onChange={(e) => onUpdate({...about, intro: e.target.value})}
                    className="w-full text-base sm:text-lg font-medium text-[#101426] dark:text-white bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-xl px-4 py-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                  />
                </div>
              ) : (
                <p className="text-lg sm:text-xl font-medium text-[#101426]/90 dark:text-white/90 leading-relaxed">
                  {about.intro}
                </p>
              )}
            </motion.div>

            {/* Professional Biography */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1]}}
              className="mt-4"
            >
              {isEditing ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101426]/65 dark:text-white/65">
                    Professional Biography
                  </label>
                  <textarea
                    rows={5}
                    value={about.biography}
                    onChange={(e) =>
                      onUpdate({...about, biography: e.target.value})
                    }
                    className="w-full text-sm sm:text-base text-[#101426]/80 dark:text-white/80 bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-xl px-4 py-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                  />
                </div>
              ) : (
                <p className="text-[15px] sm:text-base text-[#101426]/75 dark:text-white/75 leading-relaxed max-w-2xl">
                  {about.biography}
                </p>
              )}
            </motion.div>

            {/* Quick WhatsApp Action */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1]}}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25} cursorType="contact" cursorText="WHATSAPP">
                <a
                  href="https://wa.me/2347069536353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </Magnetic>
              <span className="text-xs text-[#101426]/60 dark:text-white/60">
                Direct phone: <strong className="text-[#101426]/80 dark:text-white/80">07069536353</strong>
              </span>
            </motion.div>

            {/* Focus Pillars with Staggered Entrance & Interactive Hover */}
            <div className="mt-9 pt-8 border-t border-[#101426]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {about.focusPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  initial={prefersReduced ? false : {opacity: 0, y: 16}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, margin: '-40px'}}
                  transition={{
                    duration: 0.45,
                    delay: 0.35 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group space-y-2 p-3.5 rounded-2xl hover:bg-[#F5F7FA] dark:hover:bg-white/[0.05] transition-colors duration-200"
                >
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#087BFF] dark:text-[#00D5FF] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#792BFF] dark:text-[#E83DCE]" />
                    0{idx + 1}.
                  </span>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) =>
                          updatePillar(pillar.id, 'title', e.target.value)
                        }
                        aria-label={`Pillar ${idx + 1} title`}
                        className="w-full text-sm font-semibold text-[#101426] dark:text-white bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                      />
                      <textarea
                        rows={3}
                        value={pillar.detail}
                        onChange={(e) =>
                          updatePillar(pillar.id, 'detail', e.target.value)
                        }
                        aria-label={`Pillar ${idx + 1} description`}
                        className="w-full text-xs text-[#101426]/75 dark:text-white/75 bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display font-semibold text-base text-[#101426] dark:text-white group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#101426]/65 dark:text-white/65 leading-relaxed">
                        {pillar.detail}
                      </p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
