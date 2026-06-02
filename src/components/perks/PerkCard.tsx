interface PerkCardProps {
  icon: string;
  label: string;
}

export function PerkCard({ icon, label }: PerkCardProps) {
  return (
    <div className="rounded-[10px] border border-border bg-card px-[12px] py-[18px] text-[12px] text-muted transition-[border-color,color] duration-200 [border-width:0.5px] hover:border-border2 hover:text-text">
      <div className="mb-[8px] text-[20px]">{icon}</div>
      {label}
    </div>
  );
}
