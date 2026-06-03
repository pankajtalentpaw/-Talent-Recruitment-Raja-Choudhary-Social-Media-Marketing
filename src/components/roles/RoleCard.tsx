interface RoleCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export function RoleCard({ number, title, description, icon, tags }: RoleCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[14px] border border-border bg-card px-[24px] py-[28px] text-left transition-all duration-300 [border-width:0.5px] hover:-translate-y-[3px] hover:border-[rgba(212,168,67,0.3)] hover:bg-card2 hover:shadow-card-hover">
      {/* Top accent line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-role-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Corner shine */}
      <div className="pointer-events-none absolute right-0 top-0 h-[120px] w-[120px] bg-[radial-gradient(circle_at_100%_0%,rgba(212,168,67,0.06)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="mb-[18px] flex h-[48px] w-[48px] items-center justify-center rounded-[10px] border border-[rgba(212,168,67,0.2)] bg-gold-dim text-[22px]">
        {icon}
      </div>

      {/* Position label */}
      <div className="mb-[8px] text-[8.5px] font-semibold uppercase tracking-[3.5px] text-gold">
        {number}
      </div>

      {/* Title */}
      <h3 className="mb-[10px] font-serif text-[24px] font-bold leading-none text-text">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-[18px] text-[12.5px] leading-[1.65] text-muted">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-[6px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[4px] border border-border bg-surface px-[8px] py-[3px] text-[9px] font-medium uppercase tracking-[1px] text-muted-light"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Apply arrow */}
      <a
        href="#register"
        className="mt-[20px] inline-flex items-center gap-[6px] text-[11px] font-medium text-muted no-underline transition-colors duration-200 group-hover:text-gold"
      >
        Apply for this role
        <svg
          aria-hidden="true"
          className="h-[11px] w-[11px]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 17 17 7m-7 0h7v7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </a>
    </div>
  );
}
