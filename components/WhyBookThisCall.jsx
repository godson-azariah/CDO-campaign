const REASONS = [
  {
    title: "Meet the Mind Behind the Framework",
    copy: "You'll speak directly with Roney Solomon, who co-developed Frugal Innovation with the University of Cambridge, UK — not an account manager reading from a script.",
  },
  {
    title: "Find Out Before You Commit to Anything",
    copy: "30 minutes is enough to know if Frugal Innovation applies to your data and AI stack. No pitch, no pressure, just a real answer.",
  },
  {
    title: "Get There Before the Room Does",
    copy: "Roney speaks on this at the CDO Magazine Chicago Leadership Summit, September 17. Book now and you're already ahead of the conversation everyone else will be having in Chicago.",
  },
];

export default function WhyBookThisCall() {
  return (
    <aside className="flex h-full flex-col rounded-[14px] border border-card-line bg-white p-[22px] shadow-card sm:p-[28px] lg:p-[32px]">
      <h2 className="text-[26px] leading-[1.22] font-extrabold tracking-[-0.02em] text-heading sm:text-[30px] lg:text-[34px]">
        Why Book This Call
      </h2>
      <span
        aria-hidden="true"
        className="mt-[18px] block h-[3px] w-[50px] rounded-full bg-green"
      />

      {/*
        Each item takes an equal share of the leftover height so the dividers
        stay evenly spaced however tall the form beside this grows.
      */}
      <ol className="mt-[26px] flex flex-1 flex-col">
        {REASONS.map((reason, index) => (
          <li
            key={reason.title}
            className="flex flex-1 flex-col justify-center border-t border-card-line py-[24px] first:border-t-0 first:pt-0 last:pb-0"
          >
            {/*
              The number and the text are centred together as one block. Centring
              them separately let the number drift to the top of the stretched
              row while the text sat in the middle.
            */}
            <div className="flex gap-[16px]">
              <span className="w-[26px] shrink-0 text-[15px] leading-[25px] font-extrabold tabular-nums text-violet sm:leading-[26px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                {/* Same leading as the number, so their first lines share a baseline. */}
                <h3 className="text-[18px] leading-[25px] font-bold text-heading sm:text-[19px] sm:leading-[26px]">
                  {reason.title}
                </h3>
                <p className="mt-[10px] text-[16px] leading-[28px] text-muted sm:text-[16.5px] sm:leading-[29px]">
                  {reason.copy}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
