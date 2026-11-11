import React, {useEffect, useMemo, useRef, useState, useCallback} from 'react';
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
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

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
        color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30',
        dot: 'bg-amber-500',
      };
    case 'project development':
      return {
        label: 'Project Development',
        color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30',
        dot: 'bg-blue-600',
      };
    case 'project concept':
      return {
        label: 'Project Concept',
        color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30',
        dot: 'bg-purple-600',
      };
    default:
      return {
        label: status || 'In Development',
        color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30',
        dot: 'bg-emerald-500',
      };
  }
}

function ProjectCard({
  project,
  index,
  isEditing,
  isCardEditing,
  onSelect,
  onToggleEdit,
  onDelete,
  onUpdateProject,
  onUploadImage,
}: {
  project: ProjectItem;
  index: number;
  isEditing: boolean;
  isCardEditing: boolean;
  onSelect: () => void;
  onToggleEdit: () => void;
  onDelete: () => void;
  onUpdateProject: (patch: Partial<ProjectItem>) => void;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0, pctX: 50, pctY: 50});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();
  const badge = getStatusBadge(project.status);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced || isEditing || e.pointerType === 'touch') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const pctX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const pctY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

      setTilt({
        rotateX: -py * 8,
        rotateY: px * 8,
        pctX,
        pctY,
      });
    },
    [prefersReduced, isEditing],
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({rotateX: 0, rotateY: 0, pctX: 50, pctY: 50});
    resetCursor();
  }, [resetCursor]);

  return (
    <motion.article
      layout={!prefersReduced}
      initial={prefersReduced ? false : {opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={() => !isEditing && setCursor('project', 'VIEW PROJECT')}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative rounded-3xl bg-white dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_28px_60px_-20px_rgba(16,20,38,0.2)] dark:hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6)] hover:border-[#087BFF]/40 dark:hover:border-[#00D5FF]/40"
    >
      {/* Pointer-following Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${tilt.pctX}% ${tilt.pctY}%, rgba(8, 123, 255, 0.12), transparent 75%)`,
        }}
      />

      <div>
        {/* Project Image Frame with Reveal Mask */}
        <div
          onClick={() => !isEditing && onSelect()}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[#101426] cursor-pointer"
        >
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-108">
            <ProjectArtwork
              variant={project.artworkVariant}
              customImageUrl={project.customImageUrl}
              title={project.title}
            />
          </div>

          {/* Shimmer overlay on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101426]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
          />

          {/* Floating Status & Category Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-sm bg-white/95 dark:bg-[#101426]/90 ${badge.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              <span>{badge.label}</span>
            </span>

            <span className="font-mono text-xs font-bold text-white/90 px-2.5 py-1 rounded-full bg-[#101426]/75 backdrop-blur-md border border-white/15">
              0{index + 1}.
            </span>
          </div>

          {/* Quick Hover Reveal Prompt */}
          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#101426]/95 backdrop-blur-md text-[#101426] dark:text-white text-xs font-bold shadow-lg border border-transparent dark:border-white/15">
              <span>Inspect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#087BFF] dark:text-[#00D5FF]" />
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 relative z-20">
          <p className="text-xs font-semibold text-[#087BFF] dark:text-[#00D5FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#792BFF] dark:text-[#E83DCE]" />
            <span>{project.category}</span>
          </p>

          <h3
            onClick={() => !isEditing && onSelect()}
            className="font-display font-bold text-xl sm:text-2xl text-[#101426] dark:text-white tracking-tight mb-2.5 group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-sm text-[#101426]/70 dark:text-white/70 leading-relaxed line-clamp-3 mb-4">
            {project.shortDescription}
          </p>

          {/* Key Features Preview */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1.5 pt-3.5 border-t border-[#101426]/8 dark:border-white/10 mb-2">
              {project.features.slice(0, 3).map((feat, fIdx) => (
                <div
                  key={`${project.id}-feat-${fIdx}`}
                  className="flex items-center gap-2 text-xs text-[#101426]/75 dark:text-white/75 font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#087BFF] dark:text-[#00D5FF] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 pb-6 pt-1 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          onClick={onSelect}
          className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-[#101426] dark:text-white hover:text-[#087BFF] dark:hover:text-[#00D5FF] transition-colors whitespace-nowrap cursor-pointer rounded-lg"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>

        {isEditing && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleEdit}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/14 dark:border-white/15 text-[#101426] dark:text-white hover:border-[#087BFF] hover:text-[#087BFF] cursor-pointer"
            >
              {isCardEditing ? 'Close' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${project.title}`}
              className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Inline Card Editor Drawer */}
      {isCardEditing && (
        <div className="px-6 pb-6 pt-4 border-t border-[#101426]/10 dark:border-white/10 bg-[#F5F7FA] dark:bg-[#0E1325] space-y-3 relative z-30">
          <input
            type="text"
            value={project.title}
            onChange={(e) => onUpdateProject({title: e.target.value})}
            aria-label="Project title"
            placeholder="Project Title"
            className="w-full text-sm font-semibold px-3 py-2 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={project.category}
              onChange={(e) => onUpdateProject({category: e.target.value})}
              aria-label="Project category"
              placeholder="Category"
              className="text-xs px-3 py-2 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
            />
            <input
              type="text"
              value={project.status}
              onChange={(e) => onUpdateProject({status: e.target.value})}
              aria-label="Project status"
              placeholder="Status (e.g. In Development)"
              className="text-xs px-3 py-2 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
            />
          </div>
          <textarea
            rows={2}
            value={project.shortDescription}
            onChange={(e) => onUpdateProject({shortDescription: e.target.value})}
            aria-label="Short project description"
            placeholder="Short description"
            className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
          />
          <textarea
            rows={3}
            value={project.fullDescription}
            onChange={(e) => onUpdateProject({fullDescription: e.target.value})}
            aria-label="Full project description"
            placeholder="Full overview"
            className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
          />
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#101426]/60 dark:text-white/60">
              Key Features (one per line):
            </label>
            <textarea
              rows={3}
              value={(project.features || []).join('\n')}
              onChange={(e) =>
                onUpdateProject({
                  features: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white font-mono"
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
              onChange={onUploadImage}
              className="hidden"
            />
            <select
              value={project.artworkVariant}
              onChange={(e) =>
                onUpdateProject({
                  artworkVariant: e.target.value as ProjectArtworkVariant,
                })
              }
              aria-label="Artwork variant"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#141930] border border-[#101426]/15 dark:border-white/20 text-[#101426] dark:text-white"
            >
              {ARTWORK_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="dark:bg-[#141930]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </motion.article>
  );
}

export function PortfolioSection({
  projects,
  isEditing,
  onUpdate,
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
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
    return projects.filter((p) =>
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()),
    );
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
        updateProject(projectId, {customImageUrl: reader.result});
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
      className="relative py-24 sm:py-32 bg-[#F5F7FA] border-b border-[#101426]/6 overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Animated Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-[#087BFF] dark:text-[#00D5FF] mb-2.5">
              Selected Projects &amp; Software
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] dark:text-white tracking-tight text-balance leading-tight">
              Featured Digital Products &amp; Technological Initiatives
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#101426]/68 dark:text-white/70 leading-relaxed">
              Explore key software systems, AI applications, educational platforms,
              and civic technology projects developed by Joseph Gabriel Olaoluwa (GABBY TEQ).
            </p>
          </motion.div>

          {/* Animated Category Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white dark:bg-[#141930] rounded-2xl border border-[#101426]/8 dark:border-white/10 self-start lg:self-auto shadow-sm"
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
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] ${
                    active ? 'text-white' : 'text-[#101426]/70 dark:text-white/70 hover:text-[#101426] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolioTabIndicator"
                      className="absolute inset-0 rounded-xl bg-[#101426] dark:bg-[#087BFF] shadow-sm"
                      transition={{type: 'spring', bounce: 0.2, duration: 0.45}}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid with 3D Tilt & Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isEditing={isEditing}
              isCardEditing={isEditing && editingProjectId === project.id}
              onSelect={() => setActiveProject(project)}
              onToggleEdit={() =>
                setEditingProjectId(
                  editingProjectId === project.id ? null : project.id,
                )
              }
              onDelete={() => handleDeleteProject(project.id)}
              onUpdateProject={(patch) => updateProject(project.id, patch)}
              onUploadImage={(e) => handleImageUpload(project.id, e)}
            />
          ))}
        </div>

        {isEditing && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleAddProject}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#101426] dark:bg-[#087BFF] text-white text-sm font-semibold hover:bg-[#087BFF] dark:hover:bg-[#00D5FF] dark:hover:text-[#101426] transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project Card</span>
            </button>
          </div>
        )}
      </div>

      {/* Cinema-Grade Project Detail Modal with Dark Mode Support */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25}}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-[#101426]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={prefersReduced ? false : {opacity: 0, scale: 0.94, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={prefersReduced ? {opacity: 0} : {opacity: 0, scale: 0.94, y: 20}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#101426] text-[#101426] dark:text-white shadow-2xl border border-white/20 dark:border-white/15"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#101426]/80 text-white hover:bg-[#087BFF] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Artwork Banner */}
              <div className="aspect-[16/9] w-full bg-[#101426] overflow-hidden relative">
                <ProjectArtwork
                  variant={activeProject.artworkVariant}
                  customImageUrl={activeProject.customImageUrl}
                  title={activeProject.title}
                />
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#087BFF] dark:text-[#00D5FF]">
                    {activeProject.category}
                  </span>
                  <span aria-hidden="true" className="text-[#101426]/30 dark:text-white/30">
                    &bull;
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                    {activeProject.status}
                  </span>
                </div>

                <h3
                  id="modal-project-title"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#101426] dark:text-white tracking-tight"
                >
                  {activeProject.title}
                </h3>

                <p className="mt-4 text-[15px] sm:text-base text-[#101426]/80 dark:text-white/80 leading-relaxed">
                  {activeProject.fullDescription}
                </p>

                {/* Key Features List */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#101426]/10 dark:border-white/10">
                    <h4 className="text-sm font-bold text-[#101426] dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#792BFF] dark:text-[#E83DCE]" />
                      <span>Key Features &amp; Architecture:</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProject.features.map((feat, fIdx) => (
                        <li
                          key={`${activeProject.id}-modal-f-${fIdx}`}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#101426]/80 dark:text-white/80"
                        >
                          <CheckCircle className="w-4 h-4 text-[#087BFF] dark:text-[#00D5FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Focus Tools / Disciplines */}
                {activeProject.tools && activeProject.tools.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#101426]/10 dark:border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#101426]/65 dark:text-white/65">
                    <span className="font-semibold text-[#101426] dark:text-white">
                      Focus Areas:
                    </span>
                    {activeProject.tools.map((tool, i) => (
                      <span key={`${tool}-${i}`} className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#F5F7FA] dark:bg-white/10 font-medium text-[#101426]/80 dark:text-white/80">
                          {tool}
                        </span>
                        {i < activeProject.tools.length - 1 && (
                          <span aria-hidden="true">&bull;</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                {/* Modal CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.2} cursorType="contact" cursorText="WHATSAPP">
                    <a
                      href={`https://wa.me/2347069536353?text=${encodeURIComponent(
                        `Hello Joseph, I would like to discuss your project "${activeProject.title}".`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </Magnetic>

                  {activeProject.liveUrl && (
                    <Magnetic strength={0.2} cursorType="hover">
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#087BFF] text-white text-sm font-semibold hover:bg-[#087BFF]/90 transition-all shadow-sm"
                      >
                        <span>Open Live Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  )}

                  <Magnetic strength={0.2} cursorType="contact" cursorText="LET'S TALK">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProject(null);
                        const contactEl = document.querySelector('#contact');
                        contactEl?.scrollIntoView({behavior: 'smooth'});
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101426] dark:bg-white/10 text-white border border-transparent dark:border-white/15 text-sm font-semibold hover:bg-[#792BFF] dark:hover:bg-[#087BFF] transition-all cursor-pointer shadow-sm"
                    >
                      <span>Send Project Inquiry</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
