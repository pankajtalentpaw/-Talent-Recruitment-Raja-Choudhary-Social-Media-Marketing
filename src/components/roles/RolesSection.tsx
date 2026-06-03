import { OPEN_POSITIONS } from "@/constants/app";
import { RoleCard } from "./RoleCard";

export function RolesSection() {
  return (
    <section id="positions" className="px-[52px] pb-[80px] pt-[8px] max-lg:px-[28px] max-sm:px-[18px] max-sm:pb-[56px]">
      {/* Section header */}
      <div className="mb-[40px] flex flex-col items-center gap-[6px] text-center">
        <div className="flex items-center gap-[14px]">
          <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
          <span className="text-[9px] font-semibold uppercase tracking-[4px] text-muted">
            Open Positions
          </span>
          <div className="h-px w-[40px] bg-border max-sm:w-[24px]" />
        </div>
        <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-bold text-text">
          What We&rsquo;re <span className="text-gold">Looking For</span>
        </h2>
        <p className="max-w-[440px] text-[13px] leading-[1.7] text-muted">
          Three focused roles, one creative family. Find your fit and apply.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[14px]">
        {OPEN_POSITIONS.map((position) => (
          <RoleCard key={position.number} {...position} />
        ))}
      </div>
    </section>
  );
}
