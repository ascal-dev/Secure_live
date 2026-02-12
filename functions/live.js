export async function onRequestGet({ request, env }) {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const data = {
    time: Date.now(),
    source1: "ENCRYPTED_SOURCE_1_DATA",
    source2: "ENCRYPTED_SOURCE_2_DATA"
  };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(env.ENC_SECRET.padEnd(32, "0")),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify(data))
  );

  return new Response(JSON.stringify({
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
    exp: Date.now() + 60000
  }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store"
    }
  });
}
