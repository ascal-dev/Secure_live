export async function onRequestGet({ params }) {
  const { event, id } = params;

  // SAFE demo streams (multi-audio, multi-quality)
  const STREAMS = {
    willowbycric: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    prime: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
    tnt: "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd",
    fubo: "https://storage.googleapis.com/shaka-demo-assets/heliocentrism/dash.mpd"
  };

  const streamUrl = STREAMS[id];
  if (!streamUrl) {
    return new Response("Stream not available", { status: 404 });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Live Player</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/shaka-player.ui.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/controls.min.css"/>

<style>
html,body{margin:0;height:100%;background:#000}
video{width:100%;height:100%;object-fit:contain;background:#000}
#wrap{position:fixed;inset:0}
</style>
</head>

<body>
<div id="wrap" data-shaka-player>
  <video id="video" autoplay playsinline></video>
</div>

<script>
(async () => {
  shaka.polyfill.installAll();
  const video = document.getElementById("video");
  const player = new shaka.Player(video);
  const ui = new shaka.ui.Overlay(player, document.body, video);

  ui.configure({
    controlPanelElements: [
      "play_pause",
      "time_and_duration",
      "mute",
      "volume",
      "spacer",
      "language",
      "captions",
      "quality",
      "picture_in_picture",
      "fullscreen"
    ]
  });

  let rot = 0;
  document.addEventListener("keydown", e => {
    if (e.key === "r") {
      rot = (rot + 90) % 360;
      video.style.transform = "rotate(" + rot + "deg)";
    }
    if (e.key === "a") {
      video.style.objectFit =
        video.style.objectFit === "contain" ? "cover" : "contain";
    }
  });

  try {
    await player.load("${streamUrl}");
  } catch (e) {
    alert("Failed to load stream");
  }
})();
</script>
</body>
</html>
`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "no-store" }
  });
}
