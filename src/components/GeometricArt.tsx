import {useState} from 'react';
import {
  Aperture,
  Compass,
  Cpu,
  Globe,
  Layers,
  PenTool,
} from 'lucide-react';
import type {ProjectArtworkVariant, ServiceIconId} from '../types/portfolio';

export function ServiceLucideIcon({
  icon,
  className = 'w-5 h-5',
}: {
  icon: ServiceIconId;
  className?: string;
}) {
  switch (icon) {
    case 'globe':
      return <Globe className={className} />;
    case 'penTool':
      return <PenTool className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'aperture':
      return <Aperture className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'compass':
      return <Compass className={className} />;
    default:
      return <Globe className={className} />;
  }
}

export function BrandMark({className = 'w-8 h-8'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gt-ring" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D5FF" />
          <stop offset="35%" stopColor="#087BFF" />
          <stop offset="65%" stopColor="#792BFF" />
          <stop offset="100%" stopColor="#E83DCE" />
        </linearGradient>
        <linearGradient id="gt-swoosh" x1="8" y1="28" x2="34" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#087BFF" />
          <stop offset="60%" stopColor="#FF8A24" />
          <stop offset="100%" stopColor="#FFC247" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="#101426" />
      <path
        d="M27.5 14.5C25.7 12.1 22.9 10.7 19.8 10.7C14.3 10.7 10 15.1 10 20.5C10 25.9 14.3 30.3 19.8 30.3C24.7 30.3 28.6 26.9 29.4 22.2H20.6"
        stroke="url(#gt-ring)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 29.2C16.8 32.8 26.2 31.2 31.5 23.8"
        stroke="url(#gt-swoosh)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfilePlaceholderArt({
  imageUrl,
  alt,
}: {
  imageUrl?: string;
  alt: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-[#101426] flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 420 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Stylish futuristic profile placeholder artwork for Gabby Teq"
      >
        <defs>
          <radialGradient id="prof-glow-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 120) rotate(50) scale(260)">
            <stop offset="0%" stopColor="#087BFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#087BFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="prof-glow-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 360) rotate(-130) scale(240)">
            <stop offset="0%" stopColor="#E83DCE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#792BFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="prof-ring" x1="85" y1="90" x2="335" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D5FF" />
            <stop offset="35%" stopColor="#087BFF" />
            <stop offset="70%" stopColor="#792BFF" />
            <stop offset="100%" stopColor="#FF8A24" />
          </linearGradient>
          <linearGradient id="prof-silhouette" x1="150" y1="130" x2="280" y2="430" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#C4D8FF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#792BFF" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <rect width="420" height="500" fill="#101426" />
        <rect width="420" height="500" fill="url(#prof-glow-1)" />
        <rect width="420" height="500" fill="url(#prof-glow-2)" />

        {/* Architectural drafting grid */}
        <g stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1">
          <line x1="70" y1="0" x2="70" y2="500" />
          <line x1="140" y1="0" x2="140" y2="500" />
          <line x1="210" y1="0" x2="210" y2="500" />
          <line x1="280" y1="0" x2="280" y2="500" />
          <line x1="350" y1="0" x2="350" y2="500" />
          <line x1="0" y1="100" x2="420" y2="100" />
          <line x1="0" y1="200" x2="420" y2="200" />
          <line x1="0" y1="300" x2="420" y2="300" />
          <line x1="0" y1="400" x2="420" y2="400" />
        </g>

        {/* Orbital rings */}
        <circle cx="210" cy="235" r="142" stroke="url(#prof-ring)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.7" />
        <ellipse cx="210" cy="245" rx="170" ry="62" transform="rotate(-22 210 245)" stroke="#00D5FF" strokeOpacity="0.45" strokeWidth="1.5" />
        <ellipse cx="210" cy="245" rx="170" ry="62" transform="rotate(24 210 245)" stroke="#FFC247" strokeOpacity="0.35" strokeWidth="1.2" />

        {/* Abstract 3D portrait silhouette */}
        <circle cx="210" cy="186" r="56" fill="url(#prof-silhouette)" />
        <path
          d="M104 420C104 342 151.5 292 210 292C268.5 292 316 342 316 420V465H104V420Z"
          fill="url(#prof-silhouette)"
        />

        {/* Floating prism corner accent */}
        <polygon points="338,88 368,105 338,122 308,105" fill="#00D5FF" fillOpacity="0.28" stroke="#00D5FF" strokeOpacity="0.75" />
        <polygon points="338,122 368,105 368,142 338,159" fill="#087BFF" fillOpacity="0.32" stroke="#087BFF" strokeOpacity="0.6" />
        <polygon points="308,105 338,122 338,159 308,142" fill="#792BFF" fillOpacity="0.35" stroke="#E83DCE" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

export function ProjectArtwork({
  variant,
  customImageUrl,
  title,
}: {
  variant: ProjectArtworkVariant;
  customImageUrl?: string;
  title: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (customImageUrl && !imgFailed) {
    return (
      <img
        src={customImageUrl}
        alt={title}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
      {variant === 'spatial-web' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="sw-bg" x1="0" y1="0" x2="640" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#101426" />
              <stop offset="55%" stopColor="#171E3E" />
              <stop offset="100%" stopColor="#0E2954" />
            </linearGradient>
            <linearGradient id="sw-prism" x1="180" y1="80" x2="460" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D5FF" />
              <stop offset="50%" stopColor="#087BFF" />
              <stop offset="100%" stopColor="#792BFF" />
            </linearGradient>
          </defs>
          <rect width="640" height="400" fill="url(#sw-bg)" />
          <circle cx="480" cy="95" r="120" fill="#087BFF" fillOpacity="0.22" />
          <circle cx="150" cy="310" r="130" fill="#E83DCE" fillOpacity="0.16" />
          <rect x="96" y="64" width="448" height="272" rx="18" fill="#FFFFFF" fillOpacity="0.06" stroke="#FFFFFF" strokeOpacity="0.18" />
          <circle cx="128" cy="92" r="5" fill="#FF8A24" />
          <circle cx="146" cy="92" r="5" fill="#FFC247" />
          <circle cx="164" cy="92" r="5" fill="#00D5FF" />
          <rect x="130" y="130" width="168" height="168" rx="16" fill="url(#sw-prism)" fillOpacity="0.25" stroke="#00D5FF" strokeOpacity="0.6" />
          <polygon points="214,158 266,188 214,218 162,188" fill="#00D5FF" fillOpacity="0.7" />
          <polygon points="214,218 266,188 266,248 214,278" fill="#087BFF" fillOpacity="0.85" />
          <polygon points="162,188 214,218 214,278 162,248" fill="#792BFF" fillOpacity="0.85" />
          <rect x="326" y="138" width="176" height="18" rx="9" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="326" y="172" width="142" height="10" rx="5" fill="#FFFFFF" fillOpacity="0.35" />
          <rect x="326" y="192" width="160" height="10" rx="5" fill="#FFFFFF" fillOpacity="0.22" />
          <rect x="326" y="232" width="118" height="36" rx="10" fill="url(#sw-prism)" />
        </svg>
      )}

      {variant === 'brand-prism' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="bp-bg" x1="0" y1="0" x2="640" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5F7FA" />
              <stop offset="100%" stopColor="#E9EEF9" />
            </linearGradient>
            <linearGradient id="bp-grad" x1="180" y1="90" x2="460" y2="310" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#792BFF" />
              <stop offset="50%" stopColor="#E83DCE" />
              <stop offset="100%" stopColor="#FF8A24" />
            </linearGradient>
          </defs>
          <rect width="640" height="400" fill="url(#bp-bg)" />
          <g stroke="#101426" strokeOpacity="0.06">
            <line x1="160" y1="0" x2="160" y2="400" />
            <line x1="320" y1="0" x2="320" y2="400" />
            <line x1="480" y1="0" x2="480" y2="400" />
            <line x1="0" y1="200" x2="640" y2="200" />
          </g>
          <circle cx="320" cy="200" r="126" fill="url(#bp-grad)" fillOpacity="0.14" />
          <circle cx="320" cy="200" r="96" stroke="url(#bp-grad)" strokeWidth="18" />
          <path d="M220 278C280 315 385 288 430 212" stroke="#087BFF" strokeWidth="10" strokeLinecap="round" />
          <circle cx="445" cy="122" r="24" fill="#FFC247" />
          <circle cx="195" cy="128" r="14" fill="#00D5FF" />
        </svg>
      )}

      {variant === 'motion-frame' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="mf-bg" x1="0" y1="0" x2="640" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#101426" />
              <stop offset="100%" stopColor="#261346" />
            </linearGradient>
            <linearGradient id="mf-wave" x1="60" y1="200" x2="580" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D5FF" />
              <stop offset="35%" stopColor="#087BFF" />
              <stop offset="68%" stopColor="#E83DCE" />
              <stop offset="100%" stopColor="#FFC247" />
            </linearGradient>
          </defs>
          <rect width="640" height="400" fill="url(#mf-bg)" />
          <path d="M40 240C140 120 220 310 320 190C420 70 500 280 600 160" stroke="url(#mf-wave)" strokeWidth="12" strokeLinecap="round" />
          <path d="M40 270C140 150 220 340 320 220C420 100 500 310 600 190" stroke="#00D5FF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
          <rect x="248" y="132" width="144" height="136" rx="28" fill="#FFFFFF" fillOpacity="0.08" stroke="#FFFFFF" strokeOpacity="0.28" />
          <polygon points="304,174 352,200 304,226" fill="#FFFFFF" />
        </svg>
      )}

      {variant === 'interface-grid' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <rect width="640" height="400" fill="#F5F7FA" />
          <rect x="64" y="56" width="240" height="134" rx="18" fill="#FFFFFF" stroke="#101426" strokeOpacity="0.08" />
          <rect x="328" y="56" width="248" height="288" rx="18" fill="#101426" />
          <rect x="64" y="210" width="240" height="134" rx="18" fill="#FFFFFF" stroke="#101426" strokeOpacity="0.08" />
          <rect x="90" y="84" width="110" height="14" rx="7" fill="#087BFF" />
          <rect x="90" y="114" width="176" height="10" rx="5" fill="#101426" fillOpacity="0.16" />
          <rect x="90" y="134" width="142" height="10" rx="5" fill="#101426" fillOpacity="0.1" />
          <rect x="90" y="244" width="60" height="60" rx="14" fill="#792BFF" fillOpacity="0.14" />
          <circle cx="120" cy="274" r="14" fill="#792BFF" />
          <rect x="168" y="252" width="108" height="12" rx="6" fill="#101426" fillOpacity="0.7" />
          <rect x="168" y="276" width="84" height="10" rx="5" fill="#101426" fillOpacity="0.2" />
          <circle cx="452" cy="186" r="68" stroke="#00D5FF" strokeWidth="14" strokeDasharray="240 160" />
          <circle cx="452" cy="186" r="42" stroke="#FF8A24" strokeWidth="10" strokeDasharray="160 120" />
          <rect x="368" y="292" width="168" height="14" rx="7" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      )}

      {variant === 'editorial-type' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="et-grad" x1="120" y1="60" x2="520" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF8A24" />
              <stop offset="50%" stopColor="#E83DCE" />
              <stop offset="100%" stopColor="#792BFF" />
            </linearGradient>
          </defs>
          <rect width="640" height="400" fill="#101426" />
          <rect x="86" y="48" width="468" height="304" rx="22" fill="url(#et-grad)" />
          <rect x="122" y="84" width="210" height="28" rx="8" fill="#FFFFFF" />
          <rect x="122" y="132" width="320" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="122" y="180" width="260" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.65" />
          <circle cx="468" cy="272" r="44" fill="#101426" fillOpacity="0.85" />
          <circle cx="468" cy="272" r="18" fill="#FFC247" />
        </svg>
      )}

      {variant === 'product-concept' && (
        <svg viewBox="0 0 640 400" className="w-full h-full" fill="none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="pc-ring" x1="160" y1="80" x2="480" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#087BFF" />
              <stop offset="50%" stopColor="#00D5FF" />
              <stop offset="100%" stopColor="#FFC247" />
            </linearGradient>
          </defs>
          <rect width="640" height="400" fill="#EEF3FA" />
          <circle cx="320" cy="200" r="136" fill="#FFFFFF" stroke="#101426" strokeOpacity="0.06" />
          <circle cx="320" cy="200" r="102" stroke="url(#pc-ring)" strokeWidth="10" />
          <rect x="250" y="148" width="140" height="104" rx="20" fill="#101426" />
          <path d="M278 206L305 180L332 206L362 174" stroke="#00D5FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="362" cy="174" r="6" fill="#FF8A24" />
        </svg>
      )}
    </div>
  );
}
