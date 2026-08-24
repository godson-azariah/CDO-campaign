import HeroPhotoWall from "./HeroPhotoWall";

/*
 * A short banner band rather than a full-height hero — the page's job is the
 * form, so the top of it should be a title bar you read in one glance and
 * scroll past. Photos live at the far edges as blended-in wall texture.
 */
export default function Hero() {
  return (
    <section className="hero-wash relative isolate overflow-hidden">
      <HeroPhotoWall />

      {/* Fine grid, the same texture the rest of the site uses. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.5] bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:46px_46px]"
      />

      {/* Keeps the middle dark enough for the headline to sit cleanly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(52%_76%_at_50%_50%,rgba(15,4,42,0.72)_0%,rgba(15,4,42,0.4)_62%,transparent_100%)]"
      />

      <div className="relative z-20 mx-auto max-w-3xl px-5 py-[44px] text-center sm:px-8 sm:py-[54px] lg:py-[62px]">
        {/*
          Two lines and a button in the space three lines and a standfirst used
          to take, so the band keeps its height. The type goes up to fill it -
          fewer words at a larger size, which is the trade a short hero wants.
        */}
        <h1 className="mx-auto text-[26px] leading-[1.2] font-extrabold tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_18px_rgba(6,1,24,0.8)] sm:text-[34px] lg:text-[40px]">
          <span className="block text-[#4fd1a5]">
            Frugal Innovation Is the Answer
          </span>
          <span className="block">Do Better With Less</span>
        </h1>

        {/* html has scroll-behavior: smooth, so the jump animates on its own. */}
        <a
          href="#conversation-form"
          className="mt-[22px] inline-flex items-center gap-[9px] rounded-full bg-green px-[30px] py-[13px] text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.75)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[16px]"
        >
          Sign Up
          <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </section>
  );
}
