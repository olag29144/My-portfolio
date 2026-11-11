import {useEffect, useState} from 'react';
import {Menu, MessageCircle, X} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import type {Variants} from 'motion/react';
import {BrandMark} from './GeometricArt';
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  {id: 'home', label: 'Home', href: '#home'},
  {id: 'about', label: 'About', href: '#about'},
  {id: 'services', label: 'Services', href: '#services'},
  {id: 'skills', label: 'Skills', href: '#skills'},
  {id: 'portfolio', label: 'Projects', href: '#portfolio'},
  {id: 'experience', label: 'Experience', href: '#experience'},
  {id: 'contact', label: 'Contact', href: '#contact'},
];

const mobileContainerVariants: Variants = {
  hidden: {opacity: 0, height: 0},
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: {opacity: 0, x: -14},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Navbar({activeSection}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 pointer-events-none">
      <motion.div
        initial={prefersReduced ? false : {y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        className={`pointer-events-auto mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/92 dark:bg-[#101426]/92 backdrop-blur-xl border border-[#101426]/12 dark:border-white/12 shadow-[0_16px_40px_-12px_rgba(16,20,38,0.14)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]'
            : 'bg-white/80 dark:bg-[#101426]/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-[0_8px_30px_-14px_rgba(16,20,38,0.08)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 lg:gap-6 px-4 sm:px-6 h-14 sm:h-16">
          {/* Brand Wordmark with Magnetic Feel */}
          <Magnetic strength={0.2} cursorType="hover">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#101426] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded-lg"
            >
              <BrandMark className="w-8 h-8 shrink-0 transition-transform duration-300 hover:rotate-12" />
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-tight leading-none">
                  GABBY TEQ
                </span>
                <span className="text-[10px] font-mono text-[#087BFF] dark:text-[#00D5FF] font-semibold tracking-normal hidden sm:block">
                  Joseph Gabriel Olaoluwa
                </span>
              </div>
            </a>
          </Magnetic>

          {/* Navigation Links with Floating Active Indicator */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1.5 p-1 bg-[#F5F7FA]/80 dark:bg-white/[0.06] rounded-xl border border-[#101426]/6 dark:border-white/10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => resetCursor()}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] ${
                    isActive
                      ? 'text-[#087BFF] dark:text-[#00D5FF]'
                      : 'text-[#101426]/75 dark:text-white/70 hover:text-[#101426] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-white/10 shadow-sm border border-[#087BFF]/20 dark:border-white/20"
                      transition={{type: 'spring', bounce: 0.2, duration: 0.45}}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Primary Action Buttons + Mobile Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Magnetic strength={0.2} cursorType="contact" cursorText="WHATSAPP">
              <a
                href="https://wa.me/2347069536353"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.2} cursorType="contact" cursorText="LET'S TALK">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="inline-flex items-center justify-center px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#101426] dark:bg-[#087BFF] hover:bg-[#087BFF] dark:hover:bg-[#00D5FF] dark:hover:text-[#101426] rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
              >
                Let&apos;s Talk
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#101426] dark:text-white hover:bg-[#101426]/6 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer with Staggered Entrance */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-[#101426]/8 dark:border-white/10 bg-white/95 dark:bg-[#101426]/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="flex flex-col p-3 gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      variants={mobileItemVariants}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#087BFF]/10 dark:bg-white/10 text-[#087BFF] dark:text-[#00D5FF] font-semibold'
                          : 'text-[#101426]/80 dark:text-white/80 hover:bg-[#F5F7FA] dark:hover:bg-white/5 hover:text-[#101426] dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
                <motion.div
                  variants={mobileItemVariants}
                  className="pt-2 grid grid-cols-2 gap-2"
                >
                  <a
                    href="https://wa.me/2347069536353"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-xl shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                    className="inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-white bg-[#101426] dark:bg-[#087BFF] rounded-xl shadow-sm"
                  >
                    Contact Form
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
