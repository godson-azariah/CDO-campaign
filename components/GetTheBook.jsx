import Image from "next/image";

/*
 * Sits flush at the foot of the panel as a full-bleed dark band, and the cover
 * breaks upward out of it into the white space above.
 *
 * That overlap is the hook: an element crossing its own boundary reads as
 * deliberate and pulls the eye far harder than anything sitting neatly inside a
 * box. No tilt, no gradient tricks — just the break and the contrast of a white
 * jacket on deep violet.
 */
export default function GetTheBook() {
  return (
    <div className="relative mt-[26px] bg-[#2c0a78] px-[24px] pt-[12px] pb-[26px] sm:px-[32px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_70%_at_18%_50%,rgba(255,255,255,0.16)_0%,transparent_72%)]"
      />

      <div className="relative flex items-end gap-[18px]">
        <Image
          src="/images/book-png.png"
          alt="Frugal Innovation book"
          width={486}
          height={513}
          quality={95}
          sizes="300px"
          className="-mt-[52px] h-auto w-[172px] shrink-0 drop-shadow-[0_16px_26px_rgba(0,0,0,0.55)] sm:w-[186px]"
        />

        <div className="min-w-0 pb-[2px]">
          <span className="inline-flex items-center gap-[6px] rounded-full bg-green px-[10px] py-[5px] text-[10px] font-extrabold tracking-[0.02em] text-white">
            Free &middot; First 100 only
          </span>

          <h3 className="mt-[11px] text-[23px] leading-[28px] font-extrabold tracking-[-0.015em] text-white">
            Get the Book
          </h3>

          <p className="mt-[8px] text-[14px] leading-[22px] text-white/75">
            Book a conversation and we&rsquo;ll post you{" "}
            <span className="font-bold text-white">Frugal Innovation</span> —
            the book behind the framework.
          </p>
        </div>
      </div>
    </div>
  );
}
