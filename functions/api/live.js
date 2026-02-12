export async function onRequestGet({ env }) {
  try {
    const enc = new TextEncoder();

    const SCORE_API =
      "https://crictv.cricketstream745.workers.dev/?url=https://m.cricbuzz.com/api/home";

    const score = await fetch(SCORE_API, {
      headers: { "User-Agent": "Cloudflare-Pages" }
    }).then(r => r.json());

    const match = score?.matches?.[0]?.match?.matchInfo;
    if (!match) {
      return new Response(JSON.stringify({ ok: false }), { status: 200 });
    }

    const payload = {
      key: env.MASTER_KEY,
      seriesName: match.seriesName,
      status: match.status,
      startDate: match.startDate,
      teams: {
        t1: match.team1.teamSName,
        t2: match.team2.teamSName
      },
      ts: Date.now()
    };

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const aesKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(env.AES_SECRET.padEnd(32, "0")),
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      aesKey,
      enc.encode(JSON.stringify(payload))
    );

    return new Response(
      JSON.stringify({
        encrypted: true,
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
      }),
      { headers: { "content-type": "application/json", "cache-control": "no-store" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: true }), { status: 500 });
  }
}
