/**
 * Small in-memory rate limiter.
 *
 * Deliberately simple: no database, no Redis, nothing to configure. It counts
 * recent submissions per IP inside one server instance.
 *
 * Caveat worth knowing — on serverless hosting each instance keeps its own
 * counter, and instances get recycled, so a determined attacker spread across
 * many cold starts can exceed the limit. It is a speed bump against someone
 * hammering the form and flooding the DL, not real abuse protection. If that
 * ever becomes a problem, the fix is a real captcha, not a bigger limiter.
 */
const hits = new Map();

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(key) {
  if (!key) return true; // no IP to key on — let it through rather than block everyone

  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 2000) {
    for (const [entryKey, times] of hits) {
      if (!times.some((time) => now - time < WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return true;
}

/** First hop in x-forwarded-for is the client; the rest are proxies. */
export function clientIpFrom(headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || "";
}
