import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Waitlist storage.
 *
 * Default: a JSON file at data/waitlist.json (fine for local development and for a
 * single server with a writable disk). If WAITLIST_WEBHOOK_URL is set, every new
 * signup is also POSTed to that URL as JSON.
 *
 * To use a real database, replace `saveToFile` below with a call to your store
 * (see "Swap the waitlist store" in README.md). Keep the same return values.
 */

export type Signup = {
  email: string;
  name?: string;
  source?: string;
  createdAt: string;
};

export type SaveResult = "created" | "duplicate";

const DATA_FILE = process.env.WAITLIST_FILE ?? path.join(process.cwd(), "data", "waitlist.json");

// Serialise writes so two requests at the same moment cannot overwrite each other.
let writeQueue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Signup[]> {
  try {
    const raw = await fs.readFile(/*turbopackIgnore: true*/ DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Signup[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function saveToFile(signup: Signup): Promise<SaveResult> {
  const run = async (): Promise<SaveResult> => {
    const all = await readAll();
    if (all.some((s) => s.email === signup.email)) return "duplicate";
    all.push(signup);
    await fs.mkdir(/*turbopackIgnore: true*/ path.dirname(DATA_FILE), { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await fs.writeFile(/*turbopackIgnore: true*/ tmp, JSON.stringify(all, null, 2), "utf8");
    await fs.rename(/*turbopackIgnore: true*/ tmp, /*turbopackIgnore: true*/ DATA_FILE);
    return "created";
  };
  const next = writeQueue.then(run, run);
  writeQueue = next.catch(() => undefined);
  return next;
}

async function forwardToWebhook(signup: Signup, url: string): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "waitlist.signup", ...signup }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
}

/**
 * Store a signup. Succeeds if at least one destination accepted it.
 * Throws if every configured destination failed, so the user sees an error
 * instead of a false "you are on the list".
 */
export async function saveSignup(signup: Signup): Promise<SaveResult> {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  const fileDisabled = process.env.WAITLIST_DISABLE_FILE === "1";

  let fileResult: SaveResult | null = null;
  let fileError: unknown = null;
  if (!fileDisabled) {
    try {
      fileResult = await saveToFile(signup);
    } catch (err) {
      // Read only disks (Vercel, Cloudflare) land here. The webhook can still succeed.
      fileError = err;
    }
  }

  if (fileResult === "duplicate") return "duplicate";

  if (webhook) {
    try {
      await forwardToWebhook(signup, webhook);
      return "created";
    } catch (err) {
      // Saved to the file already, so the signup is not lost. Report and carry on.
      if (fileResult === "created") {
        console.error("[waitlist] webhook failed, kept in file:", err instanceof Error ? err.message : err);
        return "created";
      }
      throw err;
    }
  }

  if (fileResult === "created") return "created";
  throw fileError ?? new Error("No waitlist store is configured. Set WAITLIST_WEBHOOK_URL.");
}
