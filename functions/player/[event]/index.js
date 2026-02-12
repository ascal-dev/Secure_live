export async function onRequestGet({ params }) {
  const event = params.event;

  const SOURCE_1 =
    "https://matcheslinks-eaa.pages.dev/alternate.json";
  const SOURCE_2 =
    "https://allrounderfuvk.pages.dev/id.json";

  const [s1, s2] = await Promise.all([
    fetch(SOURCE_1).then(r => r.json()).catch(() => ({})),
    fetch(SOURCE_2).then(r => r.json()).catch(() => ({}))
  ]);

  let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Live Channels</title>
<style>
body{background:#000;color:#fff;font-family:system-ui;padding:16px}
h2{margin-top:24px}
a{display:block;margin:8px 0;padding:10px;
background:#111;color:#0f0;text-decoration:none;border-radius:8px}
iframe{width:100%;height:220px;border:0;margin:12px 0;border-radius:12px}
</style>
</head>
<body>
<h1>Live Channels</h1>
`;

  // ---------- SOURCE 1 (LINKS ONLY) ----------
  html += `<h2>Source 1</h2>`;
  for (const groupKey in s1) {
    for (const name in s1[groupKey]) {
      html += `<a href="/play/source1/${groupKey}">▶ ${name}</a>`;
    }
  }

  // ---------- SOURCE 2 (IFRAMES) ----------
  html += `<h2>Source 2</h2>`;
  for (const i of s2?.iframes || []) {
    html += `
      <div>
        <strong>${i.name}</strong>
        <iframe src="${i.iframeSrc}" allowfullscreen></iframe>
      </div>
    `;
  }

  html += `</body></html>`;

  return new Response(html, {
    headers: { "content-type": "text/html" }
  });
}
