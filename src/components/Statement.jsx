import React from "react";

const Statement = () => {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-16 md:py-32 box-border">

        <h2 className="font-['Syne'] text-[clamp(28px,5vw,64px)] leading-[1.1] tracking-[-0.02em] font-bold uppercase text-white mb-8 md:mb-8 m-0">
          WE REJECT THE NOISE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-[#858383] pt-8 items-start">

          <p className="font-['Geist'] text-[18px] leading-[1.6] font-normal text-[#858383] m-0">
            The modern web is cluttered with ephemeral vanity metrics and decorative
            fluff. VTRC strips away the unnecessary to reveal the core structural
            integrity of your vision.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Precision', value: '100%' },
              { label: 'Clarity', value: 'INFINITE' },
              { label: 'Durability', value: 'ABSOLUTE' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-[#858383] pb-[10px]">
                <span className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.05em] text-white">
                  {label}
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statement;
