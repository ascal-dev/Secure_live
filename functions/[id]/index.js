export async function onRequestGet({ params, request, env }) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return new Response("Unauthorized", { status: 401 });

  return new Response(
    JSON.stringify({
      playerId: params.id,
      key: env.MASTER_KEY,
      secure: true,
      ts: Date.now()
    }),
    { headers: { "content-type": "application/json" } }
  );
}
