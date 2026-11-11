import {Briefcase, CheckCircle, MapPin, Plus, Trash2} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {ExperienceItem} from '../types/portfolio';

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
      className="relative py-20 sm:py-28 bg-white border-b border-[#101426]/6 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 w-80 h-80 rounded-full bg-[#087BFF]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#792BFF]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#087BFF] mb-2.5">
              Experience &amp; Development
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight text-balance">
              Professional Development &amp; Practical Problem Solving
            </h2>
          </div>
          <p className="text-sm text-[#101426]/65 max-w-md leading-relaxed">
            Hands-on software development, civic technology, educational platforms,
            and digital product design shaped by real engineering challenges.
          </p>
        </div>

        {/* Timeline / Cards Grid */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={prefersReduced ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{
                duration: 0.45,
                delay: Math.min(idx * 0.08, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl bg-[#F5F7FA] border border-[#101426]/8 p-6 sm:p-8 hover:border-[#087BFF]/35 transition-all duration-200 hover:shadow-[0_16px_36px_-14px_rgba(16,20,38,0.1)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 mb-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#087BFF]/10 text-[#087BFF]">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.tag}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#101426]/60">
                      <MapPin className="w-3 h-3 text-[#792BFF]" />
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
                        className="w-full font-display font-bold text-xl text-[#101426] bg-white border border-[#101426]/15 rounded-lg px-3 py-1.5"
                      />
                      <input
                        type="text"
                        value={item.organization}
                        onChange={(e) =>
                          handleUpdateItem(item.id, {organization: e.target.value})
                        }
                        aria-label="Experience organization"
                        className="w-full text-sm font-semibold text-[#087BFF] bg-white border border-[#101426]/15 rounded-lg px-3 py-1.5"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#101426] tracking-tight">
                        {item.role}
                      </h3>
                      <p className="text-sm font-semibold text-[#087BFF]">
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
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-white border border-[#101426]/15"
                    />
                  ) : (
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#101426]/10 text-[#101426]/75">
                      {item.period}
                    </span>
                  )}

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label={`Remove ${item.role}`}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
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
                    className="w-full text-sm text-[#101426]/80 bg-white border border-[#101426]/15 rounded-lg px-3 py-2"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#101426]/60">
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
                      className="w-full text-xs text-[#101426]/80 bg-white border border-[#101426]/15 rounded-lg px-3 py-2 font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm sm:text-[15px] text-[#101426]/75 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t border-[#101426]/8">
                    {item.highlights.map((highlight, hIdx) => (
                      <li
                        key={`${item.id}-h-${hIdx}`}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#101426]/80"
                      >
                        <CheckCircle className="w-4 h-4 text-[#087BFF] shrink-0 mt-0.5" />
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
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101426] text-white text-sm font-semibold hover:bg-[#087BFF] transition-colors cursor-pointer"
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
