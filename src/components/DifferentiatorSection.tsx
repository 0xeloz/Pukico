import React from 'react';
import { Reveal } from './Reveal';
import { useT } from '../i18n';

export const DifferentiatorSection: React.FC = () => {
  const { t } = useT();

  const blocks = [
    {
      title: t.diff.block1Title,
      desc: t.diff.block1Desc,
    },
    {
      title: t.diff.block2Title,
      desc: t.diff.block2Desc,
    },
    {
      title: t.diff.block3Title,
      desc: t.diff.block3Desc,
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0B0D] tracking-tight">
            {t.diff.title}
          </h2>
        </Reveal>

        {/* 3 rows, title on left and description on right (desktop), stacked (mobile), separated by thin line */}
        <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {blocks.map((block, idx) => (
            <Reveal
              key={block.title}
              delay={idx * 70}
              className="py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start"
            >
              <div className="md:col-span-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A0B0D] tracking-tight">
                  {block.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base sm:text-lg text-[#3B4455] leading-relaxed">
                  {block.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
