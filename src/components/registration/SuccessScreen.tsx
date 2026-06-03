export function SuccessScreen() {
  return (
    <div className="flex flex-col items-center px-[24px] py-[56px] text-center">
      {/* Icon */}
      <div className="relative mb-[24px]">
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-[rgba(212,168,67,0.25)] bg-gold-dim text-[36px]">
          🎬
        </div>
        <div className="absolute -right-[4px] -top-[4px] flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[rgba(46,204,122,0.4)] bg-green-dim text-[14px]">
          ✓
        </div>
      </div>

      {/* Heading */}
      <h3 className="mb-[10px] font-serif text-[30px] font-bold leading-none text-text">
        Application <span className="text-gold">Received!</span>
      </h3>

      {/* Message */}
      <p className="mb-[6px] max-w-[360px] text-[14px] leading-[1.8] text-muted">
        Thank you for registering with Clapstick Media.
        <br />
        Raja will review your profile and reach out within{" "}
        <strong className="font-semibold text-text-dim">2–3 business days</strong>.
      </p>

      {/* Divider */}
      <div className="my-[24px] w-[60px] border-t border-border" />

      {/* Follow CTA */}
      <div className="rounded-[12px] border border-border bg-surface px-[24px] py-[16px]">
        <p className="mb-[2px] text-[11px] uppercase tracking-[1.5px] text-muted">
          Stay updated
        </p>
        <p className="text-[13px] text-text-dim">
          Follow{" "}
          <a
            href="https://instagram.com/heyy.rajaa"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gold no-underline hover:underline"
          >
            @heyy.rajaa
          </a>{" "}
          on Instagram for updates
        </p>
      </div>
    </div>
  );
}
