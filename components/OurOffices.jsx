"use client";

import Image from "next/image";
import { useState } from "react";
import { OFFICE_TABS } from "@/lib/offices";

export default function OurOffices() {
  const [activeId, setActiveId] = useState(OFFICE_TABS[0].id);
  const active = OFFICE_TABS.find((tab) => tab.id === activeId) ?? OFFICE_TABS[0];

  return (
    <section className="trap-section py-[48px] lg:py-[70px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-[38px]">
        <h2 className="text-center text-[30px] leading-[1.3] font-bold text-heading sm:text-[36px] lg:text-[44px] lg:leading-[57.2px]">
          Our Offices
        </h2>

        <div className="mt-[34px]">
          <div className="flex flex-wrap items-center justify-center gap-x-[44px] gap-y-3">
            {OFFICE_TABS.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveId(tab.id)}
                  className={`border-b-2 pb-[10px] text-[19px] transition-colors ${
                    isActive
                      ? "border-violet font-bold text-heading"
                      : "border-transparent font-medium text-muted hover:text-violet"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <ul className="mx-auto mt-[40px] flex max-w-[1320px] flex-wrap justify-center gap-7">
            {active.offices.map((office) => (
              <li
                key={office.name}
                className="w-full max-w-[262px] overflow-hidden rounded-[18px] border border-card-line bg-white shadow-tile transition-all duration-200 hover:-translate-y-[6px] hover:shadow-tile-hover sm:w-[262px]"
              >
                <div className="relative h-[156px] w-full bg-[#e9e2f6]">
                  <Image
                    src={office.photo}
                    alt=""
                    width={560}
                    height={340}
                    sizes="262px"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 42%, rgba(0,0,0,0.68) 100%)",
                    }}
                  />
                  <span className="absolute bottom-[10px] left-[12px] text-[17px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                    {office.city}
                  </span>
                </div>

                <div className="px-[20px] pt-[18px] pb-[22px]">
                  <h3 className="text-[17px] font-bold text-violet">{office.name}</h3>
                  <address className="mt-[10px] text-[15px] leading-[24px] text-muted not-italic">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
