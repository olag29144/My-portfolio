import {Plus, Trash2, Sparkles} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {ACCENT_GRADIENTS} from '../data/defaultPortfolio';
import type {AccentKey, ServiceIconId, SkillItem} from '../types/portfolio';
import {ServiceLucideIcon} from './GeometricArt';
import {useCursor} from '../context/CursorContext';

interface SkillsSectionProps {
  skills: SkillItem[];
  isEditing: boolean;
  onUpdate: (next: SkillItem[]) => void;
}

const ICON_OPTIONS: {value: ServiceIconId; label: string}[] = [
  {value: 'globe', label: 'Web Development'},
  {value: 'layers', label: 'Web Design'},
  {value: 'aperture', label: 'UI/UX Design'},
  {value: 'penTool', label: 'Graphic Design'},
  {value: 'cpu', label: 'Backend / APIs'},
  {value: 'compass', label: 'Strategy / Civic Tech'},
];

const ACCENT_OPTIONS: {value: AccentKey; label: string}[] = [
  {value: 'blueCyan', label: 'Blue → Cyan'},
  {value: 'purpleMagenta', label: 'Purple → Magenta'},
  {value: 'orangeGold', label: 'Orange → Gold'},
  {value: 'cyanPurple', label: 'Cyan → Purple'},
  {value: 'bluePurple', label: 'Blue → Purple'},
  {value: 'magentaOrange', label: 'Magenta → Orange'},
];

export function SkillsSection({
  skills,
  isEditing,
  onUpdate,
}: SkillsSectionProps) {
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  const updateSkill = (id: string, patch: Partial<SkillItem>) => {
    onUpdate(skills.map((s) => (s.id === id ? {...s, ...patch} : s)));
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'New Technical Skill',
      percentage: 80,
      accent: 'blueCyan',
      icon: 'globe',
      description: 'Describe tools, libraries, or methodologies used in this discipline.',
      isPlaceholder: false,
    };
    onUpdate([...skills, newSkill]);
  };

  const handleDeleteSkill = (id: string) => {
    if (skills.length <= 1) return;
    onUpdate(skills.filter((s) => s.id !== id));
  };

  const averageLevel = Math.round(
    skills.reduce((sum, s) => sum + s.percentage, 0) / Math.max(skills.length, 1),
  );

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 bg-white text-[#101426] border-b border-[#101426]/6 overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      {/* Studio Ambient Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#087BFF]/12 via-[#00D5FF]/8 to-transparent blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 w-[540px] h-[540px] rounded-full bg-gradient-to-tl from-[#792BFF]/10 via-[#E83DCE]/8 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Intro + Animated Orbital Spectrum Visual */}
          <div className="lg:col-span-5">
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, x: -16}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/10 border border-[#087BFF]/20 text-[#087BFF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#087BFF]" />
              <span>CAPABILITIES &amp; PROFICIENCY</span>
            </motion.div>

            <motion.h2
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] tracking-tight text-balance leading-tight"
            >
              Disciplines, Tooling &amp; Engineering Craft
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="mt-4 text-sm sm:text-base text-[#101426]/72 leading-relaxed"
            >
              Combining modern frontend development, backend logic, and user-centered
              visual design to create responsive, reliable, and aesthetically refined products.
            </motion.p>

            {/* Orbital Spectrum Ring Visualization */}
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1]}}
              className="mt-8 sm:mt-10 relative mx-auto lg:mx-0 w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 max-w-full flex items-center justify-center"
            >
              <svg
                viewBox="0 0 260 260"
                className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(8,123,255,0.18)]"
                role="img"
                aria-label="Skill proficiency spectrum"
              >
                {skills.slice(0, 5).map((skill, idx) => {
                  const radius = 112 - idx * 16;
                  const circumference = 2 * Math.PI * radius;
                  const clamped = Math.min(Math.max(skill.percentage, 0), 100);
                  const dashOffset =
                    circumference - (circumference * clamped) / 100;
                  const theme =
                    ACCENT_GRADIENTS[skill.accent] || ACCENT_GRADIENTS.blueCyan;

                  return (
                    <g key={skill.id}>
                      <circle
                        cx="130"
                        cy="130"
                        r={radius}
                        fill="none"
                        stroke="rgba(16,20,38,0.08)"
                        strokeWidth="7"
                      />
                      <motion.circle
                        cx="130"
                        cy="130"
                        r={radius}
                        fill="none"
                        stroke={theme.solid}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={
                          prefersReduced
                            ? {strokeDashoffset: dashOffset}
                            : {strokeDashoffset: circumference}
                        }
                        whileInView={{strokeDashoffset: dashOffset}}
                        viewport={{once: true, margin: '-40px'}}
                        transition={{
                          duration: 1,
                          delay: 0.2 + idx * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-mono text-4xl font-extrabold tabular-nums text-[#101426] tracking-tight">
                  {averageLevel}%
                </span>
                <span className="mt-1 font-mono text-[11px] font-semibold tracking-widest text-[#087BFF] uppercase">
                  Proficiency Index
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Skill Capability Cards with Animated Progress Tracks */}
          <div className="lg:col-span-7 space-y-4">
            {skills.map((skill, idx) => {
              const theme =
                ACCENT_GRADIENTS[skill.accent] || ACCENT_GRADIENTS.blueCyan;
              const clamped = Math.min(Math.max(skill.percentage, 0), 100);

              return (
                <motion.div
                  key={skill.id}
                  initial={prefersReduced ? false : {opacity: 0, x: 20}}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true, margin: '-40px'}}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.06, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => resetCursor()}
                  className="group rounded-2xl bg-[#F5F7FA] border border-[#101426]/8 p-5 hover:bg-white hover:border-[#087BFF]/35 hover:shadow-[0_16px_36px_-12px_rgba(8,123,255,0.16)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <ServiceLucideIcon
                          icon={skill.icon}
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="min-w-0">
                        {isEditing ? (
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) =>
                              updateSkill(skill.id, {name: e.target.value})
                            }
                            aria-label="Skill name"
                            className="w-full text-sm font-semibold text-[#101426] bg-white border border-[#101426]/15 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                          />
                        ) : (
                          <h3 className="text-base font-semibold text-[#101426] tracking-wide truncate group-hover:text-[#087BFF] transition-colors">
                            {skill.name}
                          </h3>
                        )}
                      </div>
                    </div>

                    <span className="font-mono text-sm font-bold tabular-nums text-[#087BFF] shrink-0 px-2.5 py-0.5 rounded-lg bg-white border border-[#101426]/10 shadow-sm">
                      {clamped}%
                    </span>
                  </div>

                  {skill.description && !isEditing && (
                    <p className="text-xs text-[#101426]/68 mb-3 pl-13 leading-relaxed">
                      {skill.description}
                    </p>
                  )}

                  {/* High-precision Animated Progress Track */}
                  <div className="h-2 w-full rounded-full bg-[#101426]/8 overflow-hidden relative">
                    <motion.div
                      initial={prefersReduced ? false : {scaleX: 0}}
                      whileInView={{scaleX: clamped / 100}}
                      viewport={{once: true, margin: '-40px'}}
                      animate={{scaleX: clamped / 100}}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + idx * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{transformOrigin: 'left'}}
                      className={`h-full w-full rounded-full bg-gradient-to-r ${theme.gradient} shadow-[0_0_12px_rgba(8,123,255,0.3)]`}
                    />
                  </div>

                  {isEditing && (
                    <div className="mt-3.5 pt-3 border-t border-[#101426]/10 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                      <div className="sm:col-span-4 flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={clamped}
                          onChange={(e) =>
                            updateSkill(skill.id, {
                              percentage: Number(e.target.value),
                            })
                          }
                          aria-label={`${skill.name} percentage slider`}
                          className="w-full accent-[#087BFF] cursor-pointer"
                        />
                        <span className="font-mono text-xs text-[#101426]/80 w-8 text-right">
                          {clamped}%
                        </span>
                      </div>

                      <input
                        type="text"
                        value={skill.description || ''}
                        onChange={(e) =>
                          updateSkill(skill.id, {description: e.target.value})
                        }
                        placeholder="Short description"
                        className="sm:col-span-4 text-xs bg-white border border-[#101426]/15 text-[#101426] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#087BFF]"
                      />

                      <select
                        value={skill.accent}
                        onChange={(e) =>
                          updateSkill(skill.id, {
                            accent: e.target.value as AccentKey,
                          })
                        }
                        aria-label="Skill gradient color"
                        className="sm:col-span-3 text-xs bg-white border border-[#101426]/15 text-[#101426] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#087BFF]"
                      >
                        {ACCENT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill.id)}
                        aria-label={`Remove ${skill.name}`}
                        className="sm:col-span-1 inline-flex items-center justify-center p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isEditing && (
              <button
                type="button"
                onClick={handleAddSkill}
                className="w-full py-3.5 rounded-2xl border border-dashed border-[#101426]/20 bg-white text-sm font-semibold text-[#101426]/80 hover:text-[#087BFF] hover:border-[#087BFF] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill Capability</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
