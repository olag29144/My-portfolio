import React, {useEffect, useState} from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  MessageCircle,
  Plus,
  Send,
  Trash2,
  Sparkles,
} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {ContactInfo, SocialLink} from '../types/portfolio';
import {Magnetic} from './MagneticButton';
import {useCursor} from '../context/CursorContext';

interface ContactSectionProps {
  contact: ContactInfo;
  isEditing: boolean;
  onUpdate: (next: ContactInfo) => void;
}

type SubmissionState =
  | {status: 'idle'}
  | {status: 'submitting'}
  | {status: 'delivered'; message: string}
  | {status: 'unconfigured'; message: string}
  | {status: 'error'; message: string};

export function ContactSection({
  contact,
  isEditing,
  onUpdate,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
  });
  const [serverEmailReady, setServerEmailReady] = useState<boolean | null>(
    null,
  );
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const prefersReduced = useReducedMotion();
  const {setCursor, resetCursor} = useCursor();

  useEffect(() => {
    let active = true;
    fetch('/api/contact/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.configured === 'boolean') {
          setServerEmailReady(data.configured);
        }
      })
      .catch(() => {
        if (active) setServerEmailReady(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const mailtoHref = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(
    subject || 'GABBY TEQ — Project Inquiry',
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(contact.whatsappNumber);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyMessageDraft = async () => {
    const formatted = `To: ${contact.email}\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setSubmission({
        status: 'error',
        message: 'Please fill out your full name, email address, subject, and message.',
      });
      return;
    }

    setSubmission({status: 'submitting'});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.delivered === true) {
        setSubmission({
          status: 'delivered',
          message:
            data.message ||
            'Your message has been delivered successfully. Thank you for reaching out.',
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        return;
      }

      if (response.status === 501 || data?.configured === false) {
        setServerEmailReady(false);
        setSubmission({
          status: 'unconfigured',
          message:
            'Direct server email delivery is not configured on this host. You can chat directly on WhatsApp or launch your email client below.',
        });
        return;
      }

      setSubmission({
        status: 'error',
        message:
          data?.error ||
          'Unable to deliver through the server endpoint right now. Please use WhatsApp or your email client.',
      });
    } catch {
      setSubmission({
        status: 'error',
        message:
          'Network error while reaching the server. Please chat on WhatsApp or use your email client.',
      });
    }
  };

  const updateSocial = (id: string, patch: Partial<SocialLink>) => {
    onUpdate({
      ...contact,
      socialLinks: contact.socialLinks.map((s) =>
        s.id === id ? {...s, ...patch} : s,
      ),
    });
  };

  const addSocial = () => {
    onUpdate({
      ...contact,
      socialLinks: [
        ...contact.socialLinks,
        {
          id: `soc-${Date.now()}`,
          platform: 'Social',
          handle: '@gabbyteq',
          url: 'https://example.com',
        },
      ],
    });
  };

  const removeSocial = (id: string) => {
    onUpdate({
      ...contact,
      socialLinks: contact.socialLinks.filter((s) => s.id !== id),
    });
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#F5F7FA] overflow-hidden w-full max-w-full transition-colors duration-300"
    >
      {/* Background ambient highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#087BFF]/14 to-transparent blur-3xl opacity-80 dark:opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 w-[440px] h-[440px] rounded-full bg-gradient-to-bl from-[#FF8A24]/14 via-[#E83DCE]/10 to-transparent blur-3xl opacity-80 dark:opacity-90"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct WhatsApp, Contact Details & Social Channels */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#FF8A24] dark:text-[#FFC247] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact &amp; Collaboration</span>
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#101426] dark:text-white tracking-tight text-balance leading-tight">
              {contact.heading}
            </h2>
            <p className="mt-3.5 text-base text-[#101426]/75 dark:text-white/75 leading-relaxed max-w-md">
              {contact.description}
            </p>

            {/* Direct WhatsApp Action Card */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 sm:p-7 shadow-[0_20px_44px_-12px_rgba(16,185,129,0.38)]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-lg text-white">
                    Direct WhatsApp
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
                  Fastest Response
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-5">
                Chat directly with Joseph Gabriel Olaoluwa for project inquiries,
                collaborations, or tech consultations.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2} cursorType="contact" cursorText="WHATSAPP">
                  <a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 text-sm font-bold hover:bg-white/95 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Open WhatsApp ({contact.whatsappNumber})</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.2} cursorType="hover" cursorText="COPY">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied Number</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="mt-6 rounded-3xl bg-white dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 p-6 sm:p-7 shadow-[0_16px_40px_-20px_rgba(16,20,38,0.1)] dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)] space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#101426]/55 dark:text-white/55 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#087BFF] dark:text-[#00D5FF]" />
                  <span>Email Address</span>
                </div>

                {isEditing ? (
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      onUpdate({...contact, email: e.target.value})
                    }
                    aria-label="Editable contact email"
                    className="w-full text-sm font-semibold text-[#101426] dark:text-white bg-[#F5F7FA] dark:bg-white/10 border border-[#087BFF]/35 dark:border-white/20 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-display font-semibold text-base sm:text-lg text-[#101426] dark:text-white hover:text-[#087BFF] dark:hover:text-[#00D5FF] transition-colors truncate"
                    >
                      {contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FA] dark:bg-white/10 hover:bg-[#087BFF]/10 text-xs font-semibold text-[#101426]/80 dark:text-white/80 hover:text-[#087BFF] dark:hover:text-[#00D5FF] transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* GitHub Link */}
              <div className="pt-3 border-t border-[#101426]/8 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#101426]/55 dark:text-white/55 mb-1.5">
                  <Github className="w-3.5 h-3.5 text-[#101426] dark:text-white" />
                  <span>GitHub Profile</span>
                </div>
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#101426] dark:text-white hover:text-[#087BFF] dark:hover:text-[#00D5FF] transition-colors"
                >
                  <span>github.com/olag29144</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#101426]/40 dark:text-white/40" />
                </a>
              </div>

              <div className="pt-3 border-t border-[#101426]/8 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#101426]/55 dark:text-white/55 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#792BFF] dark:text-[#E83DCE]" />
                  <span>Location</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={contact.locationNote}
                    onChange={(e) =>
                      onUpdate({...contact, locationNote: e.target.value})
                    }
                    aria-label="Location note"
                    className="w-full text-xs text-[#101426] dark:text-white bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/15 dark:border-white/20 rounded-lg px-3 py-1.5"
                  />
                ) : (
                  <p className="text-sm text-[#101426]/75 dark:text-white/75">
                    {contact.locationNote}
                  </p>
                )}
              </div>
            </div>

            {/* Social channels */}
            <div className="mt-5 space-y-2">
              {contact.socialLinks.map((social) =>
                isEditing ? (
                  <div
                    key={social.id}
                    className="grid grid-cols-12 gap-2 items-center bg-white dark:bg-[#141930] p-2.5 rounded-xl border border-[#101426]/10 dark:border-white/10"
                  >
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) =>
                        updateSocial(social.id, {platform: e.target.value})
                      }
                      placeholder="Platform"
                      className="col-span-4 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/12 dark:border-white/15 text-[#101426] dark:text-white"
                    />
                    <input
                      type="text"
                      value={social.handle}
                      onChange={(e) =>
                        updateSocial(social.id, {handle: e.target.value})
                      }
                      placeholder="Handle"
                      className="col-span-3 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/12 dark:border-white/15 text-[#101426] dark:text-white"
                    />
                    <input
                      type="url"
                      value={social.url}
                      onChange={(e) =>
                        updateSocial(social.id, {url: e.target.value})
                      }
                      placeholder="https://..."
                      className="col-span-4 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] dark:bg-white/10 border border-[#101426]/12 dark:border-white/15 text-[#101426] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocial(social.id)}
                      aria-label={`Remove ${social.platform}`}
                      className="col-span-1 flex items-center justify-center text-red-600 dark:text-red-400 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-5 py-3 rounded-2xl bg-white dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 hover:border-[#087BFF]/40 dark:hover:border-[#00D5FF]/40 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-semibold text-sm text-[#101426] dark:text-white group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors">
                        {social.platform}
                      </span>
                      <span aria-hidden="true" className="text-[#101426]/30 dark:text-white/30">
                        &bull;
                      </span>
                      <span className="text-xs text-[#101426]/60 dark:text-white/60 truncate font-mono">
                        {social.handle}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#101426]/40 dark:text-white/40 group-hover:text-[#087BFF] dark:group-hover:text-[#00D5FF] transition-colors shrink-0" />
                  </a>
                ),
              )}

              {isEditing && (
                <button
                  type="button"
                  onClick={addSocial}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087BFF] dark:text-[#00D5FF] hover:text-[#792BFF] cursor-pointer pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Channel</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form with Focus Glow & Dark Mode */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <div className="rounded-[32px] bg-white dark:bg-[#141930] border border-[#101426]/8 dark:border-white/10 p-7 sm:p-10 shadow-[0_28px_70px_-24px_rgba(16,20,38,0.16)] dark:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.6)]">
              <div className="mb-7">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#101426] dark:text-white tracking-tight">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#101426]/65 dark:text-white/65 mt-1.5 leading-relaxed">
                  Fill in your details below to discuss web development, UI/UX design, or brand identity projects.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#101426]/75 dark:text-white/75 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Michael Adebayo"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#0E1325] border border-[#101426]/10 dark:border-white/15 text-sm text-[#101426] dark:text-white placeholder:text-[#101426]/40 dark:placeholder:text-white/35 focus:outline-none focus:bg-white dark:focus:bg-[#101426] focus:ring-2 focus:ring-[#087BFF] focus:border-transparent transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#101426]/75 dark:text-white/75 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. michael@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#0E1325] border border-[#101426]/10 dark:border-white/15 text-sm text-[#101426] dark:text-white placeholder:text-[#101426]/40 dark:placeholder:text-white/35 focus:outline-none focus:bg-white dark:focus:bg-[#101426] focus:ring-2 focus:ring-[#087BFF] focus:border-transparent transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#101426]/75 dark:text-white/75 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Custom Web Application Development"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#0E1325] border border-[#101426]/10 dark:border-white/15 text-sm text-[#101426] dark:text-white placeholder:text-[#101426]/40 dark:placeholder:text-white/35 focus:outline-none focus:bg-white dark:focus:bg-[#101426] focus:ring-2 focus:ring-[#087BFF] focus:border-transparent transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#101426]/75 dark:text-white/75 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project goals, scope, and timeline..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#0E1325] border border-[#101426]/10 dark:border-white/15 text-sm text-[#101426] dark:text-white placeholder:text-[#101426]/40 dark:placeholder:text-white/35 leading-relaxed focus:outline-none focus:bg-white dark:focus:bg-[#101426] focus:ring-2 focus:ring-[#087BFF] focus:border-transparent transition-all shadow-inner"
                  />
                </div>

                {serverEmailReady === false && submission.status === 'idle' && (
                  <p className="text-xs text-[#101426]/60 dark:text-white/60 leading-relaxed">
                    Note: You can submit here or chat instantly via WhatsApp at{' '}
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">07069536353</span>.
                  </p>
                )}

                {/* Delivery Status Feedback */}
                {submission.status === 'delivered' && (
                  <div
                    role="status"
                    className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 p-4 flex items-start gap-3 text-emerald-900 dark:text-emerald-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">
                      {submission.message}
                    </p>
                  </div>
                )}

                {(submission.status === 'unconfigured' ||
                  submission.status === 'error') && (
                  <div
                    role="alert"
                    className="rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 p-4 space-y-3 text-amber-950 dark:text-amber-200"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed">
                        {submission.message}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pl-8">
                      <a
                        href={contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp</span>
                      </a>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#101426] dark:bg-white/10 text-white text-xs font-semibold hover:bg-[#087BFF] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMessageDraft}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-white/10 border border-amber-300 dark:border-amber-500/30 text-xs font-semibold text-amber-950 dark:text-amber-200 hover:bg-amber-100/60 dark:hover:bg-amber-500/20 transition-colors cursor-pointer"
                      >
                        {copiedDraft ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            <span>Copied Message</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                  <Magnetic strength={0.25} cursorType="contact" cursorText="SEND">
                    <button
                      type="submit"
                      disabled={submission.status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#792BFF] text-white text-sm sm:text-[15px] font-semibold shadow-[0_16px_34px_-10px_rgba(8,123,255,0.45)] hover:shadow-[0_20px_40px_-10px_rgba(121,43,255,0.55)] disabled:opacity-60 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {submission.status === 'submitting'
                          ? 'Sending Message...'
                          : 'Submit Inquiry'}
                      </span>
                    </button>
                  </Magnetic>

                  <a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or message directly on WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
