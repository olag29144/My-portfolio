import React, {useState, useCallback} from 'react';
import {CheckCircle, Plus, Trash2, ArrowUpRight} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {ACCENT_GRADIENTS} from '../data/defaultPortfolio';
import type {AccentKey, ServiceIconId, ServiceItem} from '../types/portfolio';
import {ServiceLucideIcon} from './GeometricArt';
import {useCursor} from '../context/CursorContext';

interface ServicesSectionProps {
  services: ServiceItem[];
  isEditing: boolean;
  onUpdate: (next: ServiceItem[]) => void;
}

const ICON_OPTIONS: {value: ServiceIconId; label: string}[] = [
  {value: 'globe', label: 'Globe (Web)'},
  {value: 'penTool', label: 'Pen Tool (Graphic)'},
  {value: 'layers', label: 'Layers (Web Design)'},
  {value: 'aperture', label: 'Aperture (UI/UX)'},
  {value: 'cpu', label: 'CPU (Technology)'},
  {value: 'compass', label: 'Compass (Consultation)'},
];

const ACCENT_OPTIONS: {value: AccentKey; label: string}[] = [
  {value: 'blueCyan', label: 'Electric Blue → Cyan'},
  {value: 'purpleMagenta', label: 'Purple → Magenta'},
  {value: 'orangeGold', label: 'Orange → Gold'},
  {value: 'cyanPurple', label: 'Cyan → Purple'},
  {value: 'bluePurple', label: 'Blue → Purple'},
  {value: 'magentaOrange', label: 'Magenta → Orange'},
];

function ServiceCard({
  service,
  index,
  isEditing,
  onChange,
  onDelete,
}: {
  service: ServiceItem;
  index: number;
  isEditing: boolean;
  onChange: (updated: ServiceItem) => void;
  onDelete: () => void;
}) {
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0, pctX: 50, pctY: 50});
  const prefersReduced = useReducedMotion();
  const theme = ACCENT_GRADIENTS[service.accent] || ACCENT_GRADIENTS.blueCyan;
  const {setCursor, resetCursor} = useCursor();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced || isEditing || e.pointerType === 'touch') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const pctX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const pctY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

      setTilt({
        rotateX: -py * 7,
        rotateY: px * 7,
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
      initial={prefersReduced ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={() => setCursor('hover')}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative rounded-3xl bg-white dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 p-7 sm:p-8 shadow-[0_16px_40px_-20px_rgba(16,20,38,0.12)] dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)] hover:shadow-[0_28px_56px_-20px_rgba(8,123,255,0.22)] ${theme.borderHover} transition-all duration-300 overflow-hidden flex flex-col justify-between`}
    >
      {/* Pointer Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(360px circle at ${tilt.pctX}% ${tilt.pctY}%, rgba(8, 123, 255, 0.12), transparent 75%)`,
        }}
      />

      {/* Top Hairline Gradient Accent */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          {/* Animated Icon Container */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white flex items-center justify-center shadow-[0_10px_24px_rgba(8,123,255,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <ServiceLucideIcon icon={service.icon} className="w-6 h-6" />
          </div>

          <span className="font-mono text-xs font-bold tabular-nums text-[#101426]/40 dark:text-white/40 px-2.5 py-1 rounded-full bg-[#F5F7FA] dark:bg-white/10">
            0{index + 1}.
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={service.title}
              onChange={(e) => onChange({...service, title: e.target.value})}
              aria-label="Service title"
              className="w-full font-display font-bold text-lg text-[#101426] dark:text-white bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
            />
            <textarea
              rows={2}
              value={service.description}
              onChange={(e) =>
                onChange({...service, description: e.target.value})
              }
              aria-label="Service description"
              className="w-full text-xs text-[#101426]/80 dark:text-white/80 bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-2 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
            />
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#101426]/60 dark:text-white/60">
                Features / Capabilities (one per line):
              </label>
              <textarea
                rows={4}
                value={(service.features || []).join('\n')}
                onChange={(e) =>
                  onChange({
                    ...service,
                    features: e.target.value.split('\n').filter(Boolean),
                  })
                }
                className="w-full text-xs text-[#101426]/80 dark:text-white/80 bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-2.5 py-1.5 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={service.icon}
                onChange={(e) =>
                  onChange({...service, icon: e.target.value as ServiceIconId})
                }
                aria-label="Service icon"
                className="text-xs bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-2.5 py-2 text-[#101426] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="dark:bg-[#141930]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={service.accent}
                onChange={(e) =>
                  onChange({...service, accent: e.target.value as AccentKey})
                }
                aria-label="Service gradient accent"
                className="text-xs bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-2.5 py-2 text-[#101426] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              >
                {ACCENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="dark:bg-[#141930]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Service</span>
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display font-bold text-2xl text-[#101426] dark:text-white tracking-tight mb-3 group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors">
              {service.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-[#101426]/72 dark:text-white/70 leading-relaxed mb-5">
              {service.description}
            </p>

            {service.features && service.features.length > 0 && (
              <ul className="space-y-2.5 pt-4 border-t border-[#101426]/8 dark:border-white/10">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={`${service.id}-f-${fIdx}`}
                    className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#101426]/80 dark:text-white/80 font-medium"
                  >
                    <CheckCircle className="w-4 h-4 text-[#087BFF] dark:text-[#00D5FF] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <div className="relative z-10 pt-6 mt-5 border-t border-[#101426]/6 dark:border-white/10 flex items-center justify-between">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087BFF] dark:text-[#00D5FF] hover:text-[#792BFF] dark:hover:text-[#E83DCE] transition-colors group/link"
        >
          <span>Inquire About {service.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function ServicesSection({
  services,
  isEditing,
  onUpdate,
}: ServicesSectionProps) {
  const prefersReduced = useReducedMotion();

  const handleServiceChange = (id: string, updated: ServiceItem) => {
    onUpdate(services.map((s) => (s.id === id ? updated : s)));
  };

  const handleDelete = (id: string) => {
    if (services.length <= 1) return;
    onUpdate(services.filter((s) => s.id !== id));
  };

  const handleAddService = () => {
    const newItem: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'New Service',
      description: 'Describe the new creative or technical service offering here.',
      icon: 'globe',
      accent: 'blueCyan',
      features: ['Feature 1', 'Feature 2'],
    };
    onUpdate([...services, newItem]);
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 bg-[#F5F7FA] border-b border-[#101426]/6 overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-[#087BFF] dark:text-[#00D5FF] mb-2.5">
              Professional Services &amp; Capabilities
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] dark:text-white tracking-tight text-balance leading-tight">
              End-to-End Web, UI/UX &amp; Creative Design Solutions
            </h2>
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="text-sm sm:text-base text-[#101426]/68 dark:text-white/70 max-w-sm leading-relaxed"
          >
            From modern responsive websites to comprehensive brand systems and
            interactive application interfaces tailored for businesses and creators.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isEditing={isEditing}
              onChange={(updated) => handleServiceChange(service.id, updated)}
              onDelete={() => handleDelete(service.id)}
            />
          ))}
        </div>

        {isEditing && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleAddService}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#101426] dark:bg-[#087BFF] text-white text-sm font-semibold hover:bg-[#087BFF] dark:hover:bg-[#00D5FF] dark:hover:text-[#101426] transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service Card</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
