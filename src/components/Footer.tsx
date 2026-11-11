import {BrandMark} from './GeometricArt';

interface FooterProps {
  email: string;
}

const FOOTER_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Portfolio', href: '#portfolio'},
  {label: 'Skills', href: '#skills'},
  {label: 'Contact', href: '#contact'},
];

export function Footer({email}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#101426] text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <a
            href="#home"
            className="inline-flex items-center gap-3 text-lg font-display font-extrabold tracking-tight text-white"
          >
            <BrandMark className="w-8 h-8" />
            <span>GABBY TEQ</span>
          </a>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-sm text-white/70"
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
          <p>&copy; {year} GABBY TEQ. All rights reserved.</p>
          <a
            href={`mailto:${email}`}
            className="text-white/75 hover:text-[#00D5FF] transition-colors"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
