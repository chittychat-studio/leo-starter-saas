export type WaitlistInput = { email: string; name?: string; source?: string };

export type ValidationResult =
  | { ok: true; value: WaitlistInput }
  | { ok: false; error: string; field?: string };

// Practical check: one @, something before it, a dot in the domain, no spaces.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateWaitlist(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Send a JSON body with an email field." };
  }
  const data = body as Record<string, unknown>;

  // Honeypot: real people never fill the hidden "company" field.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return { ok: false, error: "Something looks off with this request.", field: "company" };
  }

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email) return { ok: false, error: "Enter your email address.", field: "email" };
  if (email.length > 254 || !EMAIL.test(email)) {
    return { ok: false, error: "That email address does not look right.", field: "email" };
  }

  const name = typeof data.name === "string" ? data.name.trim().slice(0, 100) : undefined;
  const source = typeof data.source === "string" ? data.source.trim().slice(0, 50) : undefined;

  return { ok: true, value: { email, name: name || undefined, source: source || undefined } };
}
