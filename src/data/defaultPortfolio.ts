import type {AccentKey, PortfolioData} from '../types/portfolio';

export const ACCENT_GRADIENTS: Record<
  AccentKey,
  {
    gradient: string;
    solid: string;
    softBg: string;
    borderHover: string;
    textAccent: string;
  }
> = {
  blueCyan: {
    gradient: 'from-[#087BFF] to-[#00D5FF]',
    solid: '#087BFF',
    softBg: 'bg-[#087BFF]/10',
    borderHover: 'hover:border-[#087BFF]/40',
    textAccent: 'text-[#087BFF]',
  },
  purpleMagenta: {
    gradient: 'from-[#792BFF] to-[#E83DCE]',
    solid: '#792BFF',
    softBg: 'bg-[#792BFF]/10',
    borderHover: 'hover:border-[#792BFF]/40',
    textAccent: 'text-[#792BFF]',
  },
  orangeGold: {
    gradient: 'from-[#FF8A24] to-[#FFC247]',
    solid: '#FF8A24',
    softBg: 'bg-[#FF8A24]/10',
    borderHover: 'hover:border-[#FF8A24]/40',
    textAccent: 'text-[#FF8A24]',
  },
  cyanPurple: {
    gradient: 'from-[#00D5FF] to-[#792BFF]',
    solid: '#00D5FF',
    softBg: 'bg-[#00D5FF]/12',
    borderHover: 'hover:border-[#00D5FF]/45',
    textAccent: 'text-[#087BFF]',
  },
  magentaOrange: {
    gradient: 'from-[#E83DCE] to-[#FF8A24]',
    solid: '#E83DCE',
    softBg: 'bg-[#E83DCE]/10',
    borderHover: 'hover:border-[#E83DCE]/40',
    textAccent: 'text-[#E83DCE]',
  },
  bluePurple: {
    gradient: 'from-[#087BFF] to-[#792BFF]',
    solid: '#087BFF',
    softBg: 'bg-[#087BFF]/10',
    borderHover: 'hover:border-[#792BFF]/40',
    textAccent: 'text-[#792BFF]',
  },
};

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  about: {
    heading: "More Than Creativity. It's Innovation.",
    intro:
      'Hello! This introduction is an editable placeholder where you can welcome visitors, share your creative voice, and summarize what drives GABBY TEQ.',
    biography:
      'Use this editable biography area to introduce yourself, your creative background, your hands-on experience, and your passion for design and technology. Every paragraph here can be customized directly in Edit Mode so your portfolio authentically reflects your real journey and vision.',
    profileImageUrl: '',
    profileCaption:
      'Profile Image Placeholder — Upload your portrait or add an image link in Edit Mode.',
    focusPillars: [
      {
        id: 'pillar-1',
        title: 'Creative Direction (Editable)',
        detail:
          'Placeholder for your personal design philosophy and visual storytelling approach.',
      },
      {
        id: 'pillar-2',
        title: 'Technology & Craft (Editable)',
        detail:
          'Placeholder for the tools, code, and interactive mediums you love working with.',
      },
      {
        id: 'pillar-3',
        title: 'Purposeful Innovation (Editable)',
        detail:
          'Placeholder for how you transform raw concepts into memorable digital experiences.',
      },
    ],
  },
  services: [
    {
      id: 'srv-web',
      title: 'Web Design & Development',
      description:
        'Responsive, modern websites and interactive web interfaces built for clarity, performance, and memorable first impressions. (Editable description)',
      icon: 'globe',
      accent: 'blueCyan',
    },
    {
      id: 'srv-graphic',
      title: 'Graphic Design',
      description:
        'Striking visual compositions, editorial layouts, campaign graphics, and digital artwork tailored to express bold ideas. (Editable description)',
      icon: 'penTool',
      accent: 'purpleMagenta',
    },
    {
      id: 'srv-branding',
      title: 'Branding & Visual Identity',
      description:
        'Cohesive brand systems, marks, color direction, and visual guidelines designed to make modern brands stand apart. (Editable description)',
      icon: 'layers',
      accent: 'orangeGold',
    },
    {
      id: 'srv-digital',
      title: 'Digital Creativity',
      description:
        'Experimental motion concepts, interactive experiences, and multimedia storytelling that blend visual polish with curiosity. (Editable description)',
      icon: 'aperture',
      accent: 'cyanPurple',
    },
    {
      id: 'srv-tech',
      title: 'Technology Solutions',
      description:
        'Practical, forward-thinking digital tooling, custom web applications, and streamlined workflows built around real needs. (Editable description)',
      icon: 'cpu',
      accent: 'bluePurple',
    },
    {
      id: 'srv-consult',
      title: 'Creative Consultation',
      description:
        'Collaborative creative direction, concept discovery, and product UX guidance to help shape ideas before launch. (Editable description)',
      icon: 'compass',
      accent: 'magentaOrange',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Spatial Horizon Showcase',
      category: 'Web & Digital',
      shortDescription:
        'Sample project placeholder demonstrating an interactive brand experience with fluid transitions and geometric depth.',
      fullDescription:
        'This is an editable sample project placeholder. Replace this summary with your real project narrative, goals, creative direction, and technical execution when adding your work.',
      artworkVariant: 'spatial-web',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Sample Tool A', 'Sample Tool B', 'Sample Tool C'],
      isPlaceholder: true,
    },
    {
      id: 'proj-2',
      title: 'Chroma Prism Identity System',
      category: 'Branding',
      shortDescription:
        'Sample project placeholder exploring a radiant color identity, custom emblem geometry, and modular visual guidelines.',
      fullDescription:
        'Editable branding case study placeholder. Swap in your real brand story, typography choices, color rationale, and deliverables using Edit Mode.',
      artworkVariant: 'brand-prism',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Visual Identity', 'Typography', 'Brand Guidelines'],
      isPlaceholder: true,
    },
    {
      id: 'proj-3',
      title: 'Kinetic Studio Reel Concept',
      category: 'Digital Creativity',
      shortDescription:
        'Sample project placeholder crafted for motion design, 3D lighting studies, and expressive screen choreography.',
      fullDescription:
        'Editable digital creativity placeholder. Replace this artwork and description with links, stills, or context from your actual motion or creative direction projects.',
      artworkVariant: 'motion-frame',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Motion Direction', '3D Visuals', 'Storyboard'],
      isPlaceholder: true,
    },
    {
      id: 'proj-4',
      title: 'Modular Product Interface',
      category: 'Web & Digital',
      shortDescription:
        'Sample project placeholder highlighting clean component architecture, soft glass surfaces, and intuitive navigation.',
      fullDescription:
        'Editable UI/UX placeholder project. Customize the title, category, description, and upload your real interface screenshots inside Edit Mode.',
      artworkVariant: 'interface-grid',
      customImageUrl: '',
      liveUrl: '',
      tools: ['UI Architecture', 'Design System', 'Frontend'],
      isPlaceholder: true,
    },
    {
      id: 'proj-5',
      title: 'Lumina Campaign Series',
      category: 'Graphic Design',
      shortDescription:
        'Sample project placeholder built for bold poster design, gradient illumination, and contemporary typographic hierarchy.',
      fullDescription:
        'Editable graphic design placeholder. Replace with your poster designs, social campaign visuals, or print layouts at any time.',
      artworkVariant: 'editorial-type',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Art Direction', 'Layout Design', 'Color Grading'],
      isPlaceholder: true,
    },
    {
      id: 'proj-6',
      title: 'Connected Hardware Companion',
      category: 'Technology Solutions',
      shortDescription:
        'Sample project placeholder envisioning a responsive companion interface bridging physical devices and web workflows.',
      fullDescription:
        'Editable technology solution placeholder. Detail the architecture, user journey, and engineering problem-solving behind your real solution.',
      artworkVariant: 'product-concept',
      customImageUrl: '',
      liveUrl: '',
      tools: ['Web App', 'Prototyping', 'UX Strategy'],
      isPlaceholder: true,
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Web Design & Frontend Craft (Placeholder)',
      percentage: 90,
      accent: 'blueCyan',
      icon: 'globe',
      isPlaceholder: true,
    },
    {
      id: 'skill-2',
      name: 'Visual Branding & Identity (Placeholder)',
      percentage: 86,
      accent: 'purpleMagenta',
      icon: 'layers',
      isPlaceholder: true,
    },
    {
      id: 'skill-3',
      name: 'Graphic Design & Art Direction (Placeholder)',
      percentage: 88,
      accent: 'orangeGold',
      icon: 'penTool',
      isPlaceholder: true,
    },
    {
      id: 'skill-4',
      name: 'Digital Creativity & Motion (Placeholder)',
      percentage: 84,
      accent: 'cyanPurple',
      icon: 'aperture',
      isPlaceholder: true,
    },
    {
      id: 'skill-5',
      name: 'Interactive Technology Solutions (Placeholder)',
      percentage: 82,
      accent: 'bluePurple',
      icon: 'cpu',
      isPlaceholder: true,
    },
    {
      id: 'skill-6',
      name: 'Creative Direction & Strategy (Placeholder)',
      percentage: 85,
      accent: 'magentaOrange',
      icon: 'compass',
      isPlaceholder: true,
    },
  ],
  contact: {
    heading: 'Have a Project in Mind?',
    description:
      "Let's turn your next big idea into something extraordinary.",
    email: 'hello@gabbyteq.com',
    locationNote: 'Remote & Worldwide Collaborations (Editable)',
    socialLinks: [
      {
        id: 'soc-1',
        platform: 'Instagram',
        handle: '@gabbyteq',
        url: 'https://instagram.com',
      },
      {
        id: 'soc-2',
        platform: 'Behance',
        handle: 'behance.net/gabbyteq',
        url: 'https://behance.net',
      },
      {
        id: 'soc-3',
        platform: 'Dribbble',
        handle: 'dribbble.com/gabbyteq',
        url: 'https://dribbble.com',
      },
      {
        id: 'soc-4',
        platform: 'GitHub',
        handle: 'github.com/gabbyteq',
        url: 'https://github.com',
      },
      {
        id: 'soc-5',
        platform: 'LinkedIn',
        handle: 'linkedin.com/in/gabbyteq',
        url: 'https://linkedin.com',
      },
    ],
  },
};
