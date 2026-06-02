interface RoleCardProps {
  number: string;
  title: string;
  description: string;
}

export function RoleCard({ number, title, description }: RoleCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[12px] border border-border bg-card px-[22px] py-[28px] text-left [border-width:0.5px] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-role-accent before:opacity-0 before:transition-opacity before:duration-[250ms] before:content-[''] hover:-translate-y-[2px] hover:border-border2 hover:bg-card2 hover:before:opacity-100 transition-[border-color,transform,background] duration-[250ms]">
      <div className="mb-[14px] text-[9px] uppercase tracking-[4px] text-gold">
        {number}
      </div>
      <div className="mb-[8px] font-serif text-[22px] font-bold">{title}</div>
      <div className="text-[12px] leading-[1.6] text-muted">{description}</div>
    </div>
  );
}
