"use client";

import { useState, useEffect } from "react";
import { ClapstickMediaMark } from "./ClapstickMediaMark";

const NAV_LINKS = [
  { label: "Positions", href: "#positions" },
  { label: "Benefits", href: "#perks" },
  { label: "Apply", href: "#register" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[200] transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-[rgba(7,7,13,0.97)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-[20px] [border-bottom-width:0.5px]"
          : "border-b border-transparent bg-[rgba(7,7,13,0.8)] backdrop-blur-[12px]"
      }`}
    >
      <div className="mx-auto flex min-h-[70px] w-full max-w-[1440px] items-center justify-between gap-[20px] px-[48px] max-lg:px-[28px] max-sm:min-h-[64px] max-sm:px-[18px]">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-[16px]">
          <ClapstickMediaMark />
          <div
            aria-hidden="true"
            className="h-[32px] w-px bg-border2 max-md:hidden"
          />
          <div className="min-w-0 max-md:hidden">
            <p className="text-[8px] font-medium uppercase tracking-[2.5px] text-muted">
              Talent Recruitment
            </p>
            <p className="mt-[2px] truncate font-serif text-[16px] font-bold leading-none tracking-[0.3px] text-text">
              Raja Choudhary
            </p>
            <p className="mt-[3px] text-[7.5px] uppercase tracking-[2.4px] text-gold">
              Social Media Marketing
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-[2px] lg:flex">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[6px] px-[14px] py-[8px] text-[12px] font-medium text-muted transition-colors duration-200 hover:bg-card hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-[10px]">
          <a
            href="#register"
            className="hidden items-center gap-[7px] rounded-[8px] bg-gold px-[22px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.8px] text-bg no-underline transition-all duration-200 hover:-translate-y-px hover:bg-gold-light hover:shadow-gold-soft sm:flex"
          >
            Apply Now
            <ArrowUpRightIcon />
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-border bg-card text-muted transition-all duration-200 hover:border-border2 hover:text-text lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-[rgba(13,13,24,0.98)] px-[18px] pb-[20px] pt-[12px] backdrop-blur-[20px] [border-top-width:0.5px] lg:hidden">
          <div className="flex flex-col gap-[4px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-[8px] px-[14px] py-[12px] text-[14px] font-medium text-muted transition-colors duration-200 hover:bg-card hover:text-text"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#register"
            className="mt-[12px] flex items-center justify-center gap-[7px] rounded-[8px] bg-gold px-[22px] py-[13px] text-[13px] font-semibold uppercase tracking-[0.8px] text-bg no-underline transition-all duration-200 hover:bg-gold-light"
            onClick={() => setMenuOpen(false)}
          >
            Apply Now
            <ArrowUpRightIcon />
          </a>
        </div>
      )}
    </nav>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[12px] w-[12px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7m-7 0h7v7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 7h18M3 12h18M3 17h18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[16px] w-[16px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
