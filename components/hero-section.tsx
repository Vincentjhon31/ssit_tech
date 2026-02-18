"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroCarousel } from "@/components/hero-carousel";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const carouselScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const carouselOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content overlay */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pb-12 pt-12 md:px-8 md:pt-14 md:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Copy */}
        <div className="mx-auto mb-8 flex max-w-xl flex-col items-center text-center md:mb-10">
          <motion.h1
            className="text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A modern portal for&nbsp;growing client networks
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-base leading-relaxed text-slate-100 md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Centralize applications, credentials, and approvals in one place —
            smooth for clients, full visibility for your team.
          </motion.p>
          <motion.div
            className="mt-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/credentials/client/login"
                className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
              >
                Get started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#features"
                className="inline-block rounded-full border-2 border-slate-300 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:bg-opacity-10 hover:border-white"
              >
                Learn more
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery Slider */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ scale: carouselScale, opacity: carouselOpacity }}
        >
          <HeroCarousel />
        </motion.div>
      </motion.div>

      {/* Subtle divider */}
      <div className="h-px bg-slate-700" />
    </section>
  );
}
