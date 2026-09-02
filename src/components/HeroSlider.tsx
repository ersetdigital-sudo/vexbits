"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  return (
    <div className="swiper heroSwiper rounded-2xl overflow-hidden shadow-soft">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide className="relative">
          <img src="/images/3d3c860e-b887-4e98-888c-f1778bf9c915.png" alt="Promo top up VEXBITS" className="w-full h-[190px] sm:h-[280px] md:h-[360px] object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A6B]/85 via-[#0B2A6B]/45 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-5 sm:px-8 md:px-12 max-w-[70%] md:max-w-[52%] text-white">
              <span className="badge inline-block px-2.5 py-1 rounded-md bg-[var(--orange)]">Promo Perdana</span>
              <h2 className="mt-3 text-xl sm:text-3xl md:text-[42px] md:leading-[1.1] font-extrabold">Top up 10 detik, langsung masuk.</h2>
              <p className="hidden sm:block mt-2 text-sm md:text-base text-white/85">Diskon 10% untuk transaksi pertamamu di VEXBITS.</p>
              <a href="#games" className="mt-4 inline-flex h-10 md:h-12 items-center px-5 rounded-xl bg-white text-[var(--blue)] text-sm md:text-base font-bold">Top Up Sekarang</a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative">
          <img src="/images/d82140d9-86a9-47ad-8958-e87fbb0e233c.png" alt="Flash sale VEXBITS" className="w-full h-[190px] sm:h-[280px] md:h-[360px] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7A2E00]/80 via-[#7A2E00]/35 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-5 sm:px-8 md:px-12 max-w-[70%] md:max-w-[52%] text-white">
              <span className="badge inline-block px-2.5 py-1 rounded-md bg-white text-[#B33C00]">Flash Sale</span>
              <h2 className="mt-3 text-xl sm:text-3xl md:text-[42px] md:leading-[1.1] font-extrabold">Diskon hingga 25% tiap Jumat.</h2>
              <p className="hidden sm:block mt-2 text-sm md:text-base text-white/85">Kuota terbatas, berlaku untuk 12 game pilihan.</p>
              <a href="#games" className="mt-4 inline-flex h-10 md:h-12 items-center px-5 rounded-xl bg-[#0F1B33] text-white text-sm md:text-base font-bold">Lihat Promo</a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative">
          <img src="/images/0d111326-73ba-4c1e-abb4-63b2556acf1e.png" alt="Pembayaran aman VEXBITS" className="w-full h-[190px] sm:h-[280px] md:h-[360px] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04413F]/80 via-[#04413F]/35 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-5 sm:px-8 md:px-12 max-w-[70%] md:max-w-[52%] text-white">
              <span className="badge inline-block px-2.5 py-1 rounded-md bg-white text-[#04413F]">Aman &amp; Resmi</span>
              <h2 className="mt-3 text-xl sm:text-3xl md:text-[42px] md:leading-[1.1] font-extrabold">40+ metode bayar, semua terverifikasi.</h2>
              <p className="hidden sm:block mt-2 text-sm md:text-base text-white/85">QRIS, e-wallet, transfer bank, hingga minimarket.</p>
              <a href="#kenapa" className="mt-4 inline-flex h-10 md:h-12 items-center px-5 rounded-xl bg-white text-[#04413F] text-sm md:text-base font-bold">Kenapa VEXBITS?</a>
            </div>
          </div>
        </SwiperSlide>

        <div className="hero-pagination swiper-pagination !bottom-3"></div>
      </Swiper>
    </div>
  );
}
