export async function onRequestGet({ params }) {
  const event = params.event; // t20wc or ipl
  const id = params.id;       // willowbycric, tnt, etc

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live Player</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #000;
      color: #fff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      width: 100%;
      max-width: 420px;
      padding: 24px;
      text-align: center;
      background: #0b0b0b;
      border-radius: 16px;
      box-shadow: 0 0 40px rgba(0,0,0,0.7);
    }

    h1 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #22c55e;
    }

    h2 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .meta {
      font-size: 14px;
      color: #9ca3af;
      margin-bottom: 20px;
    }

    .note {
      font-size: 13px;
      color: #facc15;
      background: #1a1a1a;
      padding: 12px;
      border-radius: 12px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Live Stream</h1>

    <h2>Event: ${event.toUpperCase()}</h2>
    <div class="meta">Channel ID: ${id}</div>

    <div class="note">
      This is a secure player endpoint.<br/>
      Stream source is resolved server-side.
    </div>
  </div>
</body>
</html>
`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}
