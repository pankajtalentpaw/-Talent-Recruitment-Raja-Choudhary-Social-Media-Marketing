import { PERKS } from "@/constants/app";
import { PerkCard } from "./PerkCard";

export function PerksSection() {
  return (
    <section className="border-y border-border bg-surface px-[52px] py-[52px] text-center [border-bottom-width:0.5px] [border-top-width:0.5px] max-sm:px-[18px] max-sm:py-[40px]">
      <h2 className="mb-[32px] font-serif text-[28px]">
        What You <span className="text-gold">Get</span>
      </h2>
      <div className="mx-auto grid max-w-[720px] grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-[10px]">
        {PERKS.map((perk) => (
          <PerkCard key={perk.label} {...perk} />
        ))}
      </div>
    </section>
  );
}
