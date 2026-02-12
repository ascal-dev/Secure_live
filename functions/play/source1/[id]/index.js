export async function onRequestGet({ params }) {
  return new Response(
    `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Player</title>
</head>
<body style="background:#000;color:#fff;font-family:sans-serif">
<h2>Source-1 Player</h2>
<p>Channel ID: ${params.id}</p>
<p>This player is protected and loaded server-side.</p>
</body>
</html>
`,
    { headers: { "content-type": "text/html" } }
  );
}
