import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">

      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-base font-semibold tracking-tight flex items-center gap-2.5">
            <span className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
              D
            </span>
            Defray
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
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 gap-7">
        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-text2">
          <span className="w-2 h-2 rounded-full bg-green inline-block animate-pulse" />
          Currently building &mdash; iOS &amp; Android beta coming June 2026
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight max-w-3xl">
          The group card that{" "}
          <span className="text-accent">does the maths</span>
        </h1>

        <p className="text-lg sm:text-xl text-text2 max-w-lg leading-relaxed">
          One virtual card. Everyone chips in. Every tap is split the moment it
          happens &mdash; no chasing, no spreadsheets, no awkward IOUs at the end of
          the trip.
        </p>

        <WaitlistForm />

        <p className="text-sm text-text3">No spam. Just a heads-up when we launch.</p>
      </section>

      {/* How it works — 3 steps */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-6 text-center">
          How it works
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.title}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="font-semibold text-base">{step.title}</h3>
              <p className="text-sm text-text2 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-6 text-center">
          Everything in one place
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2.5"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-xs text-text2 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof / use cases */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {USE_CASES.map((uc) => (
            <div
              key={uc.label}
              className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2"
            >
              <span className="text-2xl">{uc.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-text3">
                {uc.label}
              </span>
              <p className="text-sm text-text2 leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracker CTA */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-20">
        <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-1.5">Watch us build it</h2>
            <p className="text-sm text-text2 max-w-sm">
              Every task is publicly tracked. See exactly what&apos;s shipped,
              what&apos;s in progress, and what&apos;s blocked &mdash; updated on every release.
            </p>
          </div>
          <Link
            href="/tracker"
            className="shrink-0 bg-accent hover:bg-accent/80 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            View build tracker &rarr;
          </Link>
        </div>
      </section>

      {/* Bottom waitlist */}
      <section className="flex flex-col items-center text-center px-6 pb-24 gap-5">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-xl">
          Be first when we launch
        </h2>
        <p className="text-text2 max-w-sm text-sm leading-relaxed">
          We&apos;re targeting TestFlight in June 2026. Join the waitlist and
          you&apos;ll be first in line.
        </p>
        <WaitlistForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text3">
          <span>&copy; 2026 Defray. Built in Sydney.</span>
          <div className="flex gap-5">
            <Link href="/tracker" className="hover:text-text2 transition-colors">
              Build tracker
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    icon: "👥",
    title: "Create a group",
    description:
      "Set up an event, pick a budget, and invite friends by phone number. Takes under a minute.",
  },
  {
    icon: "💳",
    title: "One card pays",
    description:
      "A shared virtual card is issued for the group. Tap it anywhere Mastercard is accepted.",
  },
  {
    icon: "✅",
    title: "Everyone's settled",
    description:
      "Every tap is split live. At the end, our algorithm minimises transfers — most people owe nothing.",
  },
];

const FEATURES = [
  {
    icon: "💳",
    title: "Shared virtual card",
    description:
      "One Mastercard for the whole group. Accepted anywhere, issued instantly, no physical card needed.",
  },
  {
    icon: "⚡",
    title: "Real-time splits",
    description:
      "Every card tap is split the moment it happens. No manual entry, no end-of-trip surprises.",
  },
  {
    icon: "🗳️",
    title: "Vote on options",
    description:
      "Put a hotel, restaurant, or activity to a group vote — with the price per person shown upfront.",
  },
  {
    icon: "📅",
    title: "Availability polling",
    description:
      "Find dates that work for everyone with a shared availability grid before you lock anything in.",
  },
  {
    icon: "📸",
    title: "Receipt scanner",
    description:
      "Scan a receipt and split it line by line. Each person pays only for what they actually ordered.",
  },
  {
    icon: "📊",
    title: "Budget tracking",
    description:
      "Set a total budget and a per-person cap. Defray tracks spending live and alerts when you're close.",
  },
  {
    icon: "🔔",
    title: "Push notifications",
    description:
      "Get notified the moment someone taps the card, adds an expense, or votes on a group decision.",
  },
  {
    icon: "🏅",
    title: "Organiser score",
    description:
      "A reliability rating for event organisers, built on track record. Know who to trust with the card.",
  },
  {
    icon: "🔒",
    title: "Secure by design",
    description:
      "Jailbreak detection, TLS pinning, and bank-grade token storage. Your money is properly protected.",
  },
];

const USE_CASES = [
  {
    icon: "✈️",
    label: "Group trips",
    description:
      "Flights, hotels, dinners, activities — one card handles it all, splits handled automatically.",
  },
  {
    icon: "🎉",
    label: "Events & parties",
    description:
      "Venues, catering, tickets. Collect contributions upfront so no one's out of pocket.",
  },
  {
    icon: "🏠",
    label: "Shared living",
    description:
      "Groceries, utilities, household supplies. Never argue about whose turn it is to pay.",
  },
];
