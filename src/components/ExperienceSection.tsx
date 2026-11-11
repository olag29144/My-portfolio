import {Briefcase, CheckCircle, MapPin, Plus, Trash2, Calendar} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {ExperienceItem} from '../types/portfolio';
import {useCursor} from '../context/CursorContext';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  isEditing: boolean;
  onUpdate: (next: ExperienceItem[]) => void;
}

export function ExperienceSection({
  experience,
  isEditing,
  onUpdate,
}: ExperienceSectionProps) {
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  const handleUpdateItem = (id: string, patch: Partial<ExperienceItem>) => {
    onUpdate(experience.map((item) => (item.id === id ? {...item, ...patch} : item)));
  };

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      period: 'Active Project',
      role: 'Software Developer',
      organization: 'Independent Project',
      location: 'Nigeria',
      tag: 'Development',
      description: 'Describe your role, development focus, and the challenges solved.',
      highlights: ['Key architectural milestone or technical achievement'],
    };
    onUpdate([...experience, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    if (experience.length <= 1) return;
    onUpdate(experience.filter((item) => item.id !== id));
  };

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 bg-white border-b border-[#101426]/6 overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      {/* Background ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 w-80 h-80 rounded-full bg-[#087BFF]/8 dark:bg-[#087BFF]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#792BFF]/8 dark:bg-[#792BFF]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-[#087BFF] dark:text-[#00D5FF] mb-2.5">
              Experience &amp; Development
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] dark:text-white tracking-tight text-balance leading-tight">
              Professional Development &amp; Practical Problem Solving
            </h2>
          </motion.div>
          <motion.p
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="text-sm sm:text-base text-[#101426]/65 dark:text-white/70 max-w-md leading-relaxed"
          >
            Hands-on software development, civic technology, educational platforms,
            and digital product design shaped by real engineering challenges.
          </motion.p>
        </div>

        {/* Timeline / Cards Grid */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={prefersReduced ? false : {opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{
                duration: 0.5,
                delay: Math.min(idx * 0.08, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => resetCursor()}
              className="group relative rounded-3xl bg-[#F5F7FA] dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 p-7 sm:p-9 hover:border-[#087BFF]/40 dark:hover:border-[#00D5FF]/40 transition-all duration-300 hover:shadow-[0_20px_48px_-16px_rgba(16,20,38,0.12)] dark:hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 mb-4">
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#087BFF]/10 text-[#087BFF] dark:text-[#00D5FF] border border-[#087BFF]/20 dark:border-[#00D5FF]/30">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.tag}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#101426]/65 dark:text-white/65">
                      <MapPin className="w-3.5 h-3.5 text-[#792BFF] dark:text-[#E83DCE]" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) =>
                          handleUpdateItem(item.id, {role: e.target.value})
                        }
                        aria-label="Experience role"
                        className="w-full font-display font-bold text-xl text-[#101426] dark:text-white bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-1.5"
                      />
                      <input
                        type="text"
                        value={item.organization}
                        onChange={(e) =>
                          handleUpdateItem(item.id, {organization: e.target.value})
                        }
                        aria-label="Experience organization"
                        className="w-full text-sm font-semibold text-[#087BFF] dark:text-[#00D5FF] bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-1.5"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101426] dark:text-white tracking-tight group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-[#087BFF] dark:text-[#00D5FF]">
                        {item.organization}
                      </p>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {period: e.target.value})
                      }
                      aria-label="Experience period"
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
                    />
                  ) : (
                    <span className="font-mono text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 border border-[#101426]/10 dark:border-white/15 text-[#101426]/75 dark:text-white/80 shadow-sm flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#792BFF] dark:text-[#E83DCE]" />
                      <span>{item.period}</span>
                    </span>
                  )}

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label={`Remove ${item.role}`}
                      className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-3 mt-3">
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      handleUpdateItem(item.id, {description: e.target.value})
                    }
                    aria-label="Experience description"
                    className="w-full text-sm text-[#101426]/80 dark:text-white/80 bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-2"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#101426]/60 dark:text-white/60">
                      Key Highlights (one per line):
                    </label>
                    <textarea
                      rows={3}
                      value={item.highlights.join('\n')}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          highlights: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full text-xs text-[#101426]/80 dark:text-white/80 bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-2 font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm sm:text-[15px] text-[#101426]/75 dark:text-white/75 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#101426]/8 dark:border-white/10">
                    {item.highlights.map((highlight, hIdx) => (
                      <li
                        key={`${item.id}-h-${hIdx}`}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#101426]/80 dark:text-white/80 font-medium"
                      >
                        <CheckCircle className="w-4 h-4 text-[#087BFF] dark:text-[#00D5FF] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {isEditing && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#101426] dark:bg-[#087BFF] text-white text-sm font-semibold hover:bg-[#087BFF] dark:hover:bg-[#00D5FF] dark:hover:text-[#101426] transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience Record</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
