import GetTheBook from "./GetTheBook";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

const POINTS = [
  {
    title: "Understand Your Priorities",
    copy: "Share your key Data & AI goals, challenges, and investment priorities.",
    tint: "bg-[#f1eaff] text-violet",
    icon: (
      <svg {...stroke} className="h-[26px] w-[26px]">
        <circle cx="10" cy="8" r="3.6" />
        <path d="M3.5 20a6.5 6.5 0 0 1 11.4-4.2" />
        <path d="m18.5 13.5 1.1 2.3 2.4.35-1.75 1.7.4 2.45-2.15-1.15-2.15 1.15.4-2.45L15 16.15l2.4-.35Z" />
      </svg>
    ),
  },
  {
    title: "Explore New Possibilities",
    copy: "Discover how Frugal Innovation can help you create more value from what you already have.",
    tint: "bg-[#e6f6ef] text-green",
    icon: (
      <svg {...stroke} className="h-[24px] w-[24px]">
        <circle cx="11" cy="13" r="8" />
        <circle cx="11" cy="13" r="4" />
        <path d="M11 13 21 3M16.5 3H21v4.5" />
      </svg>
    ),
  },
  {
    title: "Leave With Practical Ideas",
    copy: "Walk away with fresh perspectives and ideas you can start applying right away.",
    tint: "bg-[#f1eaff] text-violet",
    icon: (
      <svg {...stroke} className="h-[24px] w-[24px]">
        <path d="M15 14.5c.2-1.1.8-1.9 1.6-2.7A6 6 0 1 0 6 8c0 1.1.3 2.3 1.4 3.8.8.8 1.4 1.6 1.6 2.7" />
        <path d="M9.5 18h5M10.5 21.5h3" />
      </svg>
    ),
  },
];

export default function WhyBookThisCall() {
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-[16px] border border-card-line bg-white shadow-card">
      {/* ── Masthead ── */}
      <div className="relative bg-[linear-gradient(135deg,#3d1391_0%,#2c0a78_55%,#3a1499_100%)] px-[26px] pt-[26px] pb-[42px] sm:px-[34px] sm:pt-[28px] sm:pb-[46px]">
        <div className="flex items-start gap-[18px]">
          <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20">
            <svg {...stroke} className="h-[30px] w-[30px]">
              <path d="M20.5 11.8a8.2 8.2 0 0 1-11.6 7.4L3.5 20.5l1.4-5.3a8.2 8.2 0 1 1 15.6-3.4Z" />
              <circle
                cx="8.6"
                cy="11.8"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="12.2"
                cy="11.8"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="15.8"
                cy="11.8"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </span>

          <div className="min-w-0">
            {/* Optical alignment: the cap height of the heading sits a couple of
                pixels below the circle's top, so nudge the text block up. */}
            <h2 className="-mt-[3px] text-[29px] leading-[1.14] font-extrabold tracking-[-0.02em] text-white sm:text-[32px]">
              Why This
              <br />
              Conversation Matters
            </h2>

            <span
              aria-hidden="true"
              className="mt-[18px] block h-[3px] w-[56px] rounded-full bg-[#4fd1a5]"
            />

            <p className="mt-[18px] text-[15.5px] leading-[26px] text-white/80">
              A focused 30-minute conversation with Roney Soloman to explore
              what&rsquo;s possible for your Data &amp; AI strategy.
            </p>
          </div>
        </div>

        {/* The white sweep that separates the masthead from the list. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 34"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-[-1px] h-[34px] w-full"
        >
          <path
            d="M0 34 C 80 34 140 12 250 4 C 310 1 360 0 400 0 L400 34 Z"
            fill="#fff"
          />
        </svg>
      </div>

      {/* ── Points ── */}
      <ol className="flex flex-1 flex-col px-[26px] pt-[10px] sm:px-[34px]">
        {POINTS.map((point) => (
          <li
            key={point.title}
            className="flex flex-1 flex-col justify-center border-t border-card-line py-[24px] first:border-t-0 first:pt-[6px]"
          >
            <div className="flex items-start gap-[18px]">
              <span
                className={`flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full ${point.tint}`}
              >
                {point.icon}
              </span>
              <div className="min-w-0 pt-[3px]">
                <h3 className="text-[18.5px] leading-[25px] font-bold text-heading sm:text-[19.5px]">
                  {point.title}
                </h3>
                <p className="mt-[8px] text-[15.5px] leading-[26px] text-muted sm:text-[16px] sm:leading-[27px]">
                  {point.copy}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <GetTheBook />
    </aside>
  );
}
