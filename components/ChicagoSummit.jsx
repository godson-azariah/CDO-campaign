const FACTS = [
  ["Time", "10:00–10:45 AM CDT", "45 minutes"],
  ["Location", "Grand Ballroom, Room 6", "CDO Magazine Summit"],
  ["Session", "Frugal Innovation in Data & AI", "Breakout panel"],
];

const SPEAKERS = [
  ["RS", "Roney Soloman", "Moderator", "CEO & Co-Founder, Ignitho"],
  ["MA", "Mir Ali", "Panelist", "Head of Data & Analytics, Hershey"],
  ["DF", "Don Fleschut", "Panelist", "VP, Chief Data Officer, Ryerson"],
  [
    "FS",
    "Farhan Sabzaali",
    "Panelist",
    "Data & Analytics Leader, University of Chicago",
  ],
];

/*
 * One column, three bands, one padding rhythm — intro, facts, panel.
 * The previous two-column split left a tinted sidebar that never had enough in
 * it, which is what made the card feel gappy however much padding came off.
 */
export default function ChicagoSummit() {
  return (
    <section className="trap-section py-[44px] sm:py-[58px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-[38px]">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[18px] bg-[linear-gradient(118deg,#122a5c_0%,#1a2a66_34%,#231a6e_70%,#2e137a_100%)] shadow-[0_26px_60px_-24px_rgba(20,8,60,0.7)]">
          {/* ── Intro ── */}
          <div className="px-[26px] pt-[32px] pb-[28px] sm:px-[40px] sm:pt-[38px] sm:pb-[32px]">
            <p className="text-[11px] font-bold tracking-[0.02em] text-[#4fd1a5]">
              Breakout session &middot; CDO Magazine Chicago Leadership Summit
            </p>

            <div className="mt-[18px] flex flex-col gap-[24px] lg:flex-row lg:items-end lg:justify-between lg:gap-[40px]">
              <div className="min-w-0">
                <h2 className="text-[27px] leading-[1.18] font-extrabold tracking-[-0.02em] text-white sm:text-[33px]">
                  Roney Soloman Takes the Stage in Chicago
                </h2>

                <p className="mt-[16px] max-w-[680px] text-[15px] leading-[26px] text-white/80 sm:text-[15.5px]">
                  Join Roney Soloman as he moderates{" "}
                  <span className="font-bold text-white">
                    &ldquo;Frugal Innovation in Data &amp; AI&rdquo;
                  </span>
                  , a 45-minute breakout session alongside data leaders from
                  Hershey, Ryerson, and the University of Chicago.
                </p>
              </div>

              <a
                href="#conversation-form"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-green px-[28px] py-[13px] text-[15px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:self-auto"
              >
                Reserve Your Spot
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* ── Facts, across rather than down ── */}
          <dl className="grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-3">
            {FACTS.map(([label, value, note]) => (
              <div
                key={label}
                className="bg-[#1b1a4d]/40 px-[26px] py-[20px] backdrop-blur-[2px] sm:px-[28px]"
              >
                <dt className="text-[10.5px] font-bold tracking-[0.02em] text-[#4fd1a5]">
                  {label}
                </dt>
                <dd className="mt-[6px] text-[15px] leading-[21px] font-bold text-white">
                  {value}
                </dd>
                <dd className="mt-[2px] text-[12.5px] leading-[17px] text-white/55">
                  {note}
                </dd>
              </div>
            ))}
          </dl>

          {/* ── Panel line-up ── */}
          <div className="px-[26px] py-[28px] sm:px-[40px] sm:py-[30px]">
            <p className="text-[10.5px] font-bold tracking-[0.02em] text-white/45">
              On the panel
            </p>

            <ul className="mt-[18px] grid gap-x-[30px] gap-y-[22px] sm:grid-cols-2 xl:grid-cols-4">
              {SPEAKERS.map(([initials, name, role, title]) => (
                <li key={name} className="flex items-start gap-[13px]">
                  <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(150deg,#7c4dff_0%,#5a2ecb_100%)] text-[14px] font-extrabold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0 pt-[2px]">
                    <p className="text-[14.5px] leading-[19px] font-bold text-white">
                      {name}
                    </p>
                    <p className="mt-[2px] text-[12.5px] leading-[16px] font-semibold text-[#4fd1a5]">
                      {role}
                    </p>
                    <p className="mt-[3px] text-[12.5px] leading-[17px] text-white/60">
                      {title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
