import {Github, Mail} from 'lucide-react';
import {BrandMark} from './GeometricArt';
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

interface FooterProps {
  email: string;
}

const FOOTER_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About Me', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Skills', href: '#skills'},
  {label: 'Projects', href: '#portfolio'},
  {label: 'Experience', href: '#experience'},
  {label: 'Contact', href: '#contact'},
];

export function Footer({email}: FooterProps) {
  const year = new Date().getFullYear();
  const {setCursor, resetCursor} = useCursor();

  return (
    <footer className="bg-white text-[#101426] border-t border-[#101426]/8 relative overflow-hidden w-full max-w-full">
      {/* Subtle bottom gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-gradient-to-t from-[#087BFF]/8 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#101426]/8">
          <div className="flex flex-col gap-2">
            <Magnetic strength={0.2} cursorType="hover">
              <a
                href="#home"
                className="inline-flex items-center gap-3 text-xl font-display font-extrabold tracking-tight text-[#101426] group"
              >
                <BrandMark className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" />
                <span>GABBY TEQ</span>
              </a>
            </Magnetic>
            <p className="text-xs text-[#101426]/65 leading-relaxed">
              Joseph Gabriel Olaoluwa &bull; Web Developer | Creative Designer | UI/UX Designer &bull; Nigeria
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#101426]/75"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => resetCursor()}
                className="hover:text-[#087BFF] transition-colors whitespace-nowrap font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#101426]/60">
          <p>&copy; {year} GABBY TEQ — Joseph Gabriel Olaoluwa. Turning Ideas Into Digital Experiences.</p>
          <div className="flex items-center gap-3">
            <Magnetic strength={0.15} cursorType="contact" cursorText="WHATSAPP">
              <a
                href="https://wa.me/2347069536353"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp: 07069536353"
                title="WhatsApp: 07069536353"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.15} cursorType="hover" cursorText="GITHUB">
              <a
                href="https://github.com/olag29144"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5F7FA] text-[#101426]/80 border border-[#101426]/10 hover:bg-[#101426] hover:text-white hover:border-[#101426] transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101426]"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic strength={0.15} cursorType="contact" cursorText="EMAIL">
              <a
                href={`mailto:${email}`}
                aria-label={`Email: ${email}`}
                title={email}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#087BFF]/10 text-[#087BFF] border border-[#087BFF]/20 hover:bg-[#087BFF] hover:text-white hover:border-[#087BFF] transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
