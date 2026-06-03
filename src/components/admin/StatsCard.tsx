type StatsCardColor = "gold" | "blue" | "purple" | "green";

interface StatsCardProps {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  color?: StatsCardColor;
}

const COLOR_MAP: Record<StatsCardColor, { text: string; bg: string; border: string }> = {
  gold: {
    text: "text-gold",
    bg: "bg-gold-dim",
    border: "border-[rgba(212,168,67,0.2)]",
  },
  blue: {
    text: "text-blue",
    bg: "bg-[rgba(96,165,250,0.1)]",
    border: "border-[rgba(96,165,250,0.2)]",
  },
  purple: {
    text: "text-purple",
    bg: "bg-[rgba(192,132,252,0.1)]",
    border: "border-[rgba(192,132,252,0.2)]",
  },
  green: {
    text: "text-green",
    bg: "bg-green-dim",
    border: "border-[rgba(46,204,122,0.2)]",
  },
};

export function StatsCard({
  label,
  value,
  description,
  icon,
  color = "gold",
}: StatsCardProps) {
  const colors = COLOR_MAP[color];

  return (
    <div className="group rounded-[12px] border border-border bg-card px-[18px] py-[18px] transition-all duration-200 [border-width:0.5px] hover:border-border2 hover:bg-card2">
      {/* Top row: label + icon */}
      <div className="mb-[14px] flex items-center justify-between gap-[8px]">
        <div className="text-[9px] font-semibold uppercase tracking-[2px] text-muted">
          {label}
        </div>
        <div
          className={`flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border ${colors.bg} ${colors.border} ${colors.text}`}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className={`font-serif text-[38px] font-bold leading-none ${colors.text}`}>
        {value}
      </div>

      {/* Description */}
      <div className="mt-[8px] text-[11px] leading-[1.4] text-muted">
        {description}
      </div>
    </div>
  );
}
