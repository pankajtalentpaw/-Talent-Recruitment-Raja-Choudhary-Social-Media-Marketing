import { ContactCard } from "./ContactCard";

export function ContactSection() {
  return (
    <section className="border-t border-border bg-surface px-[24px] py-[56px] text-center [border-top-width:0.5px]">
      <div className="mx-auto mb-[16px] flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1.5px] border-gold bg-card2 font-serif text-[24px] text-gold">
        RC
      </div>
      <div className="mb-[4px] font-serif text-[24px]">Raja Choudhary</div>
      <div className="mb-[20px] text-[9px] uppercase tracking-[3px] text-gold">
        Social Media Marketing Manager · Ahmedabad
      </div>
      <p className="mx-auto mb-[24px] max-w-[380px] text-[13px] leading-[1.7] text-muted">
        Have a question before applying? Reach out directly — DM on Instagram,
        send a mail, or just call.
      </p>
      <div className="flex flex-wrap justify-center gap-[10px]">
        <ContactCard
          href="https://instagram.com/heyy.rajaa"
          target="_blank"
          rel="noreferrer"
          className="border-[rgba(225,48,108,0.3)] text-[#E1306C] hover:border-[#E1306C] hover:bg-[rgba(225,48,108,0.06)] hover:text-[#E1306C]"
        >
          <InstagramIcon />
          DM on Instagram
          <span className="ml-[4px] text-[11px] opacity-70">@heyy.rajaa</span>
        </ContactCard>
        <ContactCard href="mailto:crrj7877@gmail.com">
          <EmailIcon />
          crrj7877@gmail.com
        </ContactCard>
        <ContactCard href="tel:7877673066">
          <PhoneIcon />
          +91 78776 73066
        </ContactCard>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l.95-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
