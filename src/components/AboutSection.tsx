import {useRef} from 'react';
import {ImagePlus, Trash2} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {AboutData} from '../types/portfolio';
import {ProfilePlaceholderArt} from './GeometricArt';

interface AboutSectionProps {
  about: AboutData;
  isEditing: boolean;
  onUpdate: (next: AboutData) => void;
}

export function AboutSection({about, isEditing, onUpdate}: AboutSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();

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
      className="relative py-20 sm:py-28 bg-white border-b border-[#101426]/6 overflow-hidden"
    >
      {/* Soft studio gradient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-0 w-96 h-96 rounded-full bg-[#00D5FF]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-8 w-80 h-80 rounded-full bg-[#E83DCE]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stylish Profile Placeholder + Floating 3D Elements */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 relative"
          >
            {/* Animated ambient backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-[#087BFF]/20 via-[#792BFF]/18 to-[#FF8A24]/18 blur-2xl"
            />

            {/* Floating 3D Geometric Shapes */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:flex items-center justify-center absolute -top-5 -left-5 w-14 h-14 rounded-2xl bg-white/85 backdrop-blur-md border border-white shadow-[0_14px_30px_rgba(8,123,255,0.2)] animate-float-slow z-10"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#087BFF] to-[#00D5FF] rotate-12" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:flex items-center justify-center absolute -bottom-5 -right-4 w-16 h-16 rounded-full bg-white/85 backdrop-blur-md border border-white shadow-[0_14px_30px_rgba(121,43,255,0.2)] animate-float-delayed z-10"
            >
              <div className="w-7 h-7 rounded-full border-4 border-[#E83DCE]" />
            </div>

            <div className="relative rounded-[28px] p-3 bg-[#F5F7FA] border border-[#101426]/8 shadow-[0_24px_60px_-20px_rgba(16,20,38,0.16)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px]">
                <ProfilePlaceholderArt
                  imageUrl={about.profileImageUrl}
                  alt="Gabby Teq studio profile portrait"
                />
              </div>

              <div className="mt-3 px-2 pb-1">
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
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#101426]/12 text-xs font-medium text-[#101426]/80 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Use Placeholder</span>
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
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#101426]/15 text-[#101426] focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
                    <input
                      type="text"
                      value={about.profileCaption}
                      onChange={(e) =>
                        onUpdate({...about, profileCaption: e.target.value})
                      }
                      aria-label="Profile caption"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#101426]/15 text-[#101426]/80 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-[#101426]/60 leading-relaxed">
                    {about.profileCaption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editable Introduction & Biography */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <p className="text-sm font-semibold text-[#792BFF] mb-3">
              About Gabby Teq
            </p>

            {isEditing ? (
              <input
                type="text"
                value={about.heading}
                onChange={(e) => onUpdate({...about, heading: e.target.value})}
                aria-label="About section heading"
                className="w-full font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight bg-[#F5F7FA] border border-[#087BFF]/35 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              />
            ) : (
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] tracking-tight leading-[1.12] text-balance">
                {about.heading}
              </h2>
            )}

            {/* Short Personal Introduction */}
            <div className="mt-6">
              {isEditing ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101426]/65">
                    Short Personal Introduction
                  </label>
                  <textarea
                    rows={2}
                    value={about.intro}
                    onChange={(e) => onUpdate({...about, intro: e.target.value})}
                    className="w-full text-base sm:text-lg font-medium text-[#101426] bg-[#F5F7FA] border border-[#101426]/15 rounded-xl px-4 py-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                  />
                </div>
              ) : (
                <p className="text-lg sm:text-xl font-medium text-[#101426]/90 leading-relaxed">
                  {about.intro}
                </p>
              )}
            </div>

            {/* Editable Biography Area */}
            <div className="mt-5">
              {isEditing ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101426]/65">
                    Editable Biography (Background, Experience &amp; Passion)
                  </label>
                  <textarea
                    rows={4}
                    value={about.biography}
                    onChange={(e) =>
                      onUpdate({...about, biography: e.target.value})
                    }
                    className="w-full text-sm sm:text-base text-[#101426]/80 bg-[#F5F7FA] border border-[#101426]/15 rounded-xl px-4 py-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                  />
                </div>
              ) : (
                <p className="text-[15px] sm:text-base text-[#101426]/72 leading-relaxed max-w-2xl">
                  {about.biography}
                </p>
              )}
            </div>

            {/* Clean Architectural Focus Pillars (separated with hairline dividers, no left-border stripes) */}
            <div className="mt-9 pt-8 border-t border-[#101426]/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {about.focusPillars.map((pillar, idx) => (
                <div key={pillar.id} className="space-y-2">
                  <span className="font-mono text-xs font-medium tabular-nums text-[#087BFF]">
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
                        className="w-full text-sm font-semibold text-[#101426] bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                      />
                      <textarea
                        rows={3}
                        value={pillar.detail}
                        onChange={(e) =>
                          updatePillar(pillar.id, 'detail', e.target.value)
                        }
                        aria-label={`Pillar ${idx + 1} description`}
                        className="w-full text-xs text-[#101426]/75 bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display font-semibold text-base text-[#101426]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#101426]/65 leading-relaxed">
                        {pillar.detail}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
