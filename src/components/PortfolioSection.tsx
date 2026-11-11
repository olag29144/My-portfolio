import {useEffect, useMemo, useRef, useState} from 'react';
import {
  ArrowUpRight,
  CheckCircle,
  ExternalLink,
  ImagePlus,
  MessageCircle,
  Plus,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import type {ProjectArtworkVariant, ProjectItem} from '../types/portfolio';
import {ProjectArtwork} from './GeometricArt';

interface PortfolioSectionProps {
  projects: ProjectItem[];
  isEditing: boolean;
  onUpdate: (next: ProjectItem[]) => void;
}

const ARTWORK_OPTIONS: {value: ProjectArtworkVariant; label: string}[] = [
  {value: 'spatial-web', label: 'Spatial Web Artwork'},
  {value: 'brand-prism', label: 'Brand Prism Artwork'},
  {value: 'motion-frame', label: 'Motion Frame Artwork'},
  {value: 'interface-grid', label: 'Interface Grid Artwork'},
  {value: 'editorial-type', label: 'Editorial Color Artwork'},
  {value: 'product-concept', label: 'Product Concept Artwork'},
];

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'in development':
      return {
        label: 'In Development',
        color: 'bg-amber-500/10 text-amber-700 border-amber-300',
        dot: 'bg-amber-500',
      };
    case 'project development':
      return {
        label: 'Project Development',
        color: 'bg-blue-500/10 text-blue-700 border-blue-300',
        dot: 'bg-blue-600',
      };
    case 'project concept':
      return {
        label: 'Project Concept',
        color: 'bg-purple-500/10 text-purple-700 border-purple-300',
        dot: 'bg-purple-600',
      };
    default:
      return {
        label: status || 'In Development',
        color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
        dot: 'bg-emerald-500',
      };
  }
}

export function PortfolioSection({
  projects,
  isEditing,
  onUpdate,
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();

  const categories = useMemo(() => {
    const rawCategories = projects.map((p) => {
      const slashIdx = p.category.indexOf('/');
      return slashIdx > 0 ? p.category.slice(0, slashIdx).trim() : p.category.trim();
    });
    const unique = Array.from(new Set(rawCategories.filter(Boolean)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [projects, selectedCategory]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateProject = (id: string, patch: Partial<ProjectItem>) => {
    onUpdate(projects.map((p) => (p.id === id ? {...p, ...patch} : p)));
  };

  const handleImageUpload = (
    projectId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProject(projectId, {
          customImageUrl: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Software Project',
      category: 'Software Development',
      status: 'In Development',
      shortDescription:
        'Add a concise overview of this project, problem space, and architecture.',
      fullDescription:
        'Describe the project objectives, engineering stack, key features, and development status.',
      artworkVariant: 'spatial-web',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Web Development', 'UI/UX'],
      features: ['Key Feature 1', 'Key Feature 2'],
      isPlaceholder: false,
    };
    onUpdate([...projects, newProject]);
    setEditingProjectId(newProject.id);
    setSelectedCategory('All');
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) return;
    onUpdate(projects.filter((p) => p.id !== id));
    if (editingProjectId === id) setEditingProjectId(null);
    if (activeProject?.id === id) setActiveProject(null);
  };

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 bg-[#F5F7FA] border-b border-[#101426]/6"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#087BFF] mb-2.5">
              Selected Projects &amp; Software
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight text-balance">
              Featured Digital Products &amp; Technological Initiatives
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] text-[#101426]/68 leading-relaxed">
              Explore key software systems, AI applications, educational platforms,
              and civic technology projects developed by Joseph Gabriel Olaoluwa (GABBY TEQ).
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-[#101426]/8 self-start lg:self-auto shadow-sm"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] ${
                    active
                      ? 'bg-[#101426] text-white shadow-sm'
                      : 'text-[#101426]/70 hover:text-[#101426] hover:bg-[#F5F7FA]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isCardEditing = isEditing && editingProjectId === project.id;
            const badge = getStatusBadge(project.status);

            return (
              <motion.article
                key={project.id}
                layout={!prefersReduced}
                initial={prefersReduced ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-2xl bg-white border border-[#101426]/8 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-[0_22px_50px_-20px_rgba(16,20,38,0.18)] hover:border-[#087BFF]/30"
              >
                <div>
                  {/* Project Image Frame */}
                  <div
                    onClick={() => !isEditing && setActiveProject(project)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#101426] cursor-pointer"
                  >
                    <ProjectArtwork
                      variant={project.artworkVariant}
                      customImageUrl={project.customImageUrl}
                      title={project.title}
                    />

                    {/* Status badge pinned atop artwork */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-sm bg-white/92 ${badge.color}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-xs font-semibold text-[#087BFF] uppercase tracking-wider mb-2">
                      {project.category}
                    </p>

                    <h3 className="font-display font-bold text-xl text-[#101426] tracking-tight mb-2 group-hover:text-[#087BFF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#101426]/70 leading-relaxed line-clamp-3 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Key features preview (up to 3 items) */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-[#101426]/8 mb-2">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div
                            key={`${project.id}-feat-${fIdx}`}
                            className="flex items-center gap-2 text-xs text-[#101426]/75"
                          >
                            <Sparkles className="w-3 h-3 text-[#792BFF] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-1 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#101426] hover:text-[#087BFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProjectId(isCardEditing ? null : project.id)
                        }
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F5F7FA] border border-[#101426]/14 text-[#101426] hover:border-[#087BFF] hover:text-[#087BFF] cursor-pointer"
                      >
                        {isCardEditing ? 'Close' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project.id)}
                        aria-label={`Delete ${project.title}`}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Inline Card Editor Drawer */}
                {isCardEditing && (
                  <div className="px-6 pb-6 pt-4 border-t border-[#101426]/10 bg-[#F5F7FA] space-y-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, {title: e.target.value})
                      }
                      aria-label="Project title"
                      placeholder="Project Title"
                      className="w-full text-sm font-semibold px-3 py-2 rounded-lg bg-white border border-[#101426]/15"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) =>
                          updateProject(project.id, {category: e.target.value})
                        }
                        aria-label="Project category"
                        placeholder="Category"
                        className="text-xs px-3 py-2 rounded-lg bg-white border border-[#101426]/15"
                      />
                      <input
                        type="text"
                        value={project.status}
                        onChange={(e) =>
                          updateProject(project.id, {status: e.target.value})
                        }
                        aria-label="Project status"
                        placeholder="Status (e.g. In Development)"
                        className="text-xs px-3 py-2 rounded-lg bg-white border border-[#101426]/15"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={project.shortDescription}
                      onChange={(e) =>
                        updateProject(project.id, {
                          shortDescription: e.target.value,
                        })
                      }
                      aria-label="Short project description"
                      placeholder="Short description"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-[#101426]/15"
                    />
                    <textarea
                      rows={3}
                      value={project.fullDescription}
                      onChange={(e) =>
                        updateProject(project.id, {
                          fullDescription: e.target.value,
                        })
                      }
                      aria-label="Full project description"
                      placeholder="Full overview"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-[#101426]/15"
                    />
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-[#101426]/60">
                        Key Features (one per line):
                      </label>
                      <textarea
                        rows={3}
                        value={(project.features || []).join('\n')}
                        onChange={(e) =>
                          updateProject(project.id, {
                            features: e.target.value.split('\n').filter(Boolean),
                          })
                        }
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#101426]/15 font-mono"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087BFF] text-white text-xs font-semibold hover:bg-[#087BFF]/90 cursor-pointer"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>Upload Image</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(project.id, e)}
                        className="hidden"
                      />
                      <select
                        value={project.artworkVariant}
                        onChange={(e) =>
                          updateProject(project.id, {
                            artworkVariant: e.target
                              .value as ProjectArtworkVariant,
                          })
                        }
                        aria-label="Artwork variant"
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#101426]/15"
                      >
                        {ARTWORK_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleAddProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101426] text-white text-sm font-semibold hover:bg-[#087BFF] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project Card</span>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal / Project Detail View */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-[#101426]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, scale: 0.96, y: 12}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={prefersReduced ? {opacity: 0} : {opacity: 0, scale: 0.96, y: 12}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-white/20"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#101426]/80 text-white hover:bg-[#087BFF] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full bg-[#101426] overflow-hidden">
                <ProjectArtwork
                  variant={activeProject.artworkVariant}
                  customImageUrl={activeProject.customImageUrl}
                  title={activeProject.title}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#087BFF]">
                    {activeProject.category}
                  </span>
                  <span aria-hidden="true" className="text-[#101426]/30">
                    ·
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    {activeProject.status}
                  </span>
                </div>

                <h3
                  id="modal-project-title"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#101426] tracking-tight"
                >
                  {activeProject.title}
                </h3>

                <p className="mt-4 text-[15px] sm:text-base text-[#101426]/80 leading-relaxed">
                  {activeProject.fullDescription}
                </p>

                {/* Key Features List */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#101426]/10">
                    <h4 className="text-sm font-bold text-[#101426] mb-3">
                      Key Features &amp; Architecture:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProject.features.map((feat, fIdx) => (
                        <li
                          key={`${activeProject.id}-modal-f-${fIdx}`}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#101426]/80"
                        >
                          <CheckCircle className="w-4 h-4 text-[#087BFF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.tools && activeProject.tools.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#101426]/10 flex flex-wrap items-center gap-2 text-xs text-[#101426]/65">
                    <span className="font-semibold text-[#101426]">
                      Focus Areas:
                    </span>
                    {activeProject.tools.map((tool, i) => (
                      <span key={`${tool}-${i}`} className="flex items-center gap-2">
                        <span>{tool}</span>
                        {i < activeProject.tools.length - 1 && (
                          <span aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/2347069536353?text=${encodeURIComponent(
                      `Hello Joseph, I would like to discuss your project "${activeProject.title}".`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087BFF] text-white text-sm font-semibold hover:bg-[#087BFF]/90 transition-colors"
                    >
                      <span>Open Live Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(null);
                      const contactEl = document.querySelector('#contact');
                      contactEl?.scrollIntoView({behavior: 'smooth'});
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101426] text-white text-sm font-semibold hover:bg-[#792BFF] transition-colors cursor-pointer"
                  >
                    <span>Send Project Inquiry</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
