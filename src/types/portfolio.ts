export type ServiceIconId =
  | 'globe'
  | 'penTool'
  | 'layers'
  | 'aperture'
  | 'cpu'
  | 'compass';

export type AccentKey =
  | 'blueCyan'
  | 'purpleMagenta'
  | 'orangeGold'
  | 'cyanPurple'
  | 'magentaOrange'
  | 'bluePurple';

export type ProjectArtworkVariant =
  | 'spatial-web'
  | 'brand-prism'
  | 'motion-frame'
  | 'interface-grid'
  | 'product-concept'
  | 'editorial-type';

export interface FocusPillar {
  id: string;
  title: string;
  detail: string;
}

export interface AboutData {
  heading: string;
  intro: string;
  biography: string;
  profileImageUrl: string;
  profileCaption: string;
  focusPillars: FocusPillar[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconId;
  accent: AccentKey;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  artworkVariant: ProjectArtworkVariant;
  customImageUrl: string;
  liveUrl: string;
  tools: string[];
  isPlaceholder: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  accent: AccentKey;
  icon: ServiceIconId;
  isPlaceholder: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
}

export interface ContactInfo {
  heading: string;
  description: string;
  email: string;
  locationNote: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  about: AboutData;
  services: ServiceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  contact: ContactInfo;
}
