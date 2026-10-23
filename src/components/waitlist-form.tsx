"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { buttonClass } from "./ui/button";
import { Check } from "./icons";

type State =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "done"; message: string }
  | { kind: "error"; message: string };

export function WaitlistForm({ source, tone = "paper" }: { source: string; tone?: "paper" | "panel" }) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });
  const copy = site.waitlist;
  const onPanel = tone === "panel";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState({ kind: "busy" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          source,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: string; error?: string };
      if (res.ok && data.ok) {
        setState({ kind: "done", message: data.status === "duplicate" ? copy.duplicate : copy.success });
      } else {
        setState({ kind: "error", message: data.error ?? copy.errorGeneric });
      }
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Check your connection and try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <div
        role="status"
        data-testid="waitlist-success"
        className={`flex max-w-md items-start gap-3 rounded-2xl px-4 py-3.5 ${onPanel ? "bg-on-panel/10 text-on-panel" : "bg-signal-wash text-ink"}`}
      >
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok text-paper">
          <Check className="size-4" />
        </span>
        <p className="font-medium">{state.message}</p>
      </div>
    );
  }

  const errorId = `${id}-error`;
  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md" aria-describedby={state.kind === "error" ? errorId : undefined}>
      <label htmlFor={`${id}-email`} className={`mb-2 block text-sm font-medium ${onPanel ? "text-on-panel-soft" : "text-ink-soft"}`}>
        {copy.emailLabel}
      </label>
      <div
        className={`flex flex-col gap-2 rounded-[1.4rem] p-1.5 sm:flex-row sm:rounded-full focus-within:ring-2 focus-within:ring-signal ${onPanel ? "bg-on-panel/10" : "border border-rule bg-paper-raised"}`}
      >
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={copy.placeholder}
          aria-invalid={state.kind === "error"}
          className={`min-w-0 flex-1 rounded-full bg-transparent px-4 py-2.5 text-base outline-none focus-visible:outline-none ${onPanel ? "text-on-panel placeholder:text-on-panel-soft" : "placeholder:text-ink-faint"}`}
        />
        {/* Honeypot: hidden from people, tempting to bots. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={state.kind === "busy"} className={buttonClass("primary", "shrink-0")}>
          {state.kind === "busy" ? copy.busy : copy.button}
        </button>
      </div>
      <p
        id={errorId}
        role="alert"
        className={`mt-2 min-h-6 text-sm ${onPanel ? "text-on-panel" : "text-bad"}`}
      >
        {state.kind === "error" ? state.message : ""}
      </p>
    </form>
  );
}
