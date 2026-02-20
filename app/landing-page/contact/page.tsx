"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Users,
  MessageSquare,
  Clock,
  Globe,
  Headphones,
  ArrowRight,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const ClientLocationMap = dynamic(
  () => import("@/components/map/location-map").then((m) => ({ default: m.LocationMap })),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-foreground lg:pb-0">
      {/* ====== Breadcrumb ====== */}
      <div className="border-b border-zinc-100 bg-zinc-50/60">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-6 py-3 text-xs text-zinc-400 md:px-10">
          <Link href="/" className="transition-colors hover:text-zinc-600">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-zinc-700">Contact Us</span>
        </div>
      </div>

      {/* ====== Page header card ====== */}
      <section className="bg-white px-6 pt-8 pb-0 md:px-10 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-8 md:px-10 md:py-10"
          >
            <div className="relative z-10">
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Get In Touch
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                Have questions about our products or services? Our team is here
                to help. Reach out and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Animated floating icons */}
            <div className="pointer-events-none absolute right-2 top-0 bottom-0 hidden w-72 items-center md:flex lg:right-6 lg:w-96">
              {[
                { Icon: Mail, x: 0, y: -35, delay: 0, size: "h-6 w-6" },
                { Icon: Phone, x: 70, y: 10, delay: 0.15, size: "h-5 w-5" },
                { Icon: Globe, x: 25, y: 40, delay: 0.3, size: "h-5 w-5" },
                { Icon: MessageSquare, x: 120, y: -20, delay: 0.45, size: "h-5 w-5" },
                { Icon: Clock, x: 160, y: 30, delay: 0.6, size: "h-6 w-6" },
                { Icon: Users, x: 50, y: -10, delay: 0.1, size: "h-5 w-5" },
                { Icon: Headphones, x: 200, y: -30, delay: 0.25, size: "h-5 w-5" },
                { Icon: MapPin, x: 95, y: 50, delay: 0.5, size: "h-5 w-5" },
                { Icon: Send, x: 230, y: 15, delay: 0.7, size: "h-5 w-5" },
                { Icon: Zap, x: 170, y: -5, delay: 0.35, size: "h-5 w-5" },
                { Icon: Shield, x: 140, y: 55, delay: 0.55, size: "h-5 w-5" },
                { Icon: Award, x: 250, y: -15, delay: 0.8, size: "h-5 w-5" },
              ].map(({ Icon, x, y, delay, size }, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{
                    opacity: [0.35, 0.55, 0.35],
                    y: [y, y - 8, y + 8, y],
                    scale: [1, 1.05, 0.97, 1],
                  }}
                  transition={{
                    delay,
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute"
                  style={{ left: x, top: `calc(50% + ${y}px)` }}
                >
                  <Icon className={`${size} text-white/60 drop-shadow-lg`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== Contact info + form ====== */}
      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Contact info cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "benjfrancis2@gmail.com",
                  href: "mailto:benjfrancis2@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+63 927 685 7896",
                  href: "tel:+639276857896",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Instruccion Street, Sampaloc Manila",
                  href: null,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Mon-Fri, 9AM - 6PM",
                  href: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                    <item.icon className="h-5 w-5 text-zinc-600" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-zinc-700">
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-6 text-xl font-bold text-zinc-900 md:text-2xl">
                  Send us a message
                </h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-zinc-700"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 transition-all focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-zinc-700"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 transition-all focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-2 block text-sm font-semibold text-zinc-700"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="What is this about?"
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 transition-all focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-semibold text-zinc-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 transition-all focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800"
                  >
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== Map ====== */}
      <section className="border-t border-zinc-100 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 md:text-3xl">
              Find Our Location
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-white/80 shadow-sm p-0 overflow-hidden">
              <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
                <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
                  <ClientLocationMap
                    longitude={120.9952}
                    latitude={14.6157}
                    className="w-full h-64 md:h-80 lg:h-72 xl:h-80"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="mb-4 text-lg font-semibold text-zinc-800">Our Branches</h3>
                  <ul className="space-y-4 text-sm text-zinc-700">
                    <li>
                      <span className="font-bold">Main Branch:</span> 123 Main St, City, Country
                    </li>
                    <li>
                      <span className="font-bold">North Branch:</span> 456 North Ave, City, Country
                    </li>
                    <li>
                      <span className="font-bold">South Branch:</span> 789 South Rd, City, Country
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== FAQ / Trust ====== */}
      <section className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
              Why reach out to SSIT Tech?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
              We&apos;re committed to providing fast, helpful support for all your
              technology and sourcing needs.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Headphones,
                title: "Expert Support",
                desc: "Our team has deep knowledge of networking, surveillance, and communication equipment.",
              },
              {
                icon: Zap,
                title: "Fast Response",
                desc: "We aim to get back to you within 24 hours with answers and recommendations.",
              },
              {
                icon: Globe,
                title: "Wide Reach",
                desc: "Serving customers across the region with reliable delivery and logistics.",
              },
              {
                icon: Award,
                title: "Trusted Partner",
                desc: "200+ satisfied clients trust us for their technology needs.",
              },
              {
                icon: Shield,
                title: "Quality Assured",
                desc: "Every product recommendation comes from our rigorous vetting process.",
              },
              {
                icon: Users,
                title: "Personal Touch",
                desc: "We treat every inquiry with attention and care to find the best solution.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                  <item.icon className="h-5 w-5 text-zinc-600" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-zinc-800">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-zinc-900 px-6 py-16 md:px-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Can&apos;t wait to connect?
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">
            Call us directly at +63 927 685 7896 or email benjfrancis2@gmail.com
            — we&apos;re ready to help.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/landing-page/products"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100"
            >
              Browse Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/landing-page/about"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800"
            >
              Learn About Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
