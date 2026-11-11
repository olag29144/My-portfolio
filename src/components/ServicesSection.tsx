import {useState} from 'react';
import {Plus, Trash2} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {ACCENT_GRADIENTS} from '../data/defaultPortfolio';
import type {AccentKey, ServiceIconId, ServiceItem} from '../types/portfolio';
import {ServiceLucideIcon} from './GeometricArt';

interface ServicesSectionProps {
  services: ServiceItem[];
  isEditing: boolean;
  onUpdate: (next: ServiceItem[]) => void;
}

const ICON_OPTIONS: {value: ServiceIconId; label: string}[] = [
  {value: 'globe', label: 'Globe (Web)'},
  {value: 'penTool', label: 'Pen Tool (Graphic)'},
  {value: 'layers', label: 'Layers (Branding)'},
  {value: 'aperture', label: 'Aperture (Creativity)'},
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
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0});
  const prefersReduced = useReducedMotion();
  const theme = ACCENT_GRADIENTS[service.accent] || ACCENT_GRADIENTS.blueCyan;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || isEditing || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({rotateX: -py * 7, rotateY: px * 7});
  };

  const handlePointerLeave = () => {
    setTilt({rotateX: 0, rotateY: 0});
  };

  return (
    <motion.article
      initial={prefersReduced ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-60px'}}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(950px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative rounded-2xl bg-white border border-[#101426]/8 p-6 sm:p-7 shadow-[0_12px_36px_-18px_rgba(16,20,38,0.12)] hover:shadow-[0_24px_48px_-18px_rgba(8,123,255,0.18)] ${theme.borderHover} transition-shadow duration-200 overflow-hidden flex flex-col justify-between`}
    >
      {/* Top hairline gradient accent */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient} opacity-75 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} text-white flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105`}
          >
            <ServiceLucideIcon icon={service.icon} className="w-5 h-5" />
          </div>

          <span className="font-mono text-xs font-medium tabular-nums text-[#101426]/45">
            {String(index + 1).padStart(2, '0')}.
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={service.title}
              onChange={(e) => onChange({...service, title: e.target.value})}
              aria-label="Service title"
              className="w-full font-display font-bold text-lg text-[#101426] bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
            />
            <textarea
              rows={3}
              value={service.description}
              onChange={(e) =>
                onChange({...service, description: e.target.value})
              }
              aria-label="Service description"
              className="w-full text-sm text-[#101426]/80 bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-3 py-2 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={service.icon}
                onChange={(e) =>
                  onChange({...service, icon: e.target.value as ServiceIconId})
                }
                aria-label="Service icon"
                className="text-xs bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-2.5 py-2 text-[#101426] focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
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
                className="text-xs bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-2.5 py-2 text-[#101426] focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
              >
                {ACCENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
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
            <h3 className="font-display font-bold text-xl text-[#101426] tracking-tight mb-2.5">
              {String(index + 1).padStart(2, '0')}. {service.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-[#101426]/70 leading-relaxed">
              {service.description}
            </p>
          </>
        )}
      </div>
    </motion.article>
  );
}

export function ServicesSection({
  services,
  isEditing,
  onUpdate,
}: ServicesSectionProps) {
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
      title: 'New Custom Service',
      description:
        'Describe your custom creative or technical service offering here.',
      icon: 'globe',
      accent: 'blueCyan',
    };
    onUpdate([...services, newItem]);
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#F5F7FA] border-b border-[#101426]/6"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#087BFF] mb-2.5">
              Services &amp; Capabilities
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight text-balance">
              Creative Solutions Crafted for Modern Digital Brands
            </h2>
          </div>

          <p className="text-sm text-[#101426]/65 max-w-sm">
            Every service card is customizable so you can tailor titles,
            descriptions, icons, and gradient accents to match your studio focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleAddService}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101426] text-white text-sm font-semibold hover:bg-[#087BFF] transition-colors cursor-pointer"
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
