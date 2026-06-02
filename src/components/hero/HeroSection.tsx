export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[24px] pb-[72px] pt-[96px] text-center before:pointer-events-none before:absolute before:left-1/2 before:top-[-60px] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:bg-hero-glow before:content-[''] max-sm:px-[18px] max-sm:pb-[52px] max-sm:pt-[72px]">
      <div className="relative inline-flex items-center gap-[8px] rounded-[4px] border border-[rgba(212,168,67,0.3)] bg-card px-[18px] py-[6px] text-[10px] uppercase tracking-[4px] text-gold">
        <span className="text-[8px] opacity-70">✦</span>
        Now Hiring — Ahmedabad
        <span className="text-[8px] opacity-70">✦</span>
      </div>
      <h1 className="relative mb-[20px] mt-[32px] font-serif text-[clamp(52px,10vw,96px)] font-bold leading-none tracking-[-2px]">
        Join Our
        <br />
        <em className="not-italic text-gold">Creative</em> Team
      </h1>
      <p className="relative mx-auto mb-[40px] max-w-[460px] text-[16px] font-light leading-[1.7] text-muted">
        Influencers, content creators & interns — grow with us and build
        something real.
      </p>
      <div className="relative flex flex-wrap justify-center gap-[12px]">
        <a
          href="#register"
          className="inline-block rounded-[8px] bg-gold px-[38px] py-[14px] text-[15px] font-semibold tracking-[0.3px] text-bg no-underline transition-all duration-200 hover:-translate-y-px hover:bg-gold-light hover:shadow-gold-soft"
        >
          Apply Now
        </a>
        <a
          href="#positions"
          className="inline-block rounded-[8px] border border-border2 bg-transparent px-[28px] py-[14px] text-[15px] font-normal text-muted no-underline transition-all duration-200 hover:border-border2 hover:text-text"
        >
          View Positions
        </a>
      </div>
    </section>
  );
}
