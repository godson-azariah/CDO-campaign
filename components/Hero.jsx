import HeroPhotoWall from "./HeroPhotoWall";

export default function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden">
      <HeroPhotoWall />

      {/*
        With the wall this dense the veil has to be heavy, or the headline
        competes with a dozen faces. Darkest through the middle where the text
        sits, lifting at the corners so the tiles still read.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(72%_62%_at_50%_50%,rgba(15,4,42,0.94)_0%,rgba(15,4,42,0.88)_38%,rgba(15,4,42,0.7)_100%)]"
      />

      <div className="relative z-20 mx-auto max-w-3xl px-5 py-[104px] text-center sm:px-8 sm:py-[132px] xl:py-[152px]">
        <h1 className="mx-auto text-[27px] leading-[1.28] font-extrabold tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_20px_rgba(6,1,24,0.8)] sm:text-[35px] lg:text-[40px]">
          <span className="block">Rising Demand. Tighter Budgets.</span>
          <span className="block text-[#4fd1a5]">
            Frugal Innovation Is the Answer.
          </span>
          <span className="block">Book 30 Minutes to Find Out How.</span>
        </h1>

        <p className="mx-auto mt-[20px] max-w-xl text-[15px] leading-[24px] text-white/85 [text-shadow:0_1px_12px_rgba(6,1,24,0.85)] sm:text-[16px]">
          Backed by Cambridge research, proven at Amgen and IAG.
        </p>
      </div>
    </section>
  );
}
