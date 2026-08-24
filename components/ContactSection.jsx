import ConversationForm from "./ConversationForm";
import WhyBookThisCall from "./WhyBookThisCall";

export default function ContactSection() {
  return (
    <section className="trap-section-light py-[40px] sm:py-[48px] lg:py-[76px]">
      {/*
        NOTE: this wrapper must stay. `.trap-section-light > *` forces
        position:relative on every direct child, which would drop the absolute
        glow below into normal flow and push the whole layout down by its height.
      */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 lg:px-[38px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[6%] left-1/2 hidden h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#7a00c2]/[0.07] blur-[120px] lg:block"
        />

        {/* items-stretch + h-full on both cards keeps them exactly the same
            height on desktop; below lg they stack naturally. */}
        <div className="relative mx-auto grid max-w-[1320px] items-stretch gap-6 sm:gap-8 lg:grid-cols-[minmax(0,510px)_minmax(0,1fr)] lg:gap-[40px]">
          {/*
            The form is first in the DOM so it leads on a phone — someone who
            scrolled this far wants to book, not read the pitch again. On desktop
            the order flips back: reasons on the left, form on the right.
          */}
          <div className="h-full lg:order-2">
            <ConversationForm />
          </div>

          <div className="h-full lg:order-1">
            <WhyBookThisCall />
          </div>
        </div>
      </div>
    </section>
  );
}
