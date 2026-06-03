export function Footer() {
  return (
    <footer className="border-t border-border bg-bg px-[52px] py-[32px] [border-top-width:0.5px] max-lg:px-[28px] max-sm:px-[18px] max-sm:py-[24px]">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-[16px] sm:flex-row">
        {/* Brand */}
        <div className="flex flex-col items-center gap-[4px] sm:items-start">
          <div className="font-serif text-[16px] font-bold text-text">
            Raja Choudhary
          </div>
          <div className="text-[9px] uppercase tracking-[2px] text-muted">
            Social Media Marketing Manager · Ahmedabad
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-[20px]">
          <a
            href="#positions"
            className="text-[11px] text-muted no-underline transition-colors duration-200 hover:text-text"
          >
            Positions
          </a>
          <a
            href="#register"
            className="text-[11px] text-muted no-underline transition-colors duration-200 hover:text-text"
          >
            Apply
          </a>
          <a
            href="#contact"
            className="text-[11px] text-muted no-underline transition-colors duration-200 hover:text-text"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[10px] tracking-[0.5px] text-muted">
          © 2025{" "}
          <span className="text-gold">Clapstick Media</span>
        </div>
      </div>
    </footer>
  );
}
