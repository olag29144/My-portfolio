import {useEffect, useMemo, useRef, useState} from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  ImagePlus,
  Plus,
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
    const unique = Array.from(new Set(projects.map((p) => p.category.trim()).filter(Boolean)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
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
          isPlaceholder: false,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Portfolio Project',
      category: 'Web & Digital',
      shortDescription:
        'Add a brief overview of this project and the problem it solved.',
      fullDescription:
        'Describe the project background, creative approach, and technical execution here.',
      artworkVariant: 'spatial-web',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Design', 'Development'],
      isPlaceholder: true,
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
      className="relative py-20 sm:py-28 bg-white border-b border-[#101426]/6"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#E83DCE] mb-2.5">
              Portfolio &amp; My Work
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight text-balance">
              Featured Digital Showcase &amp; Editable Project Placeholders
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] text-[#101426]/68 leading-relaxed">
              Explore sample project cards below. Enable Edit Mode at any time
              to replace placeholders with your real projects, images, and case
              study details.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F5F7FA] rounded-xl border border-[#101426]/8 self-start lg:self-auto"
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
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] ${
                    active
                      ? 'bg-[#101426] text-white shadow-sm'
                      : 'text-[#101426]/70 hover:text-[#101426] hover:bg-white/80'
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
                className="group rounded-2xl bg-[#F5F7FA] border border-[#101426]/8 overflow-hidden flex flex-col justify-between transition-shadow duration-200 hover:shadow-[0_22px_50px_-20px_rgba(16,20,38,0.18)]"
              >
                <div>
                  {/* Project Image Frame with Subtle Zoom Hover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101426]">
                    <ProjectArtwork
                      variant={project.artworkVariant}
                      customImageUrl={project.customImageUrl}
                      title={project.title}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className="flex items-center gap-2 text-xs font-medium text-[#101426]/55 mb-2">
                      <span className="text-[#087BFF] font-semibold">
                        {project.category}
                      </span>
                      {project.isPlaceholder && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Sample Placeholder</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#101426] tracking-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#101426]/70 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
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
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-[#101426]/14 text-[#101426] hover:border-[#087BFF] hover:text-[#087BFF] cursor-pointer"
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

                {/* Inline Card Editor Drawer when Edit is clicked */}
                {isCardEditing && (
                  <div className="px-6 pb-6 pt-4 border-t border-[#101426]/10 bg-white space-y-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, {title: e.target.value})
                      }
                      aria-label="Project title"
                      placeholder="Project Title"
                      className="w-full text-sm font-semibold px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
                    <input
                      type="text"
                      value={project.category}
                      onChange={(e) =>
                        updateProject(project.id, {category: e.target.value})
                      }
                      aria-label="Project category"
                      placeholder="Category"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
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
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
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
                      placeholder="Full case study overview"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                    />
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
                        aria-label="Default placeholder artwork"
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#101426]/15"
                      >
                        {ARTWORK_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="url"
                      value={project.customImageUrl}
                      onChange={(e) =>
                        updateProject(project.id, {
                          customImageUrl: e.target.value,
                        })
                      }
                      placeholder="Custom image URL (optional)"
                      aria-label="Custom image URL"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15"
                    />
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) =>
                        updateProject(project.id, {liveUrl: e.target.value})
                      }
                      placeholder="Live project URL (optional)"
                      aria-label="Live project URL"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#101426]/15"
                    />
                    <label className="flex items-center gap-2 text-xs text-[#101426]/75 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.isPlaceholder}
                        onChange={(e) =>
                          updateProject(project.id, {
                            isPlaceholder: e.target.checked,
                          })
                        }
                        className="rounded border-[#101426]/30 text-[#087BFF]"
                      />
                      <span>Mark as Sample Placeholder</span>
                    </label>
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

      {/* Fullscreen Lightbox / Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-[#101426]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
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
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#101426]/60 mb-2">
                  <span className="text-[#087BFF] font-semibold">
                    {activeProject.category}
                  </span>
                  {activeProject.isPlaceholder && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Editable Sample Placeholder</span>
                    </>
                  )}
                </div>

                <h3
                  id="modal-project-title"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#101426] tracking-tight"
                >
                  {activeProject.title}
                </h3>

                <p className="mt-4 text-[15px] sm:text-base text-[#101426]/78 leading-relaxed">
                  {activeProject.fullDescription}
                </p>

                {activeProject.tools.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#101426]/10 flex flex-wrap items-center gap-2 text-xs text-[#101426]/65">
                    <span className="font-semibold text-[#101426]">
                      Scope &amp; Tools:
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

                <div className="mt-7 flex flex-wrap items-center gap-3">
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
                    <span>Discuss a Similar Project</span>
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
