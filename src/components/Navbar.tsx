import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {BrandMark} from './GeometricArt';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  {id: 'home', label: 'Home', href: '#home'},
  {id: 'about', label: 'About', href: '#about'},
  {id: 'services', label: 'Services', href: '#services'},
  {id: 'portfolio', label: 'Portfolio', href: '#portfolio'},
  {id: 'skills', label: 'Skills', href: '#skills'},
  {id: 'contact', label: 'Contact', href: '#contact'},
];

export function Navbar({activeSection}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
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
      <div
        className={`pointer-events-auto mx-auto max-w-6xl rounded-2xl transition-all duration-200 ${
          scrolled
            ? 'bg-white/88 backdrop-blur-xl border border-[#101426]/10 shadow-[0_12px_36px_-12px_rgba(16,20,38,0.12)]'
            : 'bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_6px_24px_-12px_rgba(16,20,38,0.08)]'
        }`}
      >
        <div className="flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 h-14 sm:h-16">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#101426] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded-lg"
          >
            <BrandMark className="w-8 h-8 shrink-0" />
            <span className="font-display font-extrabold tracking-tight">
              GABBY TEQ
            </span>
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium"
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
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded ${
                    isActive
                      ? 'text-[#087BFF] font-semibold'
                      : 'text-[#101426]/75 hover:text-[#101426]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#087BFF] via-[#792BFF] to-[#E83DCE] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#101426] hover:bg-[#087BFF] rounded-xl transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
            >
              Let&apos;s Talk
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#101426] hover:bg-[#101426]/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="md:hidden overflow-hidden border-t border-[#101426]/8"
            >
              <div className="flex flex-col p-3 gap-1">
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
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#087BFF]/10 text-[#087BFF] font-semibold'
                          : 'text-[#101426]/80 hover:bg-[#F5F7FA] hover:text-[#101426]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="mt-2 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#087BFF] to-[#792BFF] rounded-xl whitespace-nowrap"
                >
                  Let&apos;s Work Together
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
