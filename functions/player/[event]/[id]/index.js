export async function onRequestGet({ params }) {
  return new Response(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Player</title></head>
<body style="background:#000;color:#fff;font-family:sans-serif">
<h2>Event: ${params.event}</h2>
<h3>Channel ID: ${params.id}</h3>
<p>Source resolved securely.</p>
</body>
</html>`,
    { headers: { "content-type": "text/html" } }
  );
}
