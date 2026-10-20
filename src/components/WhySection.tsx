import React from 'react';
import { Reveal } from './Reveal';
import { useT } from '../i18n';

export const WhySection: React.FC = () => {
  const { t } = useT();

  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Asymmetric left: visual contrast between 0x and @username */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            {/* The stressful 0x address block - Reveal */}
            <Reveal className="p-4 sm:p-5 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] space-y-2.5">
              <span className="text-xs font-semibold text-[#5B6577] block">
                {t.why.oldLabel}
              </span>
              <p className="font-mono text-xs sm:text-sm text-[#3B4455] break-all p-3 bg-white rounded-xl border border-[#E5E7EB] select-all">
                0x7a3Fd49A6E941bFc392390Ab9D2C91B48E18c91B
              </p>
              <p className="text-xs text-[#5B6577] leading-relaxed">
                {t.why.oldNote}
              </p>
            </Reveal>

            {/* The effortless Pukico way - Reveal delay 120 */}
            <Reveal delay={120} className="p-4 sm:p-5 rounded-2xl bg-[#EEF4FF] border border-[#DBE6FF] space-y-2.5">
              <span className="text-xs font-semibold text-[#5B6577] block">
                {t.why.newLabel}
              </span>
              <div className="p-3 bg-white rounded-xl border border-[#DBE6FF] flex flex-col gap-0.5">
                <span className="font-bold text-base sm:text-lg text-[#0A0B0D]">@andika</span>
                <span className="text-xs font-mono text-[#5B6577]">
                  {t.why.newNote}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Asymmetric right: the copy - heading+paragraf satu Reveal */}
          <Reveal className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0B0D] tracking-tight">
              {t.why.title}
            </h2>
            <div className="mt-5 space-y-4 text-base sm:text-lg text-[#3B4455] leading-relaxed">
              <p>{t.why.p1}</p>
              <p className="font-medium text-[#0A0B0D]">{t.why.p2}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
