import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Tracker — Defray",
  description:
    "Defray's public development tracker. See what's shipped, what's in progress, and what's coming next.",
};

// Revalidate every hour
export const revalidate = 3600;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrackerItem {
  id: string;
  status: "done" | "in-progress" | "todo" | "blocked" | "waiting";
}

interface TrackerSection {
  id: string;
  pathway: string;
  title: string;
  publicLabel?: string;
  publicDescription?: string;
  items: TrackerItem[];
}

interface TrackerData {
  meta: {
    lastUpdated: string;
    version: string;
    description: string;
  };
  sections: TrackerSection[];
}

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function getTrackerData(): Promise<TrackerData | null> {
  const token = process.env.GITHUB_DEFRAY_APP_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "defray-web",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(
      "https://api.github.com/repos/DefrayRepo/Defray-App/contents/tracker-data.json",
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SECTION_ICON: Record<string, string> = {
  "a-infra":    "⚙️",
  "a-db":       "🗄️",
  "a-auth":     "🔑",
  "a-security": "🛡️",
  "a-groups":   "👥",
  "a-card":     "💳",
  "a-feat":     "✨",
  "a-brand":    "🎨",
  "a-launch":   "🚀",
};

function getSectionPhase(items: TrackerItem[]): {
  label: string;
  style: string;
  dot: string;
} {
  const total  = items.length;
  const done   = items.filter((i) => i.status === "done").length;
  const active = items.filter(
    (i) => i.status === "in-progress" || i.status === "waiting"
  ).length;

  if (total > 0 && done === total)
    return {
      label: "Complete",
      style: "bg-green/10 text-green border-green/20",
      dot:   "bg-green",
    };
  if (done > 0 || active > 0)
    return {
      label: "In progress",
      style: "bg-accent/10 text-accent border-accent/20",
      dot:   "bg-accent",
    };
  return {
    label: "Coming soon",
    style: "bg-surface3 text-text3 border-border",
    dot:   "bg-text3",
  };
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ section }: { section: TrackerSection }) {
  const total  = section.items.length;
  const done   = section.items.filter((i) => i.status === "done").length;
  const active = section.items.filter(
    (i) => i.status === "in-progress" || i.status === "waiting"
  ).length;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
  const phase  = getSectionPhase(section.items);
  const icon   = SECTION_ICON[section.id] ?? "📦";
  const label  = section.publicLabel ?? section.title;
  const desc   = section.publicDescription ?? "";

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{icon}</span>
          <div>
            <h3 className="font-semibold text-base leading-tight">{label}</h3>
            {desc && (
              <p className="text-xs text-text3 mt-0.5 leading-relaxed max-w-xs">
                {desc}
              </p>
            )}
          </div>
        </div>
        {/* Phase badge */}
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${phase.style}`}
        >
          {phase.label}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-1.5 bg-surface3 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${pct}%`,
              background:
                pct === 100
                  ? "var(--green)"
                  : "linear-gradient(90deg, var(--accent), var(--green))",
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex gap-3">
            <span className="text-xs text-text3">
              <span className="text-text font-medium">{done}</span>
              <span> / {total} milestones</span>
            </span>
            {active > 0 && (
              <span className="text-xs text-text3">
                <span className="text-accent font-medium">{active}</span> active
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-text2">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TrackerPage() {
  const data = await getTrackerData();

  // Only show app pathway publicly — filter out maintenance
  const publicSections = (data?.sections ?? []).filter(
    (s) => s.pathway === "app"
  );

  const allItems   = publicSections.flatMap((s) => s.items);
  const total      = allItems.length;
  const done       = allItems.filter((i) => i.status === "done").length;
  const inProg     = allItems.filter(
    (i) => i.status === "in-progress" || i.status === "waiting"
  ).length;
  const overallPct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Derive an overall phase label
  const overallPhase =
    overallPct === 100
      ? "Complete"
      : inProg > 0 || done > 0
      ? "Building"
      : "Planned";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight flex items-center gap-2.5"
          >
            <span className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
              D
            </span>
            Defray
            <span className="text-text3 font-normal text-sm">/ build tracker</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            &larr; Home
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">

        {/* Page hero */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-2">
            Development progress
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            We build in public
          </h1>
          <p className="text-text2 text-base max-w-lg">
            Follow along as Defray takes shape — from infrastructure and
            accounts to the shared card and launch.
          </p>
        </div>

        {!data && (
          <div className="text-center py-24 text-text2">
            <p className="text-lg mb-2">Tracker unavailable</p>
            <p className="text-sm text-text3">
              Could not load tracker data. Check back shortly.
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Overall progress banner */}
            <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-text3 uppercase tracking-widest font-semibold mb-1">
                    Overall — last updated {data.meta.lastUpdated}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">{overallPct}%</span>
                    <span className="text-sm text-text2">complete</span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                        overallPhase === "Complete"
                          ? "bg-green/10 text-green border-green/20"
                          : overallPhase === "Building"
                          ? "bg-accent/10 text-accent border-accent/20"
                          : "bg-surface3 text-text3 border-border"
                      }`}
                    >
                      {overallPhase}
                    </span>
                  </div>
                </div>

                {/* Summary pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: done,   label: "done",        color: "text-green" },
                    { n: inProg, label: "in progress",  color: "text-accent" },
                    { n: total - done - inProg, label: "upcoming", color: "text-text3" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-surface2 border border-border rounded-xl px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <span className={`text-sm font-semibold ${s.color}`}>{s.n}</span>
                      <span className="text-xs text-text3">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall progress bar */}
              <div className="h-2 bg-surface3 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${overallPct}%`,
                    background: "linear-gradient(90deg, var(--accent), var(--green))",
                  }}
                />
              </div>
            </div>

            {/* Section cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {publicSections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </div>

            {/* Footer note */}
            <p className="text-xs text-text3 text-center mt-10">
              Milestones update automatically with each release &middot; v{data.meta.version}
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-4">
          <span className="text-sm text-text3">&copy; 2026 Defray</span>
          <Link href="/" className="text-sm text-text2 hover:text-text transition-colors">
            Back to home &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
