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
    fullName: 'Joseph Gabriel Olaoluwa',
    brand: 'GABBY TEQ',
    title: 'Web Developer | Creative Designer | UI/UX Designer',
    location: 'Nigeria',
    brandStatement: 'Turning Ideas Into Digital Experiences.',
    heading: 'Turning Ideas Into Digital Experiences.',
    intro:
      'I am Joseph Gabriel Olaoluwa, professionally known as Gabby Teq, a creative web developer and digital designer passionate about building innovative digital experiences and technology-driven solutions.',
    biography:
      'I specialize in web development, web design, graphic design, and UI/UX design. I enjoy transforming ideas into functional, visually appealing, and user-friendly digital products. My approach combines creativity, technical problem-solving, modern technologies, and attention to detail to build digital experiences that solve real-world problems. From developing intelligent AI applications and educational platforms to creating digital communities, management systems, and interactive websites, I am passionate about using technology to make a meaningful impact. I believe great digital products should not only look beautiful but also work exceptionally well.',
    profileImageUrl: '',
    profileCaption: 'Joseph Gabriel Olaoluwa (GABBY TEQ) — Creative Web Developer & Digital Designer based in Nigeria.',
    focusPillars: [
      {
        id: 'pillar-1',
        title: 'Creative Web Development',
        detail:
          'Frontend and backend engineering, responsive layouts, API integration, and clean code architectures crafted for real-world reliability.',
      },
      {
        id: 'pillar-2',
        title: 'UI/UX & Visual Design',
        detail:
          'Intuitive digital interfaces, wireframing, design systems, and brand identities that make complex applications effortless to navigate.',
      },
      {
        id: 'pillar-3',
        title: 'Purposeful Innovation',
        detail:
          'Developing solutions across EdTech, AI, civic data visualization, and community platforms that deliver tangible value and positive impact.',
      },
    ],
  },
  services: [
    {
      id: 'srv-web-dev',
      title: 'Web Development',
      description:
        'Custom web applications, responsive websites, and robust full-stack solutions built with performance, security, and scalability in mind.',
      icon: 'globe',
      accent: 'blueCyan',
      features: [
        'Custom website development',
        'Frontend and backend development',
        'Responsive website development',
        'Database integration',
        'API integration',
        'Website maintenance and optimization',
      ],
    },
    {
      id: 'srv-web-design',
      title: 'Web Design',
      description:
        'Aesthetic, modern, and structured web interfaces that balance visual storytelling with clear usability and effortless device responsiveness.',
      icon: 'layers',
      accent: 'purpleMagenta',
      features: [
        'Modern website interfaces',
        'Landing page design',
        'Business website design',
        'Portfolio website design',
        'Responsive layouts',
      ],
    },
    {
      id: 'srv-graphic-design',
      title: 'Graphic Design',
      description:
        'Distinctive visual assets, cohesive brand identity systems, and high-impact digital promotional graphics that communicate with clarity.',
      icon: 'penTool',
      accent: 'orangeGold',
      features: [
        'Brand identity',
        'Logo design',
        'Marketing graphics',
        'Digital promotional materials',
      ],
    },
    {
      id: 'srv-ui-ux',
      title: 'UI/UX Design',
      description:
        'Human-centered product design from initial wireframes to high-fidelity prototypes and accessible dashboards that users love.',
      icon: 'aperture',
      accent: 'cyanPurple',
      features: [
        'User interface design',
        'User experience optimization',
        'Wireframing and prototyping',
        'Dashboard design',
        'Mobile and web application interfaces',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-gabby-ai',
      title: 'GABBY AI',
      category: 'Artificial Intelligence / Software Development',
      status: 'In Development',
      shortDescription:
        'An intelligent AI assistant application designed to provide advanced AI-powered conversations, personalized interactions, persistent memory, and an adaptable AI architecture.',
      fullDescription:
        'Gabby AI is an intelligent AI assistant application designed to provide advanced AI-powered conversations, personalized interactions, persistent memory, and an adaptable AI architecture. The application focuses on providing an independent developer identity and recognition system that works regardless of the AI provider or API key being used.',
      artworkVariant: 'spatial-web',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'AI Engineering',
        'Full-Stack Architecture',
        'Persistent Memory',
        'Multi-Provider APIs',
      ],
      features: [
        'AI-powered conversations',
        'Persistent AI memory',
        'Multiple AI provider support',
        'Developer identity recognition',
        'Modern conversational interface',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-examora',
      title: 'EXAMORA',
      category: 'EdTech / Educational Technology',
      status: 'In Development',
      shortDescription:
        'An educational platform designed to improve the learning and examination experience for students with accessible digital learning tools.',
      fullDescription:
        'EXAMORA is an educational platform designed to improve the learning and examination experience for students. The platform focuses on providing an accessible digital learning environment with examination preparation, student accounts, authentication, and academic tools.',
      artworkVariant: 'interface-grid',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'EdTech Design',
        'Student Authentication',
        'Examination Prep',
        'Responsive Web',
      ],
      features: [
        'Student account registration and authentication',
        'Examination preparation',
        'Student-friendly interface',
        'Educational resources',
        'Responsive user experience',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-archive',
      title: 'ARCHIVE: NIGERIAN CREATIVE HERITAGE MUSEUM',
      category: 'Digital Museum / Cultural Technology',
      status: 'In Development',
      shortDescription:
        'A digital heritage museum dedicated to preserving, documenting, and showcasing Nigeria’s creative history across Photography, Music, Fashion, and Design.',
      fullDescription:
        'ARCHIVE is a digital heritage museum dedicated to preserving, documenting, and showcasing Nigeria’s creative history. The platform explores Nigerian creativity through four major categories: Photography, Music, Fashion, and Design.',
      artworkVariant: 'editorial-type',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'Cultural Technology',
        'Interactive Museum Gallery',
        'Heritage Archiving',
        'Media Showcase',
      ],
      features: [
        'Interactive digital museum gallery',
        'Historical photography collections',
        'Nigerian music heritage',
        'Fashion and design archives',
        'Artifact browsing and enlarged viewing',
        'Historical descriptions and image credits',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-ping-me',
      title: 'PING ME',
      category: 'Social Networking / Communication Technology',
      status: 'In Development',
      shortDescription:
        'A social messaging and communication platform designed to bring people together through modern digital communication and real-time interaction.',
      fullDescription:
        'Ping Me is a social messaging and communication platform designed to bring people together through modern digital communication. The application aims to combine instant messaging, social networking, media sharing, and community engagement in one platform.',
      artworkVariant: 'motion-frame',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'Real-Time Messaging',
        'Media Sharing',
        'Community Architecture',
        'Social UX',
      ],
      features: [
        'Real-time messaging',
        'Message reactions and replies',
        'Media sharing',
        'Stories and status updates',
        'Video and voice calls',
        'Channels and communities',
        'Message management',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-oasisclockin',
      title: 'OASISCLOCKINAPP',
      category: 'Attendance Management / Productivity',
      status: 'Project Development',
      shortDescription:
        'A student industrial training attendance management system developed to simplify and digitize daily attendance recording via QR code verification.',
      fullDescription:
        'OasisClockInApp is a student industrial training attendance management system developed to simplify and digitize daily attendance recording. The platform uses QR-code-based attendance verification to allow students to clock in and clock out while providing administrators with attendance management capabilities.',
      artworkVariant: 'product-concept',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'QR Code Verification',
        'Attendance Management',
        'Admin Dashboard',
        'Database Tracking',
      ],
      features: [
        'QR-code attendance',
        'Daily clock-in and clock-out',
        'Student attendance tracking',
        'Administrative dashboard',
        'Attendance database integration',
        'Account and device management',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-taraba-election',
      title: 'TARABA STATE ELECTION MONITORING PLATFORM',
      category: 'Civic Technology / Data Visualization',
      status: 'In Development',
      shortDescription:
        'A digital election monitoring platform designed to provide structured visualization and monitoring of election information across Taraba State, Nigeria.',
      fullDescription:
        'A digital election monitoring platform designed to provide structured visualization and monitoring of election information across Taraba State, Nigeria. The platform focuses on presenting election information through an interactive geographical dashboard covering local government areas, wards, and polling units.',
      artworkVariant: 'spatial-web',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'Civic Technology',
        'Interactive GIS Map',
        'Data Visualization',
        'Auto-Refresh Feeds',
      ],
      features: [
        'Interactive Taraba State map',
        'LGA-level election monitoring',
        'Ward and polling unit navigation',
        'Election result visualization',
        'Automatic five-second data refresh',
        'Multi-agent monitoring capabilities',
        'Public monitoring dashboard',
      ],
      isPlaceholder: false,
    },
    {
      id: 'proj-civicproof',
      title: 'CIVICPROOF',
      category: 'Civic Technology / Public Infrastructure',
      status: 'Project Concept',
      shortDescription:
        'A proposed public-project verification and monitoring platform designed to improve transparency in government procurement and infrastructure delivery.',
      fullDescription:
        'CIVICPROOF is a proposed public-project verification and monitoring platform designed to improve transparency in government procurement and infrastructure delivery. It aims to help citizens monitor public projects, verify project progress, and compare announced project commitments with actual delivery.',
      artworkVariant: 'brand-prism',
      customImageUrl: '',
      liveUrl: '',
      tools: [
        'Civic Infrastructure',
        'Public Verification',
        'Procurement Monitoring',
        'GovTech Architecture',
      ],
      features: [
        'Public project tracking',
        'Procurement transparency verification',
        'Delivery milestone comparison',
        'Citizen verification tools',
        'Infrastructure progress monitoring',
      ],
      isPlaceholder: false,
    },
  ],
  skills: [
    {
      id: 'skill-web-dev',
      name: 'Web Development (Frontend & Backend)',
      percentage: 92,
      accent: 'blueCyan',
      icon: 'globe',
      description: 'HTML5, modern CSS/Tailwind, JavaScript, TypeScript, React, Node.js & APIs.',
      isPlaceholder: false,
    },
    {
      id: 'skill-web-design',
      name: 'Modern Web Design & Responsive Layouts',
      percentage: 90,
      accent: 'purpleMagenta',
      icon: 'layers',
      description: 'Landing pages, business websites, portfolio architecture & fluid mobile-first layouts.',
      isPlaceholder: false,
    },
    {
      id: 'skill-ui-ux',
      name: 'UI/UX Design & Prototyping',
      percentage: 88,
      accent: 'cyanPurple',
      icon: 'aperture',
      description: 'User flows, wireframing, high-fidelity prototypes, dashboards & accessibility.',
      isPlaceholder: false,
    },
    {
      id: 'skill-graphic',
      name: 'Graphic Design & Brand Identity',
      percentage: 86,
      accent: 'orangeGold',
      icon: 'penTool',
      description: 'Brand identity systems, logos, digital promotional graphics & marketing visuals.',
      isPlaceholder: false,
    },
    {
      id: 'skill-api-db',
      name: 'Database Integration & API Architecture',
      percentage: 84,
      accent: 'bluePurple',
      icon: 'cpu',
      description: 'REST APIs, authentication flows, data modeling & persistent state integration.',
      isPlaceholder: false,
    },
    {
      id: 'skill-civic-tech',
      name: 'Digital Problem Solving & Product Strategy',
      percentage: 87,
      accent: 'magentaOrange',
      icon: 'compass',
      description: 'Civic technology platforms, QR-based systems, EdTech tools & AI applications.',
      isPlaceholder: false,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      period: 'Active Development',
      role: 'Creative Web Developer & Digital Problem Solver',
      organization: 'GABBY TEQ Brand',
      location: 'Nigeria',
      tag: 'Full-Stack & Brand',
      description:
        'Building purposeful web applications, custom digital experiences, and brand identities combining frontend development, backend logic, and user-centric UI/UX design.',
      highlights: [
        'Developing full-stack applications with modern TypeScript, React, and server-side integrations',
        'Designing responsive layouts, landing pages, and interactive dashboards',
        'Creating complete visual brand systems, logos, and promotional graphics',
      ],
    },
    {
      id: 'exp-2',
      period: 'Core Initiative',
      role: 'Lead Architect & Designer',
      organization: 'Gabby AI & Examora',
      location: 'Nigeria',
      tag: 'AI & EdTech',
      description:
        'Spearheading innovative software projects focused on artificial intelligence architecture and accessible digital education.',
      highlights: [
        'Architecting Gabby AI with persistent memory and multi-provider developer identity recognition',
        'Designing EXAMORA to modernize student examination preparation and digital learning resources',
        'Focusing on high performance, accessibility, and intuitive user experiences',
      ],
    },
    {
      id: 'exp-3',
      period: 'Civic & Cultural Tech',
      role: 'Creator & Systems Designer',
      organization: 'Heritage & Civic Platforms',
      location: 'Taraba State / Nigeria',
      tag: 'Civic Tech & Data',
      description:
        'Engineering digital platforms that address real civic transparency needs and preserve cultural heritage through modern technology.',
      highlights: [
        'Designing the Taraba State Election Monitoring Platform with interactive LGA mapping and 5-second data refresh',
        'Curating ARCHIVE: Nigerian Creative Heritage Museum across Photography, Music, Fashion, and Design',
        'Conceptualizing CIVICPROOF to empower public project verification and procurement transparency',
      ],
    },
    {
      id: 'exp-4',
      period: 'Practical Productivity',
      role: 'Application Developer',
      organization: 'OasisClockInApp & Ping Me',
      location: 'Nigeria',
      tag: 'Mobile & Systems',
      description:
        'Developing practical productivity systems and modern communication software solving day-to-day organizational challenges.',
      highlights: [
        'Engineering OasisClockInApp using QR verification for student industrial training attendance tracking',
        'Designing administrative dashboards for attendance monitoring and device management',
        'Developing Ping Me for social communication, channels, and real-time community engagement',
      ],
    },
  ],
  contact: {
    heading: 'Have a Project in Mind?',
    description:
      'I am available for web development, web design, UI/UX design, and branding collaborations. Reach out directly on WhatsApp or submit your project details below.',
    fullName: 'Joseph Gabriel Olaoluwa',
    brand: 'GABBY TEQ',
    title: 'Web Developer | Creative Designer | UI/UX Designer',
    email: 'olag29144@gmail.com',
    whatsappNumber: '07069536353',
    whatsappLink: 'https://wa.me/2347069536353',
    githubUrl: 'https://github.com/olag29144',
    locationNote: 'Nigeria (Available for Remote & Worldwide Collaborations)',
    socialLinks: [
      {
        id: 'soc-whatsapp',
        platform: 'WhatsApp',
        handle: '+234 706 953 6353',
        url: 'https://wa.me/2347069536353',
      },
      {
        id: 'soc-github',
        platform: 'GitHub',
        handle: 'github.com/olag29144',
        url: 'https://github.com/olag29144',
      },
      {
        id: 'soc-email',
        platform: 'Email',
        handle: 'olag29144@gmail.com',
        url: 'mailto:olag29144@gmail.com',
      },
    ],
  },
};
