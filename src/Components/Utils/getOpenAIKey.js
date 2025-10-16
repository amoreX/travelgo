// Utility to fetch and cache an OpenAI API key from a remote endpoint
// Endpoint: https://quackback-xwhd.onrender.com/tempnihal -> returns { key: '...' }

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
let cached = {
  key: null,
  expiresAt: 0,
  fetching: null,
};

export async function getOpenAIKey() {
  const now = Date.now();
  if (cached.key && cached.expiresAt > now) {
    return cached.key;
  }

  // If a fetch is already in flight, wait for it
  if (cached.fetching) {
    try {
      await cached.fetching;
    } catch (e) {
      // swallow - will try to fetch below
    }
    if (cached.key && cached.expiresAt > Date.now()) return cached.key;
  }

  cached.fetching = (async () => {
    try {
      const res = await fetch("https://quackback-xwhd.onrender.com/tempnihal", {
        method: "GET",
      });
      if (!res.ok) throw new Error(`key fetch failed: ${res.status}`);
      const json = await res.json();
      if (!json || !json.key) throw new Error("no key field in response");
      cached.key = json.key;
      cached.expiresAt = Date.now() + CACHE_TTL_MS;
      return cached.key;
    } finally {
      cached.fetching = null;
    }
  })();

  return cached.fetching;
}

// For tests or manual cache invalidation
export function clearOpenAIKeyCache() {
  cached = { key: null, expiresAt: 0, fetching: null };
}
