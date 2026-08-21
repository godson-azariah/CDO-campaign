import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[100px] w-full max-w-[1440px] items-center justify-between px-5 lg:px-[38px]">
        <a
          href="https://www.ignitho.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ignitho home"
          className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
        >
          <Image
            src="/images/ignitho-updated-logo.png"
            alt="Ignitho"
            width={420}
            height={160}
            priority
            className="h-[54px] w-auto object-contain"
          />
        </a>

        <a
          href="https://www.ignitho.com/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-[28px] py-[12px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
