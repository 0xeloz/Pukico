import React from 'react';
import { Reveal } from './Reveal';

const blocks = [
  {
    title: 'ID permanen.',
    desc: 'Sekali jadi punya kamu, gak ada yang bisa ambil. Gak bisa diganti juga, jadi pilih yang beneran kamu banget.',
  },
  {
    title: 'Konfirmasi dulu, baru kirim.',
    desc: 'Sebelum tanda tangan, kamu liat siapa penerimanya, berapa jumlahnya, dan berapa biaya gasnya.',
  },
  {
    title: 'Status apa adanya.',
    desc: 'Masih diproses ya ditulis diproses. Gagal ya ditulis gagal. Kami gak bilang sukses sebelum beneran sukses di blockchain.',
  },
];

export const DifferentiatorSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0B0D] tracking-tight">
            Yang bikin beda
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
