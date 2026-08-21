export default function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden">
      <div
        className="dot-grid pointer-events-none absolute top-0 right-0 h-40 w-64 text-white/12"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-16">
        <h1 className="mx-auto max-w-4xl text-[28px] leading-[1.15] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-[38px] lg:text-[44px]">
          Unlock More Value From the Data &amp; AI Investments{" "}
          <span className="text-gradient">You Already Have.</span>
        </h1>
      </div>
    </section>
  );
}
