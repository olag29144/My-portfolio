import {useEffect, useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {ContactSection} from './components/ContactSection';
import {ExperienceSection} from './components/ExperienceSection';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {PageLoader} from './components/PageLoader';
import {PortfolioSection} from './components/PortfolioSection';
import {ServicesSection} from './components/ServicesSection';
import {SkillsSection} from './components/SkillsSection';
import {StudioEditorBar} from './components/StudioEditorBar';
import {DEFAULT_PORTFOLIO_DATA} from './data/defaultPortfolio';
import type {PortfolioData} from './types/portfolio';

const STORAGE_KEY = 'gabby-teq-portfolio-v3';
const SECTION_IDS = [
  'home',
  'about',
  'services',
  'skills',
  'portfolio',
  'experience',
  'contact',
];

function loadSavedPortfolio(): PortfolioData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      about: parsed.about ?? DEFAULT_PORTFOLIO_DATA.about,
      services: parsed.services ?? DEFAULT_PORTFOLIO_DATA.services,
      projects: parsed.projects ?? DEFAULT_PORTFOLIO_DATA.projects,
      skills: parsed.skills ?? DEFAULT_PORTFOLIO_DATA.skills,
      experience: parsed.experience ?? DEFAULT_PORTFOLIO_DATA.experience,
      contact: parsed.contact ?? DEFAULT_PORTFOLIO_DATA.contact,
    };
  } catch {
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(loadSavedPortfolio);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [portfolio]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#101426]">
      <PageLoader />
      <Navbar activeSection={activeSection} />

      <main className="flex-1">
        <HeroSection />

        <AboutSection
          about={portfolio.about}
          isEditing={isEditing}
          onUpdate={(about) => setPortfolio((prev) => ({...prev, about}))}
        />

        <ServicesSection
          services={portfolio.services}
          isEditing={isEditing}
          onUpdate={(services) => setPortfolio((prev) => ({...prev, services}))}
        />

        <SkillsSection
          skills={portfolio.skills}
          isEditing={isEditing}
          onUpdate={(skills) => setPortfolio((prev) => ({...prev, skills}))}
        />

        <PortfolioSection
          projects={portfolio.projects}
          isEditing={isEditing}
          onUpdate={(projects) => setPortfolio((prev) => ({...prev, projects}))}
        />

        <ExperienceSection
          experience={portfolio.experience}
          isEditing={isEditing}
          onUpdate={(experience) =>
            setPortfolio((prev) => ({...prev, experience}))
          }
        />

        <ContactSection
          contact={portfolio.contact}
          isEditing={isEditing}
          onUpdate={(contact) => setPortfolio((prev) => ({...prev, contact}))}
        />
      </main>

      <Footer email={portfolio.contact.email} />

      <StudioEditorBar
        isEditing={isEditing}
        onToggleEditing={() => setIsEditing((prev) => !prev)}
        data={portfolio}
        onImport={(imported) => setPortfolio(imported)}
        onReset={() => setPortfolio(DEFAULT_PORTFOLIO_DATA)}
      />
    </div>
  );
}
