import {useEffect, useState} from 'react';
import {Menu, MessageCircle, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {BrandMark} from './GeometricArt';

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
            ? 'bg-white/90 backdrop-blur-xl border border-[#101426]/10 shadow-[0_12px_36px_-12px_rgba(16,20,38,0.12)]'
            : 'bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_6px_24px_-12px_rgba(16,20,38,0.08)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 lg:gap-6 px-4 sm:px-6 h-14 sm:h-16">
          {/* Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#101426] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] rounded-lg"
          >
            <BrandMark className="w-8 h-8 shrink-0" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-tight leading-none">
                GABBY TEQ
              </span>
              <span className="text-[10px] font-mono text-[#087BFF] font-semibold tracking-normal hidden sm:block">
                Joseph Gabriel Olaoluwa
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium"
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

          {/* Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/2347069536353"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors duration-200 whitespace-nowrap shadow-sm"
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
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#101426] hover:bg-[#087BFF] rounded-xl transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#101426] hover:bg-[#101426]/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF]"
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
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#087BFF]/10 text-[#087BFF] font-semibold'
                          : 'text-[#101426]/80 hover:bg-[#F5F7FA] hover:text-[#101426]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/2347069536353"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-xl"
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
                    className="inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-white bg-[#101426] rounded-xl"
                  >
                    Contact Form
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
