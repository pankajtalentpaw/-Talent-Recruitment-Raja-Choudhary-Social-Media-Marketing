interface PerkCardProps {
  icon: string;
  label: string;
  description?: string;
}

export function PerkCard({ icon, label, description }: PerkCardProps) {
  return (
    <div className="group flex flex-col items-center gap-[10px] rounded-[12px] border border-border bg-card px-[16px] py-[22px] text-center transition-all duration-200 [border-width:0.5px] hover:border-[rgba(212,168,67,0.25)] hover:bg-card2">
      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-border bg-surface text-[20px] transition-all duration-200 group-hover:border-[rgba(212,168,67,0.2)] group-hover:bg-gold-dim">
        {icon}
      </div>
      <div className="text-[12px] font-semibold text-text-dim transition-colors duration-200 group-hover:text-text">
        {label}
      </div>
      {description && (
        <div className="text-[11px] leading-[1.5] text-muted">{description}</div>
      )}
    </div>
  );
}
