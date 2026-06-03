export function EmptyState() {
  return (
    <div className="flex flex-col items-center px-[24px] py-[72px] text-center">
      {/* Icon */}
      <div className="mb-[20px] flex h-[56px] w-[56px] items-center justify-center rounded-[14px] border border-border bg-card text-muted">
        <InboxIcon />
      </div>

      {/* Message */}
      <h4 className="mb-[6px] font-serif text-[22px] text-text">
        No registrations yet
      </h4>
      <p className="mx-auto max-w-[320px] text-[12.5px] leading-[1.7] text-muted">
        New applications will appear here once the registration form is
        submitted on the public site.
      </p>

      {/* Hint badge */}
      <div className="mt-[20px] flex items-center gap-[8px] rounded-[8px] border border-border bg-surface px-[14px] py-[10px] text-[11px] text-muted">
        <svg
          aria-hidden="true"
          className="h-[13px] w-[13px] shrink-0 text-gold"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 8v4m0 4h.01"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
        Refresh to check for new submissions
      </div>
    </div>
  );
}

function InboxIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[24px] w-[24px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 14h4l2 3h4l2-3h4M5 14l2-9h10l2 9v5H5v-5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
