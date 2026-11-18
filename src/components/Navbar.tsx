import {useEffect, useRef, useState} from 'react';
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

const cornerMenuVariants: Variants = {
  hidden: {opacity: 0, scale: 0.94, y: -8},
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.035,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -6,
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const menuItemVariants: Variants = {
  hidden: {opacity: 0, x: 10},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Navbar({activeSection}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
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
        setMenuOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 pointer-events-none"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={prefersReduced ? false : {y: -20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className={`pointer-events-auto w-full rounded-2xl overflow-hidden transition-all duration-300 ${
            scrolled
              ? 'bg-white/92 dark:bg-[#101426]/92 backdrop-blur-xl border border-[#101426]/12 dark:border-white/12 shadow-[0_16px_40px_-12px_rgba(16,20,38,0.14)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]'
              : 'bg-white/80 dark:bg-[#101426]/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-[0_8px_30px_-14px_rgba(16,20,38,0.08)]'
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-5 lg:px-6 h-14 sm:h-16">
            {/* Brand Wordmark with Magnetic Feel */}
            <Magnetic strength={0.2} cursorType="hover" className="shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#home');
                }}
                className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#101426] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded-lg"
              >
                <BrandMark className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-300 hover:rotate-12" />
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

            {/* Primary Action Buttons + Top-Right Burger Trigger (Desktop, Tablet & Phone) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <Magnetic
                strength={0.2}
                cursorType="contact"
                cursorText="WHATSAPP"
                className="hidden sm:inline-flex"
              >
                <a
                  href="https://wa.me/2347069536353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </Magnetic>

              <Magnetic
                strength={0.2}
                cursorType="contact"
                cursorText="LET'S TALK"
                className="inline-flex"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#101426] dark:bg-[#087BFF] hover:bg-[#087BFF] dark:hover:bg-[#00D5FF] dark:hover:text-[#101426] rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
                >
                  Let&apos;s Talk
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => resetCursor()}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-[#101426] dark:text-white bg-[#F5F7FA]/80 dark:bg-white/10 hover:bg-[#087BFF]/10 hover:text-[#087BFF] dark:hover:bg-white/15 border border-[#101426]/8 dark:border-white/12 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF]"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Top-Right Corner Floating Menu Panel (Desktop, Tablet & Phone) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              aria-label="Navigation menu"
              variants={cornerMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto absolute right-0 top-[calc(100%+0.625rem)] w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] origin-top-right rounded-2xl border border-[#101426]/12 dark:border-white/12 bg-white/95 dark:bg-[#101426]/95 backdrop-blur-xl shadow-[0_24px_60px_-14px_rgba(16,20,38,0.22)] dark:shadow-[0_24px_60px_-14px_rgba(0,0,0,0.65)] overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-[#101426]/8 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#101426]/55 dark:text-white/55">
                  Menu
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#087BFF] dark:text-[#00D5FF]">
                  GABBY TEQ
                </span>
              </div>

              <div className="flex flex-col p-2.5 gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      variants={menuItemVariants}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={() => resetCursor()}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#087BFF]/10 dark:bg-white/10 text-[#087BFF] dark:text-[#00D5FF] font-semibold'
                          : 'text-[#101426]/80 dark:text-white/80 hover:bg-[#F5F7FA] dark:hover:bg-white/5 hover:text-[#101426] dark:hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[#087BFF] dark:bg-[#00D5FF]"
                        />
                      )}
                    </motion.a>
                  );
                })}

                <motion.div
                  variants={menuItemVariants}
                  className="mt-1.5 pt-2.5 border-t border-[#101426]/8 dark:border-white/10 grid grid-cols-2 gap-2"
                >
                  <a
                    href="https://wa.me/2347069536353"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
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
                    className="inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-white bg-[#101426] dark:bg-[#087BFF] hover:bg-[#087BFF] rounded-xl shadow-sm transition-colors"
                  >
                    Contact Form
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
