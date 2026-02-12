export async function onRequestGet({ params }) {
  const type = params.id;

  const CHANNELS = {
    t20wc: [
      "Star Sports", "JioHotstar", "PTV Sports", "A Sports",
      "T Sports", "Nagorik TV", "Sky Sports", "Willow TV",
      "SuperSport", "ICC.tv"
    ],
    ipl: [
      "Star Sports", "JioHotstar", "Sky Sports Cricket",
      "Willow TV", "SuperSport", "YuppTV", "Foxtel"
    ]
  };

  const list = CHANNELS[type] || [];

  let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Live Channels</title>
<style>
body{background:#000;color:#fff;font-family:system-ui;padding:20px}
a{display:block;padding:12px;margin:8px 0;
background:#111;color:#0f0;text-decoration:none;border-radius:8px}
a:hover{background:#222}
</style>
</head>
<body>
<h2>Available Channels</h2>
`;

  for (const ch of list) {
    html += `<a href="#">▶ ${ch}</a>`;
  }

  html += `</body></html>`;

  return new Response(html, {
    headers: { "content-type": "text/html" }
  });
}
