export async function onRequestGet({ env }) {
  const enc = new TextEncoder();

  const payload = {
    key: "Sabse Sasta Live",
    ts: Date.now(),
    channels: {
      t20wc: [
        "Star Sports","JioHotstar","PTV Sports","Willow TV","ICC.tv"
      ],
      ipl: [
        "Star Sports","JioHotstar","Willow TV","SuperSport"
      ]
    }
  };

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(env.AES_SECRET.padEnd(32,"0")),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify(payload))
  );

  return new Response(JSON.stringify({
    iv: [...iv],
    data: [...new Uint8Array(encrypted)]
  }), { headers: { "content-type": "application/json" }});
}
