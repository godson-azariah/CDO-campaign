import GetTheBook from "./GetTheBook";
import { IdeaIcon, PossibilityIcon, PriorityIcon } from "./icons";

/*
 * Headings only, no supporting copy - the panel exists to set up the book offer,
 * so everything it doesn't strictly need has been taken out.
 *
 * The three points sit across one row, icon over a two-line title. That is what
 * the extra column width bought: laid out across instead of down, the list costs
 * a third of the height it used to, and all of that goes to the cover below.
 *
 * The masthead's speech-bubble icon stays parked in ./icons as ConversationIcon:
 * putting it back would push the single-line heading wider than this column.
 */
const POINTS = [
  {
    title: "Understand Your Priorities",
    tint: "bg-[#efe6ff] text-violet",
    Icon: PriorityIcon,
  },
  {
    title: "Explore New Possibilities",
    tint: "bg-[#e2f4ec] text-green",
    Icon: PossibilityIcon,
  },
  {
    title: "Leave With Practical Ideas",
    tint: "bg-[#efe6ff] text-violet",
    Icon: IdeaIcon,
  },
];

export default function WhyBookThisCall() {
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-[16px] border border-card-line bg-white shadow-card">
      {/* ── Masthead ── */}
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#3d1391_0%,#2c0a78_55%,#3a1499_100%)] px-[26px] py-[34px] sm:px-[34px] sm:py-[40px]">
        {/* Fine grid, the same texture the hero band carries. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.064)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.064)_1px,transparent_1px)] bg-[size:56px_56px]"
        />

        <div className="relative text-center">
          {/* Sized to hold on one line in this column. */}
          <h2 className="text-[24px] leading-[1.14] font-extrabold tracking-[-0.03em] whitespace-nowrap text-white sm:text-[28px]">
            Sign Up to Get Your Book
          </h2>
        </div>
      </div>

      {/*
        ── Points ──
        pb clears the book below: the cover breaks up out of its band, and
        nothing in the list may sit inside that overlap.

        Deliberately NOT flex-1. The panel is stretched to the form's height, and
        whichever child carries flex-1 absorbs the leftover - on the list that
        showed up as a band of white above the cover. The offer below takes it
        instead, so the slack lands inside the violet.
      */}
      <ol className="grid gap-y-[22px] px-[24px] pt-[28px] pb-[76px] sm:grid-cols-3 sm:gap-x-[14px] sm:px-[28px] sm:pb-[96px]">
        {POINTS.map(({ title, tint, Icon }) => (
          <li
            key={title}
            className="flex flex-col items-center gap-[12px] text-center"
          >
            <span
              className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${tint}`}
            >
              <Icon className="h-[24px] w-[24px]" />
            </span>
            <h3 className="text-[15.5px] leading-[21px] font-bold text-balance text-heading">
              {title}
            </h3>
          </li>
        ))}
      </ol>

      <GetTheBook />
    </aside>
  );
}
