export function SuccessScreen() {
  return (
    <div className="px-[24px] py-[48px] text-center">
      <div className="mx-auto mb-[18px] flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[rgba(212,168,67,0.3)] bg-gold-dim text-[28px]">
        🎬
      </div>
      <h3 className="mb-[8px] font-serif text-[26px] text-gold">
        Application Received!
      </h3>
      <p className="text-[14px] leading-[1.7] text-muted">
        Thank you for registering.
        <br />
        Raja will reach out within 2–3 days.
      </p>
      <p className="mt-[16px] text-[12px] text-[#3A3A55]">
        Follow <strong className="text-gold">@heyy.rajaa</strong> on Instagram
        for updates.
      </p>
    </div>
  );
}
