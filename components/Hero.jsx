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
        <h1 className="mx-auto text-[24px] leading-[1.26] font-extrabold tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_18px_rgba(6,1,24,0.8)] sm:text-[30px] lg:text-[34px]">
          <span className="block">Rising Demand. Tighter Budgets.</span>
          <span className="block text-[#4fd1a5]">
            Frugal Innovation Is the Answer.
          </span>
          <span className="block">Book 30 Minutes to Find Out How.</span>
        </h1>

        <p className="mx-auto mt-[14px] max-w-xl text-[14px] leading-[22px] text-white/85 [text-shadow:0_1px_12px_rgba(6,1,24,0.85)] sm:text-[15px]">
          Backed by Cambridge research, proven at Amgen and IAG.
        </p>
      </div>
    </section>
  );
}
