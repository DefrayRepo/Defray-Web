import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Tracker — Defray",
  description:
    "Defray's public development tracker. See what's shipped, what's in progress, and what's coming next.",
};

// Revalidate every hour — tracker-data.json updates on each npm run ship
export const revalidate = 3600;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrackerItem {
  id: string;
  name: string;
  note?: string;
  status: "done" | "in-progress" | "todo" | "blocked" | "waiting";
  due?: string;
  priority?: "critical" | "high" | "medium" | "low";
  recurring?: string;
}

interface TrackerSection {
  id: string;
  pathway: string;
  title: string;
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

const STATUS_LABEL: Record<TrackerItem["status"], string> = {
  done: "Done",
  "in-progress": "In progress",
  todo: "To do",
  blocked: "Blocked",
  waiting: "Waiting",
};

const STATUS_COLOR: Record<TrackerItem["status"], string> = {
  done: "bg-green/10 text-green border-green/20",
  "in-progress": "bg-accent/10 text-accent border-accent/20",
  todo: "bg-surface3 text-text2 border-border",
  blocked: "bg-red/10 text-red border-red/20",
  waiting: "bg-gold/10 text-gold border-gold/20",
};

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red",
  high: "bg-gold",
  medium: "bg-accent",
  low: "bg-text3",
};

function SectionProgress({ items }: { items: TrackerItem[] }) {
  const total = items.length;
  const done = items.filter((i) => i.status === "done").length;
  const inProgress = items.filter((i) => i.status === "in-progress").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3 mt-1">
      <div className="flex-1 h-1.5 bg-surface3 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-text3 shrink-0">
        {done}/{total}
        {inProgress > 0 && (
          <span className="text-accent ml-1">+{inProgress}</span>
        )}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TrackerPage() {
  const data = await getTrackerData();

  // Group sections by pathway
  const pathways = data
    ? Array.from(new Set(data.sections.map((s) => s.pathway)))
    : [];

  const totalTasks = data?.sections.flatMap((s) => s.items).length ?? 0;
  const doneTasks =
    data?.sections
      .flatMap((s) => s.items)
      .filter((i) => i.status === "done").length ?? 0;
  const inProgressTasks =
    data?.sections
      .flatMap((s) => s.items)
      .filter((i) => i.status === "in-progress").length ?? 0;
  const blockedTasks =
    data?.sections
      .flatMap((s) => s.items)
      .filter((i) => i.status === "blocked").length ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Defray<span className="text-accent">.</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            ← Home
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Build tracker</h1>
          <p className="text-text2 mb-6">
            Everything we&apos;re building — publicly tracked. Last updated:{" "}
            <span className="text-text">{data?.meta.lastUpdated ?? "—"}</span>
            {data?.meta.version && (
              <>
                {" "}
                &middot; v
                <span className="text-text">{data.meta.version}</span>
              </>
            )}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total tasks", value: totalTasks, color: "text-text" },
              { label: "Done", value: doneTasks, color: "text-green" },
              {
                label: "In progress",
                value: inProgressTasks,
                color: "text-accent",
              },
              { label: "Blocked", value: blockedTasks, color: "text-red" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface border border-border rounded-xl p-4"
              >
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-text3 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {!data && (
          <div className="text-center py-24 text-text2">
            <p className="text-lg mb-2">Tracker unavailable</p>
            <p className="text-sm text-text3">
              Could not load tracker data. Check back shortly.
            </p>
          </div>
        )}

        {/* Sections by pathway */}
        {data &&
          pathways.map((pathway) => {
            const sections = data.sections.filter(
              (s) => s.pathway === pathway
            );
            return (
              <div key={pathway} className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-text3 mb-5">
                  {pathway === "biz"
                    ? "Business"
                    : pathway === "app"
                    ? "App"
                    : pathway === "maintenance"
                    ? "Maintenance"
                    : pathway}
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="bg-surface border border-border rounded-2xl p-5"
                    >
                      <div className="mb-3">
                        <h3 className="font-semibold">{section.title}</h3>
                        <SectionProgress items={section.items} />
                      </div>

                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item.id} className="flex items-start gap-3">
                            {/* Priority dot */}
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                                item.priority
                                  ? PRIORITY_DOT[item.priority]
                                  : "bg-transparent"
                              }`}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span
                                  className={`text-sm ${
                                    item.status === "done"
                                      ? "text-text3 line-through"
                                      : "text-text"
                                  }`}
                                >
                                  {item.name}
                                </span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                                    STATUS_COLOR[item.status]
                                  }`}
                                >
                                  {STATUS_LABEL[item.status]}
                                </span>
                              </div>
                              {item.note && (
                                <p className="text-xs text-text3 mt-0.5 leading-relaxed">
                                  {item.note}
                                </p>
                              )}
                              {item.due && (
                                <p className="text-xs text-gold mt-0.5">
                                  Due {item.due}
                                  {item.recurring && ` · every ${item.recurring}`}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-text3 text-center">
          &copy; 2026 Defray. This tracker updates automatically on each release.
        </div>
      </footer>
    </div>
  );
}
