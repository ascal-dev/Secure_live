export async function onRequestGet({ params, request }) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(
    `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Secure Player</title>
</head>
<body style="background:#000;color:#fff;font-family:sans-serif">
<h2>Secure Player</h2>
<p>Channel ID: ${params.id}</p>
<p>Protected by JWT + Cloudflare</p>
</body>
</html>`,
    { headers: { "content-type": "text/html" } }
  );
}
