import {useEffect, useState} from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Plus,
  Send,
  Trash2,
} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import type {ContactInfo, SocialLink} from '../types/portfolio';

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
  const [copiedDraft, setCopiedDraft] = useState(false);
  const prefersReduced = useReducedMotion();

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
    subject || 'Portfolio Project Inquiry',
  )}&body=${encodeURIComponent(
    `Name: ${name}\nReply Email: ${email}\n\n${message}`,
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard fallback ignored when blocked
    }
  };

  const handleCopyMessageDraft = async () => {
    const formatted = `To: ${contact.email}\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2200);
    } catch {
      // Clipboard fallback ignored when blocked
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setSubmission({
        status: 'error',
        message: 'Please complete your name, email, subject, and message.',
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
            data?.error ||
            'Direct server email delivery is not configured yet. Send your inquiry directly using your email app or copy your message below.',
        });
        return;
      }

      setSubmission({
        status: 'error',
        message:
          data?.error ||
          'Unable to send your message through the server right now. You can still use your email app below.',
      });
    } catch {
      setSubmission({
        status: 'error',
        message:
          'Network error while reaching the contact endpoint. You can send directly using your email app below.',
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
          platform: 'Website',
          handle: 'gabbyteq.com',
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
      className="relative py-20 sm:py-28 bg-[#F5F7FA] overflow-hidden"
    >
      {/* Subtle soft gradient highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 w-96 h-96 rounded-full bg-[#087BFF]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 w-80 h-80 rounded-full bg-[#FF8A24]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Editable Email, Editable Social Links */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#FF8A24] mb-2.5">
              Start a Conversation
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101426] tracking-tight text-balance">
              {contact.heading}
            </h2>
            <p className="mt-4 text-base text-[#101426]/72 leading-relaxed max-w-md">
              {contact.description}
            </p>

            {/* Direct Editable Email Card */}
            <div className="mt-8 rounded-2xl bg-white border border-[#101426]/8 p-5 sm:p-6 shadow-[0_12px_36px_-18px_rgba(16,20,38,0.1)] space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#101426]/55 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#087BFF]" />
                  <span>Direct Email (Editable)</span>
                </div>

                {isEditing ? (
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      onUpdate({...contact, email: e.target.value})
                    }
                    aria-label="Editable contact email address"
                    className="w-full text-sm font-semibold text-[#101426] bg-[#F5F7FA] border border-[#087BFF]/35 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#087BFF]"
                  />
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-display font-semibold text-lg text-[#101426] hover:text-[#087BFF] transition-colors truncate"
                    >
                      {contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FA] hover:bg-[#087BFF]/10 text-xs font-semibold text-[#101426]/80 hover:text-[#087BFF] transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
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

              <div className="pt-4 border-t border-[#101426]/8">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#101426]/55 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#792BFF]" />
                  <span>Collaboration Scope</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={contact.locationNote}
                    onChange={(e) =>
                      onUpdate({...contact, locationNote: e.target.value})
                    }
                    aria-label="Collaboration scope note"
                    className="w-full text-xs text-[#101426] bg-[#F5F7FA] border border-[#101426]/15 rounded-lg px-3 py-1.5"
                  />
                ) : (
                  <p className="text-sm text-[#101426]/75">
                    {contact.locationNote}
                  </p>
                )}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-7">
              <p className="text-xs font-semibold text-[#101426]/55 mb-3">
                Social Channels {isEditing ? '(Editable)' : ''}
              </p>

              <div className="space-y-2.5">
                {contact.socialLinks.map((social) =>
                  isEditing ? (
                    <div
                      key={social.id}
                      className="grid grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-xl border border-[#101426]/10"
                    >
                      <input
                        type="text"
                        value={social.platform}
                        onChange={(e) =>
                          updateSocial(social.id, {platform: e.target.value})
                        }
                        placeholder="Platform"
                        className="col-span-4 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#101426]/12"
                      />
                      <input
                        type="text"
                        value={social.handle}
                        onChange={(e) =>
                          updateSocial(social.id, {handle: e.target.value})
                        }
                        placeholder="Handle"
                        className="col-span-3 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#101426]/12"
                      />
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) =>
                          updateSocial(social.id, {url: e.target.value})
                        }
                        placeholder="https://..."
                        className="col-span-4 text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#101426]/12"
                      />
                      <button
                        type="button"
                        onClick={() => removeSocial(social.id)}
                        aria-label={`Remove ${social.platform}`}
                        className="col-span-1 flex items-center justify-center text-red-600 hover:text-red-700 cursor-pointer"
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
                      className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#101426]/8 hover:border-[#087BFF]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-display font-semibold text-sm text-[#101426] group-hover:text-[#087BFF] transition-colors">
                          {social.platform}
                        </span>
                        <span aria-hidden="true" className="text-[#101426]/30">
                          ·
                        </span>
                        <span className="text-xs text-[#101426]/60 truncate">
                          {social.handle}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#101426]/40 group-hover:text-[#087BFF] transition-colors shrink-0" />
                    </a>
                  ),
                )}

                {isEditing && (
                  <button
                    type="button"
                    onClick={addSocial}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087BFF] hover:text-[#792BFF] cursor-pointer pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Social Link</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Contact Form */}
          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white border border-[#101426]/8 p-6 sm:p-9 shadow-[0_24px_64px_-24px_rgba(16,20,38,0.14)]">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#101426]/75 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#101426]/10 text-sm text-[#101426] placeholder:text-[#101426]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#087BFF] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#101426]/75 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#101426]/10 text-sm text-[#101426] placeholder:text-[#101426]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#087BFF] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#101426]/75 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brand Identity & Website Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#101426]/10 text-sm text-[#101426] placeholder:text-[#101426]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#087BFF] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#101426]/75 mb-2"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your goals, timeline, and what we can build together..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#101426]/10 text-sm text-[#101426] placeholder:text-[#101426]/40 leading-relaxed focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#087BFF] transition-all"
                  />
                </div>

                {serverEmailReady === false && submission.status === 'idle' && (
                  <p className="text-xs text-[#101426]/60 leading-relaxed">
                    Note: Direct server email delivery is not configured on this
                    environment yet. Submitting will prepare a direct{' '}
                    <span className="font-medium text-[#101426]">mailto:</span>{' '}
                    handoff to {contact.email}.
                  </p>
                )}

                {/* Honest Delivery Status Feedback */}
                {submission.status === 'delivered' && (
                  <div
                    role="status"
                    className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-emerald-900"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">
                      {submission.message}
                    </p>
                  </div>
                )}

                {(submission.status === 'unconfigured' ||
                  submission.status === 'error') && (
                  <div
                    role="alert"
                    className="rounded-xl bg-amber-50 border border-amber-200 p-4 space-y-3 text-amber-950"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed">
                        {submission.message}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pl-8">
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#101426] text-white text-xs font-semibold hover:bg-[#087BFF] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMessageDraft}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-amber-950 hover:bg-amber-100/60 transition-colors cursor-pointer"
                      >
                        {copiedDraft ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
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

                <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submission.status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#792BFF] text-white text-sm sm:text-[15px] font-semibold shadow-[0_14px_30px_-10px_rgba(8,123,255,0.45)] hover:shadow-[0_18px_36px_-10px_rgba(121,43,255,0.5)] disabled:opacity-60 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] focus-visible:ring-offset-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submission.status === 'submitting'
                        ? 'Sending...'
                        : 'Send Message'}
                    </span>
                  </button>

                  <a
                    href={mailtoHref}
                    className="text-xs font-semibold text-[#101426]/65 hover:text-[#087BFF] transition-colors"
                  >
                    Or compose directly in your email client
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
