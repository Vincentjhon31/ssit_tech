"use client";

import Image from "next/image";

export default function FloatingMarketplace() {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-50 flex flex-col gap-3">
      <a
        href="https://shopee.ph/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Shopee"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#EE4D2D] shadow-lg transition-transform hover:scale-105"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src="/images/shoppee.png"
            alt="Shopee"
            width={40}
            height={40}
            className="object-cover transition-transform duration-200 ease-in-out group-hover:scale-110"
          />
        </div>
      </a>

      <a
        href="https://www.lazada.com.ph/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Lazada"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#0066FF] shadow-lg transition-transform hover:scale-105"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src="/images/lazada.jpg"
            alt="Lazada"
            width={40}
            height={40}
            className="object-cover transition-transform duration-200 ease-in-out group-hover:scale-110"
          />
        </div>
      </a>
    </div>
  );
}
