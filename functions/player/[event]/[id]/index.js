export async function onRequestGet({ params, request }) {
  const event = params.event;
  const id = params.id;

  /**
   * IMPORTANT:
   * Resolve ONLY allowed / licensed stream URLs here.
   * Example below is a PUBLIC test stream.
   */
  const STREAM_MAP = {
    test: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
  };

  const streamUrl = STREAM_MAP[id];

  if (!streamUrl) {
    return new Response("Stream not found", { status: 404 });
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Live Player</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/shaka-player.ui.min.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/controls.min.css" crossorigin="anonymous"/>

<style>
html, body {
  margin: 0;
  padding: 0;
  background: #000;
  height: 100%;
}
.video-container {
  position: fixed;
  inset: 0;
}
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
.rotate-90 { transform: rotate(90deg); }
.rotate-180 { transform: rotate(180deg); }
.rotate-270 { transform: rotate(270deg); }
</style>
</head>

<body>
<div class="video-container" data-shaka-player>
  <video id="video" autoplay playsinline></video>
</div>

<script>
(async () => {
  shaka.polyfill.installAll();
  if (!shaka.Player.isBrowserSupported()) {
    alert("Browser not supported");
    return;
  }

  const video = document.getElementById("video");
  const player = new shaka.Player(video);
  const ui = new shaka.ui.Overlay(player, document.body, video);

  ui.configure({
    controlPanelElements: [
      "play_pause",
      "time_and_duration",
      "spacer",
      "mute",
      "volume",
      "language",
      "captions",
      "quality",
      "picture_in_picture",
      "fullscreen"
    ],
    addBigPlayButton: true
  });

  // ---- Streaming config (safe) ----
  player.configure({
    streaming: {
      lowLatencyMode: true,
      bufferingGoal: 15,
      rebufferingGoal: 2
    }
  });

  // ---- Rotation controls ----
  let rotation = 0;
  window.addEventListener("keydown", e => {
    if (e.key === "r") {
      rotation = (rotation + 90) % 360;
      video.style.transform = "rotate(" + rotation + "deg)";
    }
  });

  // ---- Aspect ratio toggle ----
  window.addEventListener("keydown", e => {
    if (e.key === "a") {
      video.style.objectFit =
        video.style.objectFit === "contain" ? "cover" : "contain";
    }
  });

  try {
    await player.load("${streamUrl}");
  } catch (e) {
    console.error("Load error", e);
    alert("Failed to load stream");
  }
})();
</script>

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
