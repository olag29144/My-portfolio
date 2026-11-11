import {BrandMark} from './GeometricArt';

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

  return (
    <footer className="bg-[#101426] text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-1.5">
            <a
              href="#home"
              className="inline-flex items-center gap-3 text-lg font-display font-extrabold tracking-tight text-white"
            >
              <BrandMark className="w-8 h-8" />
              <span>GABBY TEQ</span>
            </a>
            <p className="text-xs text-white/60">
              Joseph Gabriel Olaoluwa &bull; Web Developer | Creative Designer | UI/UX Designer &bull; Nigeria
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/70"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>&copy; {year} GABBY TEQ — Joseph Gabriel Olaoluwa. Turning Ideas Into Digital Experiences.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/2347069536353"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              WhatsApp: 07069536353
            </a>
            <a
              href="https://github.com/olag29144"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${email}`}
              className="text-white/75 hover:text-[#00D5FF] transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
