import Image from "next/image";

/*
 * Full-bleed dark band at the foot of the panel, with the cover on a line of
 * its own breaking upward out of it into the white space above.
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
 * flex-1 is load-bearing. The panel is stretched to match the form's height, and
 * this band is what absorbs the difference - so the leftover collects here, as
 * violet under the copy, rather than as white above the cover.
 */
export default function GetTheBook({ className = "" }) {
  return (
    <div
      className={`relative mt-[18px] flex-1 bg-[#2c0a78] px-[22px] pt-[10px] pb-[52px] text-center sm:px-[30px] sm:pb-[68px] ${className}`}
    >
      {/* Same fine grid as the masthead. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.064)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.064)_1px,transparent_1px)] bg-[size:56px_56px]"
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

        <p className="mx-auto mt-[12px] max-w-[404px] text-[17px] leading-[28px] text-white/75">
          Book a conversation and we&rsquo;ll post you{" "}
          <span className="font-bold text-white">Frugal Innovation</span> — the
          book behind the framework.
        </p>
      </div>
    </div>
  );
}
