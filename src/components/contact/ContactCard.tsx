import type { AnchorHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/utils/classNames";

interface ContactCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function ContactCard({ className, children, ...props }: ContactCardProps) {
  return (
    <a
      className={classNames(
        "flex items-center gap-[12px] rounded-[12px] border border-border bg-card px-[20px] py-[14px] text-muted no-underline transition-all duration-200 [border-width:0.5px] hover:-translate-y-[1px] hover:border-border2 hover:text-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
