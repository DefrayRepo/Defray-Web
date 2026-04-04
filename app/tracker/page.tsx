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

// Badge classes — matches the HTML tracker colour system exactly
const STATUS_BADGE: Record<TrackerItem["status"], string> = {
  done:          "bg-green/10 text-green border border-green/20",
  "in-progress": "bg-accent/10 text-accent border border-accent/20",
  todo:          "bg-surface3 text-text3 border border-border",
  blocked:       "bg-red/10 text-red border border-red/20",
  waiting:       "bg-gold/10 text-gold border border-gold/20",
};

// Priority dot colour
const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red",
  high:     "bg-gold",
  medium:   "bg-accent",
  low:      "bg-text3",
};

// Priority chip classes
const PRIORITY_CHIP: Record<string, string> = {
  critical: "bg-red/10 text-red",
  high:     "bg-gold/10 text-gold",
  medium:   "bg-accent/10 text-accent",
  low:      "bg-surface3 text-text3",
};

const PRIORITY_LABEL: Record<string, string> = {
  critical: "🔴 Critical",
  high:     "🟠 High",
  medium:   "🟡 Medium",
  low:      "🟢 Low",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ items }: { items: TrackerItem[] }) {
  const total = items.length;
  const done  = items.filter((i) => i.status === "done").length;
  const active = items.filter((i) => i.status === "in-progress").length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="mt-3">
      <div className="h-0.75 bg-surface3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--accent), var(--green))",
          }}
        />
      </div>
      <div className="flex gap-3 mt-1.5 flex-wrap">
        <span className="text-xs text-text3">
          <span className="text-text font-medium">{pct}%</span> complete
        </span>
        <span className="text-xs text-text3">
          <span className="text-green font-medium">{done}</span> done
        </span>
        {active > 0 && (
          <span className="text-xs text-text3">
            <span className="text-accent font-medium">{active}</span> in progress
          </span>
        )}
      </div>
    </div>
  );
}

function TaskRow({ item }: { item: TrackerItem }) {
  const isDone = item.status === "done";
  return (
    <li className={`flex items-start gap-3 py-2 px-3 rounded-lg border transition-colors ${
      isDone
        ? "border-transparent bg-transparent opacity-50"
        : "border-border bg-surface2 hover:border-border hover:bg-surface3"
    }`}>
      {/* Priority dot */}
      <span
        className={`mt-1.75 w-1.5 h-1.5 rounded-full shrink-0 ${
          item.priority ? PRIORITY_DOT[item.priority] : "bg-transparent"
        }`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-sm leading-snug ${isDone ? "line-through text-text3" : "text-text"}`}>
            {item.name}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium shrink-0 ${STATUS_BADGE[item.status]}`}>
            {STATUS_LABEL[item.status]}
          </span>
        </div>

        {item.note && (
          <p className="text-xs text-text3 mt-0.5 leading-relaxed">{item.note}</p>
        )}

        {/* Meta row: priority chip + due date */}
        {(item.priority || item.due) && (
          <div className="flex gap-1.5 mt-1.5 flex-wrap items-center">
            {item.priority && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${PRIORITY_CHIP[item.priority]}`}>
                {PRIORITY_LABEL[item.priority]}
              </span>
            )}
            {item.due && (
              <span className="text-[10px] text-gold font-mono">
                Due {item.due}{item.recurring ? ` · every ${item.recurring}` : ""}
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function SectionCard({ section }: { section: TrackerSection }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <h3 className="font-semibold text-base">{section.title}</h3>
        <ProgressBar items={section.items} />
      </div>
      <ul className="p-3 space-y-1.5">
        {section.items.map((item) => (
          <TaskRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TrackerPage() {
  const data = await getTrackerData();

  const allItems  = data?.sections.flatMap((s) => s.items) ?? [];
  const total     = allItems.length;
  const done      = allItems.filter((i) => i.status === "done").length;
  const inProg    = allItems.filter((i) => i.status === "in-progress").length;
  const waiting   = allItems.filter((i) => i.status === "waiting").length;
  const blocked   = allItems.filter((i) => i.status === "blocked").length;
  const overallPct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Ordered pathways: app first, maintenance last
  const pathwayOrder = ["app", "maintenance"];
  const pathways = data
    ? pathwayOrder.filter((p) => data.sections.some((s) => s.pathway === p))
    : [];

  const PATHWAY_LABEL: Record<string, string> = {
    app:         "App development",
    maintenance: "Maintenance",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight flex items-center gap-2.5">
            <span className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
              D
            </span>
            Defray
            <span className="text-text3 font-normal text-sm">build tracker</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-text2 hover:text-text transition-colors"
          >
            &larr; Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">

        {/* Header + overall stats */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-3">
            Overall progress &mdash; last updated {data?.meta.lastUpdated ?? "—"}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 mb-3">
            {[
              { n: total,   label: "total tasks",  color: "" },
              { n: done,    label: "done",         color: "text-green" },
              { n: inProg,  label: "in progress",  color: "text-accent" },
              { n: waiting, label: "waiting",      color: "text-gold" },
              { n: blocked, label: "blocked",      color: "text-red" },
              { n: `${overallPct}%`, label: "complete", color: "" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-surface border border-border rounded-full px-4 py-1.5 flex items-center gap-1.5"
              >
                <span className={`text-sm font-semibold ${s.color || "text-text"}`}>{s.n}</span>
                <span className="text-sm text-text3">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div className="h-0.75 bg-surface3 rounded-full overflow-hidden max-w-full">
            <div
              className="h-full rounded-full"
              style={{
                width: `${overallPct}%`,
                background: "linear-gradient(90deg, var(--accent), var(--green))",
              }}
            />
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

        {/* Pathways */}
        {data &&
          pathways.map((pathway) => {
            const pwSections = data.sections.filter((s) => s.pathway === pathway);
            const pwItems    = pwSections.flatMap((s) => s.items);
            const pwDone     = pwItems.filter((i) => i.status === "done").length;
            const pwPct      = pwItems.length > 0
              ? Math.round((pwDone / pwItems.length) * 100)
              : 0;

            return (
              <div key={pathway} className="mb-12">
                {/* Pathway header card */}
                <div className="bg-surface border border-border rounded-2xl p-5 mb-5">
                  <div className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded inline-block mb-2 ${
                    pathway === "maintenance"
                      ? "bg-gold/10 text-gold"
                      : "bg-accent/10 text-accent"
                  }`}>
                    {pathway === "app" ? "Pathway — App" : "Pathway — Maintenance"}
                  </div>
                  <h2 className="text-lg font-bold mb-1">{PATHWAY_LABEL[pathway]}</h2>
                  <p className="text-sm text-text2 mb-3">
                    {pathway === "app"
                      ? "Supabase · Expo / React Native · Auth · Groups · Virtual card · Launch"
                      : "Credential rotation · Dependency audits · Security patches"}
                  </p>
                  <div className="h-0.75 bg-surface3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pwPct}%`,
                        background: pathway === "maintenance"
                          ? "var(--gold)"
                          : "linear-gradient(90deg, var(--accent), var(--green))",
                      }}
                    />
                  </div>
                  <div className="flex gap-4 mt-2 flex-wrap">
                    <span className="text-xs text-text3">
                      <span className="text-text font-medium">{pwPct}%</span> complete
                    </span>
                    <span className="text-xs text-text3">
                      <span className="text-green font-medium">{pwDone}</span> done
                    </span>
                    {pwItems.filter((i) => i.status === "in-progress").length > 0 && (
                      <span className="text-xs text-text3">
                        <span className="text-accent font-medium">
                          {pwItems.filter((i) => i.status === "in-progress").length}
                        </span>{" "}
                        in progress
                      </span>
                    )}
                    {pwItems.filter((i) => i.status === "blocked").length > 0 && (
                      <span className="text-xs text-text3">
                        <span className="text-red font-medium">
                          {pwItems.filter((i) => i.status === "blocked").length}
                        </span>{" "}
                        blocked
                      </span>
                    )}
                  </div>
                </div>

                {/* Section cards grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {pwSections.map((section) => (
                    <SectionCard key={section.id} section={section} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-text3 text-center">
          &copy; 2026 Defray &middot; This tracker updates automatically on each release &middot; v{data?.meta.version ?? "—"}
        </div>
      </footer>
    </div>
  );
}
