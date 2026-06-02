export function ClapstickMediaMark() {
  return (
    <div
      aria-label="Clapstick Media"
      className="flex shrink-0 items-center gap-[11px]"
    >
      <div aria-hidden="true" className="relative h-[32px] w-[38px]">
        <div className="absolute bottom-0 left-0 h-[24px] w-[38px] rounded-[3px] border border-[rgba(212,168,67,0.65)] bg-[rgba(212,168,67,0.05)]" />
        <div className="absolute left-[1px] top-[2px] h-[8px] w-[37px] -rotate-[8deg] rounded-[2px] border border-gold bg-[rgba(212,168,67,0.14)]" />
        <div className="absolute left-[11px] top-[2px] h-[8px] w-px -rotate-[8deg] bg-gold opacity-70" />
        <div className="absolute left-[23px] top-[1px] h-[8px] w-px -rotate-[8deg] bg-gold opacity-70" />
      </div>
      <div className="max-[390px]:hidden">
        <p className="font-serif text-[17px] font-bold uppercase leading-none tracking-[2.5px] text-gold">
          Clapstick
        </p>
        <p className="mt-[5px] text-[8px] uppercase tracking-[5.5px] text-muted">
          Media
        </p>
      </div>
    </div>
  );
}
