import Image from "next/image";

/*
 * Full-bleed dark band at the foot of the panel, with the cover on a line of
 * its own breaking upward out of it into the white space above. The cover is
 * the only place the title appears now, so the copy under it stays generic.
 *
 * That overlap is the hook: an element crossing its own boundary reads as
 * deliberate and pulls the eye far harder than anything sitting neatly inside a
 * box. No tilt, no gradient tricks - just the break, the size, and the contrast
 * of a white jacket on deep violet.
 *
 * No overflow-hidden on this band: the cover has to break out of its top edge,
 * and clipping it was exactly what cut the book in half. The texture layers are
 * absolute inset-0, so they cannot leak past it on their own.
 *
 * BACKUP - the band was bg-[#2c0a78] before. That is a blue-violet (hue ~258),
 * which is what made this section read as blue. #4a0a86 is the same darkness at
 * hue ~271, so it sits in the purple family with --color-violet (#7a00c2).
 * Swap the old value back in to revert.
 *
 * flex-1 is load-bearing. The panel is stretched to match the form's height, and
 * this band is what absorbs the difference - so the leftover collects here, as
 * violet under the copy, rather than as white above the cover.
 */
export default function GetTheBook({ className = "" }) {
  return (
    <div
      className={`relative mt-[18px] flex-1 bg-[#4a0a86] px-[22px] pt-[10px] pb-[52px] text-center sm:px-[30px] sm:pb-[68px] ${className}`}
    >
      {/* Same fine grid as the masthead. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.064)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.064)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      {/* Same grid again, brighter, but masked away from the middle - it only
          shows out at the edges where nothing is set over it. */}
      <span
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "radial-gradient(52% 66% at 50% 46%, transparent 0%, transparent 38%, #000 100%)",
          maskImage:
            "radial-gradient(52% 66% at 50% 46%, transparent 0%, transparent 38%, #000 100%)",
        }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      {/* Sits under the cover, lifting it off the flat violet. Kept soft so it
          doesn't wash the grid out where the two overlap. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(56%_58%_at_50%_34%,rgba(255,255,255,0.13)_0%,transparent_72%)]"
      />

      <div className="relative">
        <Image
          src="/images/book-png.png"
          alt="Frugal Innovation book"
          width={486}
          height={513}
          quality={95}
          sizes="400px"
          className="mx-auto -mt-[86px] h-auto w-[268px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)] sm:-mt-[106px] sm:w-[344px]"
        />

        <h3 className="mt-[26px] text-[32px] leading-[38px] font-extrabold tracking-[-0.015em] text-white">
          Get the Book
        </h3>

        <p className="mx-auto mt-[16px] max-w-[444px] text-[22px] leading-[33px] text-balance text-white/85">
          Sign up and we&rsquo;ll ship straight to you
        </p>
      </div>
    </div>
  );
}
