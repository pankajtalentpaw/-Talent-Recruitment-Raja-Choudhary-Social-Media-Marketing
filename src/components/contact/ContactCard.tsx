import type { AnchorHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/utils/classNames";

interface ContactCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function ContactCard({ className, children, ...props }: ContactCardProps) {
  return (
    <a
      className={classNames(
        "flex items-center gap-[7px] rounded-[8px] border border-border bg-card px-[18px] py-[10px] text-[13px] text-muted no-underline transition-all duration-200 [border-width:0.5px] hover:border-gold hover:text-gold",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
