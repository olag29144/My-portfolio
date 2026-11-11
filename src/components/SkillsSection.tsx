import {Plus, Trash2} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {ACCENT_GRADIENTS} from '../data/defaultPortfolio';
import type {AccentKey, ServiceIconId, SkillItem} from '../types/portfolio';
import {ServiceLucideIcon} from './GeometricArt';

interface SkillsSectionProps {
  skills: SkillItem[];
  isEditing: boolean;
  onUpdate: (next: SkillItem[]) => void;
}

const ICON_OPTIONS: {value: ServiceIconId; label: string}[] = [
  {value: 'globe', label: 'Web'},
  {value: 'layers', label: 'Branding'},
  {value: 'penTool', label: 'Graphic'},
  {value: 'aperture', label: 'Motion'},
  {value: 'cpu', label: 'Tech'},
  {value: 'compass', label: 'Strategy'},
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

  const updateSkill = (id: string, patch: Partial<SkillItem>) => {
    onUpdate(skills.map((s) => (s.id === id ? {...s, ...patch} : s)));
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'New Skill Area (Placeholder)',
      percentage: 75,
      accent: 'blueCyan',
      icon: 'globe',
      isPlaceholder: true,
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
      className="relative py-20 sm:py-28 bg-[#101426] text-white overflow-hidden"
    >
      {/* Subtle futuristic studio ambient lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-10 w-80 h-80 rounded-full bg-[#087BFF]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#792BFF]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Intro + Orbital Spectrum Visual */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold tracking-wide text-[#00D5FF] mb-2.5">
              Skills &amp; Craft Focus
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight text-balance">
              Creative Disciplines &amp; Editable Skill Indicators
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-white/72 leading-relaxed">
              The skill labels and percentages shown here are clearly marked
              editable placeholders. Open Edit Mode to replace them with your
              real capabilities and custom proficiency percentages.
            </p>

            {/* Orbital Spectrum Ring Visualization */}
            <div className="mt-9 relative mx-auto lg:mx-0 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg
                viewBox="0 0 260 260"
                className="w-full h-full -rotate-90"
                role="img"
                aria-label="Editable skill focus orbital spectrum"
              >
                {skills.slice(0, 5).map((skill, idx) => {
                  const radius = 112 - idx * 16;
                  const circumference = 2 * Math.PI * radius;
                  const dashOffset =
                    circumference - (circumference * Math.min(Math.max(skill.percentage, 0), 100)) / 100;
                  const theme =
                    ACCENT_GRADIENTS[skill.accent] || ACCENT_GRADIENTS.blueCyan;

                  return (
                    <g key={skill.id}>
                      <circle
                        cx="130"
                        cy="130"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
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
                          duration: 0.8,
                          delay: idx * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-mono text-3xl font-semibold tabular-nums text-white">
                  {averageLevel}%
                </span>
                <span className="mt-1 text-[11px] font-medium tracking-wide text-white/60">
                  Placeholder Avg
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Editable Skill Progress List */}
          <div className="lg:col-span-7 space-y-5">
            {skills.map((skill, idx) => {
              const theme =
                ACCENT_GRADIENTS[skill.accent] || ACCENT_GRADIENTS.blueCyan;
              const clamped = Math.min(Math.max(skill.percentage, 0), 100);

              return (
                <div
                  key={skill.id}
                  className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 sm:p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shrink-0`}
                      >
                        <ServiceLucideIcon
                          icon={skill.icon}
                          className="w-4 h-4"
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
                            className="w-full text-sm font-semibold text-white bg-white/10 border border-white/20 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-[#00D5FF]"
                          />
                        ) : (
                          <h3 className="text-sm sm:text-[15px] font-semibold text-white tracking-wide truncate">
                            {skill.name}
                          </h3>
                        )}
                      </div>
                    </div>

                    <span className="font-mono text-sm font-medium tabular-nums text-[#00D5FF] shrink-0">
                      {clamped}%
                    </span>
                  </div>

                  {/* Animated Progress Track using compositor-only scaleX */}
                  <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={prefersReduced ? false : {scaleX: 0}}
                      whileInView={{scaleX: clamped / 100}}
                      viewport={{once: true, margin: '-40px'}}
                      animate={{scaleX: clamped / 100}}
                      transition={{
                        duration: 0.65,
                        delay: Math.min(idx * 0.06, 0.25),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{transformOrigin: 'left'}}
                      className={`h-full w-full rounded-full bg-gradient-to-r ${theme.gradient}`}
                    />
                  </div>

                  {isEditing && (
                    <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                      <div className="sm:col-span-5 flex items-center gap-2">
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
                          className="w-full accent-[#00D5FF] cursor-pointer"
                        />
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={clamped}
                          onChange={(e) =>
                            updateSkill(skill.id, {
                              percentage: Math.min(
                                100,
                                Math.max(0, Number(e.target.value) || 0),
                              ),
                            })
                          }
                          aria-label={`${skill.name} percentage input`}
                          className="w-16 text-xs font-mono tabular-nums text-white bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-center"
                        />
                      </div>

                      <select
                        value={skill.icon}
                        onChange={(e) =>
                          updateSkill(skill.id, {
                            icon: e.target.value as ServiceIconId,
                          })
                        }
                        aria-label="Skill icon"
                        className="sm:col-span-3 text-xs bg-[#181E38] border border-white/20 text-white rounded-lg px-2 py-1.5"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={skill.accent}
                        onChange={(e) =>
                          updateSkill(skill.id, {
                            accent: e.target.value as AccentKey,
                          })
                        }
                        aria-label="Skill gradient color"
                        className="sm:col-span-3 text-xs bg-[#181E38] border border-white/20 text-white rounded-lg px-2 py-1.5"
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
                        className="sm:col-span-1 inline-flex items-center justify-center p-1.5 rounded-lg text-red-400 hover:bg-red-500/15 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {isEditing && (
              <button
                type="button"
                onClick={handleAddSkill}
                className="w-full py-3 rounded-xl border border-dashed border-white/25 text-sm font-semibold text-white/85 hover:text-white hover:border-[#00D5FF] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill Indicator</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
