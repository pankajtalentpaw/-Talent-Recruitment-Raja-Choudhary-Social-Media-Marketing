import { PERKS } from "@/constants/app";
import { PerkCard } from "./PerkCard";

export function PerksSection() {
  return (
    <section
      id="perks"
      className="border-y border-border bg-surface px-[52px] py-[64px] text-center [border-bottom-width:0.5px] [border-top-width:0.5px] max-lg:px-[28px] max-sm:px-[18px] max-sm:py-[48px]"
    >
      {/* Header */}
      <div className="mb-[12px] flex items-center justify-center gap-[14px]">
        <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
        <span className="text-[9px] font-semibold uppercase tracking-[4px] text-muted">
          Why Join Us
        </span>
        <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
      </div>
      <h2 className="mb-[6px] font-serif text-[clamp(26px,4vw,38px)] font-bold">
        What You <span className="text-gold">Get</span>
      </h2>
      <p className="mx-auto mb-[40px] max-w-[400px] text-[13px] leading-[1.7] text-muted">
        More than a job — a creative partnership with real benefits.
      </p>

      <div className="mx-auto grid max-w-[860px] grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px]">
        {PERKS.map((perk) => (
          <PerkCard key={perk.label} {...perk} />
        ))}
      </div>
    </section>
  );
}
