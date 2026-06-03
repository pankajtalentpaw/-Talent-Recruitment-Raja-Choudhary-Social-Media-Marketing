import { ContactCard } from "./ContactCard";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-surface px-[52px] py-[72px] [border-top-width:0.5px] max-lg:px-[28px] max-sm:px-[18px] max-sm:py-[52px]"
    >
      <div className="mx-auto max-w-[680px]">
        {/* Section label */}
        <div className="mb-[36px] flex flex-col items-center gap-[6px] text-center">
          <div className="flex items-center gap-[14px]">
            <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
            <span className="text-[9px] font-semibold uppercase tracking-[4px] text-muted">
              Contact
            </span>
            <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
          </div>
          <h2 className="font-serif text-[clamp(26px,4vw,36px)] font-bold text-text">
            Get in <span className="text-gold">Touch</span>
          </h2>
        </div>

        {/* Profile card */}
        <div className="mb-[32px] overflow-hidden rounded-[16px] border border-border bg-card [border-width:0.5px]">
          <div className="h-[3px] bg-topbar-gradient" />
          <div className="flex items-center gap-[20px] px-[28px] py-[24px] max-sm:flex-col max-sm:text-center">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-gold bg-gold-dim font-serif text-[26px] font-bold text-gold">
                RC
              </div>
              <div className="absolute -bottom-[2px] -right-[2px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[rgba(46,204,122,0.4)] bg-surface text-[10px]">
                ✓
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="text-[8px] font-medium uppercase tracking-[2.4px] text-muted">
                Your Point of Contact
              </div>
              <div className="mt-[4px] font-serif text-[22px] font-bold text-text">
                Raja Choudhary
              </div>
              <div className="mt-[2px] text-[9px] uppercase tracking-[2.4px] text-gold">
                Social Media Marketing Manager · Ahmedabad
              </div>
              <p className="mt-[8px] text-[12.5px] leading-[1.7] text-muted">
                Have a question before applying? Reach out directly — DM on
                Instagram, send a mail, or give a call.
              </p>
            </div>
          </div>
        </div>

        {/* Contact cards */}
        <div className="flex flex-wrap justify-center gap-[10px]">
          <ContactCard
            href="https://instagram.com/heyy.rajaa"
            target="_blank"
            rel="noreferrer"
            className="border-[rgba(225,48,108,0.25)] text-[#E1306C] hover:border-[#E1306C] hover:bg-[rgba(225,48,108,0.06)]"
          >
            <InstagramIcon />
            <div>
              <div className="text-[11px] font-semibold">DM on Instagram</div>
              <div className="mt-[1px] text-[10px] opacity-70">@heyy.rajaa</div>
            </div>
          </ContactCard>

          <ContactCard href="mailto:crrj7877@gmail.com">
            <EmailIcon />
            <div>
              <div className="text-[11px] font-semibold">Send Email</div>
              <div className="mt-[1px] text-[10px] opacity-70">crrj7877@gmail.com</div>
            </div>
          </ContactCard>

          <ContactCard href="tel:7877673066">
            <PhoneIcon />
            <div>
              <div className="text-[11px] font-semibold">Call Directly</div>
              <div className="mt-[1px] text-[10px] opacity-70">+91 78776 73066</div>
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l.95-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
