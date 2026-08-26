import GetTheBook from "./GetTheBook";
import { IdeaIcon, PossibilityIcon, PriorityIcon } from "./icons";

/*
 * Headings only, no supporting copy - the panel exists to set up the book offer,
 * so everything it doesn't strictly need has been taken out.
 *
 * The three points sit across one row, icon over a title that must come out at
 * two lines. The longest of them is 38 characters, so at this column width the
 * type has to be 13.5px for its balanced split to fit - drop the padding or the
 * gap any further and it wraps to three again.
 *
 * The tints alternate by position, not by icon - the middle cell is the green
 * one wherever its point happens to sit.
 *
 * The masthead's speech-bubble icon stays parked in ./icons as ConversationIcon.
 */
const POINTS = [
  {
    title: "Explore new possibilities",
    tint: "bg-[#efe6ff] text-violet",
    Icon: PossibilityIcon,
  },
  {
    title: "See how it fits your current priorities",
    tint: "bg-[#e2f4ec] text-green",
    Icon: PriorityIcon,
  },
  {
    title: "Leave with practical ideas",
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
          What you&rsquo;ll discover on the call:
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
      <ol className="grid gap-y-[22px] px-[24px] pt-[28px] pb-[76px] sm:grid-cols-3 sm:gap-x-[10px] sm:px-[14px] sm:pb-[96px]">
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
            <h3 className="text-[13.5px] leading-[19px] font-bold text-balance text-heading">
              {title}
            </h3>
          </li>
        ))}
      </ol>

      <GetTheBook />
    </aside>
  );
}
