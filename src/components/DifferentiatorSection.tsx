import React from 'react';

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
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Yang bikin beda
          </h2>
        </div>

        {/* 3 big text blocks (not generic icon cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="flex flex-col justify-start border-t-2 border-[#BAE6FD] pt-6 space-y-3"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                {block.title}
              </h3>
              <p className="text-base text-[#1E293B]/80 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
