export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-[80px] pt-[100px] text-center max-sm:pb-[56px] max-sm:pt-[72px]">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-120px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.1)_0%,transparent_65%)]" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(123,104,238,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Badge */}
      <div className="relative mb-[28px] inline-flex items-center gap-[10px] rounded-full border border-[rgba(212,168,67,0.25)] bg-[rgba(212,168,67,0.06)] px-[20px] py-[8px]">
        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-gold shadow-gold-soft" />
        <span className="text-[10px] font-medium uppercase tracking-[3.5px] text-gold">
          Now Hiring · Ahmedabad
        </span>
        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-gold shadow-gold-soft" />
      </div>

      {/* Headline */}
      <h1 className="relative mb-[22px] px-[24px] font-serif text-[clamp(48px,9vw,92px)] font-bold leading-[0.95] tracking-[-2px] text-text max-sm:px-[18px]">
        Join Our
        <br />
        <em className="not-italic text-gold">Creative</em>{" "}
        <span className="text-text-dim">Team</span>
      </h1>

      {/* Subtitle */}
      <p className="relative mx-auto mb-[40px] max-w-[480px] px-[24px] text-[16px] font-light leading-[1.8] text-muted max-sm:px-[18px] max-sm:text-[15px]">
        Influencers, content creators &amp; interns — grow with Clapstick Media
        and build something that lasts.
      </p>

      {/* CTAs */}
      <div className="relative mb-[56px] flex flex-wrap justify-center gap-[12px] px-[18px]">
        <a
          href="#register"
          className="group inline-flex items-center gap-[8px] rounded-[10px] bg-gold px-[36px] py-[14px] text-[14px] font-semibold tracking-[0.3px] text-bg no-underline transition-all duration-200 hover:-translate-y-[2px] hover:bg-gold-light hover:shadow-gold-glow active:translate-y-0"
        >
          Apply Now
          <svg
            aria-hidden="true"
            className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 17 17 7m-7 0h7v7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </a>
        <a
          href="#positions"
          className="inline-flex items-center gap-[8px] rounded-[10px] border border-border2 bg-card px-[28px] py-[14px] text-[14px] font-normal text-muted no-underline transition-all duration-200 hover:border-border3 hover:text-text"
        >
          View Positions
        </a>
      </div>

      {/* Stats bar */}
      <div className="relative mx-auto flex max-w-[580px] flex-wrap items-center justify-center gap-[0px] px-[24px] max-sm:px-[18px]">
        <StatPill value="3" label="Open Roles" />
        <Divider />
        <StatPill value="Ahmedabad" label="Based In" />
        <Divider />
        <StatPill value="2–3 Days" label="Response Time" />
        <Divider />
        <StatPill value="Paid" label="Work Type" />
      </div>
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[3px] px-[20px] py-[10px]">
      <span className="font-serif text-[20px] font-bold leading-none text-gold max-sm:text-[18px]">
        {value}
      </span>
      <span className="text-[9px] font-medium uppercase tracking-[1.8px] text-muted">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden="true"
      className="h-[28px] w-px bg-border max-sm:hidden"
    />
  );
}
