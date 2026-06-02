import { Button } from "@/components/common/Button";
import { ClapstickMediaMark } from "./ClapstickMediaMark";

interface NavbarProps {
  onOpenAdmin: () => void;
}

export function Navbar({ onOpenAdmin }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-[200] border-b border-border bg-[rgba(7,7,13,0.96)] shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-[16px] [border-bottom-width:0.5px]">
      <div className="mx-auto flex min-h-[74px] w-full max-w-[1440px] items-center justify-between gap-[20px] px-[52px] max-sm:min-h-[68px] max-sm:gap-[12px] max-sm:px-[18px]">
        <div className="flex min-w-0 items-center gap-[18px]">
          <ClapstickMediaMark />
          <div
            aria-hidden="true"
            className="h-[34px] w-px bg-border2 max-md:hidden"
          />
          <div className="min-w-0 max-md:hidden">
            <p className="text-[8px] font-medium uppercase tracking-[2.5px] text-muted">
              Talent Recruitment
            </p>
            <p className="mt-[2px] truncate font-serif text-[17px] font-bold leading-none tracking-[0.4px] text-text">
              Raja Choudhary
            </p>
            <p className="mt-[4px] text-[8px] uppercase tracking-[2.3px] text-gold">
              Social Media Marketing
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-[10px]">
          <Button
            aria-label="Open admin panel"
            className="flex items-center gap-[7px] rounded-[8px] border border-border2 bg-transparent px-[14px] py-[9px] text-[11px] font-medium uppercase tracking-[1px] text-muted transition-all duration-200 hover:border-gold hover:text-gold max-sm:px-[10px]"
            onClick={onOpenAdmin}
          >
            <AdminIcon />
            <span className="max-sm:hidden">Admin</span>
          </Button>
          <a
            href="#register"
            className="flex items-center gap-[7px] rounded-[8px] bg-gold px-[20px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.8px] text-bg no-underline transition-all duration-200 hover:-translate-y-px hover:bg-gold-light hover:shadow-gold-soft max-sm:px-[14px]"
          >
            Apply Now
            <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}

function AdminIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[14px] w-[14px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m19.4 13.3 1.05.82-1.8 3.11-1.24-.5a7.64 7.64 0 0 1-2.3 1.33l-.2 1.32h-3.6l-.19-1.32a7.64 7.64 0 0 1-2.3-1.33l-1.24.5-1.8-3.11 1.05-.82a7.72 7.72 0 0 1 0-2.66l-1.05-.82 1.8-3.11 1.24.5a7.64 7.64 0 0 1 2.3-1.33l.19-1.32h3.6l.2 1.32a7.64 7.64 0 0 1 2.3 1.33l1.24-.5 1.8 3.11-1.05.82a7.72 7.72 0 0 1 0 2.66Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[13px] w-[13px]"
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
  );
}
