import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">

      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">
            Defray<span className="text-accent">.</span>
          </span>
          <Link
            href="/tracker"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            Build tracker &rarr;
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 gap-8">
        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-text2">
          <span className="w-2 h-2 rounded-full bg-green inline-block animate-pulse" />
          Currently building &mdash; follow our progress
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight max-w-3xl">
          Pay together,{" "}
          <span className="text-accent">effortlessly</span>
        </h1>

        <p className="text-xl text-text2 max-w-xl leading-relaxed">
          Defray is the shared virtual card for groups. Split costs
          automatically, vote on options, and pay as one &mdash; without the awkward IOUs.
        </p>

        <WaitlistForm />

        <p className="text-sm text-text3">No spam. Just a heads-up when we launch.</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 grid sm:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm text-text2 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </section>

      {/* Tracker CTA */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-20">
        <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Watch us build it</h2>
            <p className="text-sm text-text2">
              Our full task tracker is public. See exactly what&apos;s shipped,
              what&apos;s in progress, and what&apos;s coming next.
            </p>
          </div>
          <Link
            href="/tracker"
            className="shrink-0 bg-accent hover:bg-accent/80 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            View tracker
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text3">
          <span>&copy; 2026 Defray. Built in Sydney.</span>
          <Link href="/tracker" className="hover:text-text2 transition-colors">
            Tracker
          </Link>
        </div>
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    icon: "",
    title: "One shared card",
    description:
      "Issue a single virtual card for your whole group. Everyone contributes  one card pays.",
  },
  {
    icon: "",
    title: "Vote on options",
    description:
      "Put choices to a vote before spending. No more arguing over where to eat or what to book.",
  },
  {
    icon: "",
    title: "Automatic splits",
    description:
      "Every tap is split in real time. Settle with the minimum number of transfers at trip end.",
  },
];
