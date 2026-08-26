/*
 * A short banner band rather than a full-height hero — the page's job is the
 * form, so the top of it should be a title bar you read in one glance and
 * scroll past. Gradient and grid only - the photo banks were removed.
 */
export default function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden">
      {/* Fine grid, the same texture the rest of the site uses. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.62] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <div className="relative z-20 mx-auto max-w-[1240px] px-5 py-[40px] text-center sm:px-8 sm:py-[48px] lg:py-[54px]">
        {/* Sized off the ignitho.com hero: ~56px, both lines the same. */}
        <h1 className="mx-auto text-[34px] leading-[1.25] font-extrabold tracking-[-0.03em] text-balance text-white sm:text-[46px] lg:text-[56px]">
          <span className="block">
            Leverage Ignitho&rsquo;s Frugal Innovation and
          </span>
          <span className="block text-[#57d7c4]">Do Better With Less</span>
        </h1>

        {/* html has scroll-behavior: smooth, so the jump animates on its own. */}
        <a
          href="#conversation-form"
          className="mt-[22px] inline-flex items-center gap-[9px] rounded-full bg-green px-[30px] py-[13px] text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.75)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[16px]"
        >
          Schedule Now
          <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </section>
  );
}
