interface SectionDividerProps {
  children: string;
}

export function SectionDivider({ children }: SectionDividerProps) {
  return (
    <div className="my-1 flex items-center gap-4 px-[52px] before:h-px before:flex-1 before:scale-y-50 before:bg-border after:h-px after:flex-1 after:scale-y-50 after:bg-border max-sm:px-[18px]">
      <span className="text-[9px] uppercase tracking-[4px] text-muted">
        {children}
      </span>
    </div>
  );
}
