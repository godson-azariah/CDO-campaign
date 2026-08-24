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
      {/*
        ── Masthead ──
        White, like the list under it - the violet is spent once, on the book
        offer at the foot, so it still lands as an event rather than as the
        panel's general colour. The grid layers came off with the violet: they
        are white hairlines, which have nothing to sit on here.
      */}
      <div className="px-[26px] pt-[32px] pb-[8px] text-center sm:px-[34px] sm:pt-[38px] sm:pb-[10px]">
        <h2 className="text-[24px] leading-[1.18] font-extrabold tracking-[-0.03em] text-balance text-heading sm:text-[28px]">
          What You&rsquo;ll Discover on the Call
        </h2>
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
