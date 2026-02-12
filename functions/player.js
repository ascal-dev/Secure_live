export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) return new Response("Forbidden", { status: 403 });

  // Token verified server-side only
  return new Response(`
    <html>
      <body>
        <h3>Secure Player</h3>
        <iframe src="SECURE_IFRAME_SOURCE" allowfullscreen></iframe>
      </body>
    </html>
  `, { headers: { "content-type": "text/html" }});
}
