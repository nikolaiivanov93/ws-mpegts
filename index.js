if (mpegts.getFeatureList().mseLivePlayback) {
    var videoElement = document.getElementById('videoElement');
    var player = mpegts.createPlayer({
        type: 'mse',  // could also be mpegts, m2ts, flv
        isLive: true,
        url: 'ws://127.0.0.1:8082'
    });
    player.attachMediaElement(videoElement);
    player.load();
    player.play();
}