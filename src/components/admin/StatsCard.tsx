interface StatsCardProps {
  label: string;
  value: number;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-[8px] bg-card px-[10px] py-[12px] text-center">
      <div className="font-serif text-[24px] font-bold leading-none text-gold">
        {value}
      </div>
      <div className="mt-[4px] text-[9px] uppercase tracking-[2px] text-muted">
        {label}
      </div>
    </div>
  );
}
