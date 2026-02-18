import { HeroSection } from "@/components/hero-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans text-zinc-900">
      <HeroSection />

      {/* Features */}
      <section id="features" className="px-6 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-zinc-500 md:text-sm">
            Onboard clients, manage credentials, and stay audit-ready — all
            without spreadsheets or email threads.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Guided applications",
                desc: "Collect the right information the first time with clear steps and document uploads.",
              },
              {
                title: "Live credentials",
                desc: "See expirations, missing documents, and approval status at a glance.",
              },
              {
                title: "Custom workflows",
                desc: "Route applications to the right reviewers and capture a full audit trail.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-100 p-6 transition hover:border-zinc-200 hover:shadow-sm"
              >
                <h3 className="text-sm font-semibold text-zinc-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
