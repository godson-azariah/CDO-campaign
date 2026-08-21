import Image from "next/image";

export default function FancyAChat() {
  return (
    <section className="bg-brand-gradient relative overflow-hidden text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 py-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-8 lg:px-[50px] lg:py-[38px]">
        <div className="text-center lg:text-left">
          <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.5px]">
            Fancy a chat?
          </h2>
          <p className="mx-auto mt-[18px] max-w-[500px] text-[16px] leading-[24px] text-pretty text-white/90 lg:mx-0 lg:leading-[26px]">
            <span className="lg:hidden">
              We have offices and teams across the USA, UK, Sweden, India and
              Costa Rica for a coffee catchup
            </span>
            <span className="hidden lg:block">
              We have offices and teams across the USA, UK, Sweden, India and
            </span>
            <span className="hidden lg:block">
              Costa Rica for a coffee catchup
            </span>
          </p>
          <a
            href="#conversation-form"
            className="mt-[30px] inline-flex items-center justify-center rounded-full bg-accent px-[26px] py-[12px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark lg:px-[38px] lg:py-[16px] lg:text-[18px]"
          >
            Schedule A Discovery Call
          </a>
        </div>

        <div className="lg:justify-self-end">
          <Image
            src="/images/ignitho-updated-map.svg"
            alt="Ignitho office locations across the USA, UK, Sweden, India and Costa Rica"
            width={900}
            height={420}
            className="mx-auto h-auto w-full max-w-[440px] lg:mx-0 lg:w-[520px] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
