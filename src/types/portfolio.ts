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
  fullName?: string;
  brand?: string;
  title?: string;
  location?: string;
  brandStatement?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconId;
  accent: AccentKey;
  features?: string[];
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
  status: string;
  features?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  accent: AccentKey;
  icon: ServiceIconId;
  isPlaceholder: boolean;
  description?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  tag: string;
}

export interface ContactInfo {
  heading: string;
  description: string;
  fullName: string;
  brand: string;
  title: string;
  email: string;
  whatsappNumber: string;
  whatsappLink: string;
  githubUrl: string;
  locationNote: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  about: AboutData;
  services: ServiceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  contact: ContactInfo;
}
