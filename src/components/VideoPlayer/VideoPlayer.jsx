import React, { useEffect, useRef, useState } from "react";

// import 'videojs-contrib-quality-levels'
import Player from "@components/ArtPlayer";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";
import Hls from "hls.js";
import artplayerProxyCanvas from "artplayer-proxy-canvas";

const VideoPlayer = ({ videoDetails }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const art = playerRef.current;
      if (art && videoDetails?.url) {
        art.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [videoDetails?.url]);
  if (videoDetails) {
    return (
      <div>
        <Player
          getInstance={(art) => {
            playerRef.current = art;
          }}
          option={{
            container: ".artplayer-app",
            url: videoDetails.url,
            poster: videoDetails.url,
            volume: 0.5,
            autoplay: false,
            autoSize: false,
            screenshot: true,
            setting: true,
            loop: true,
            flip: true,
            pip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: true,
            autoPlayback: true,
            autoOrientation: true,
            thumbnails: {
              url: videoDetails.thumbnail,
              number: 60,
              column: 10,
              scale: 0.85,
            },

            proxy: artplayerProxyCanvas(),
            // container: ".artplayer-app",
            // setting: true,
            // proxy: artplayerProxyCanvas(),
            // url: "http://172.25.31.86:3000/public/videos/yFDxII7dB_k/master.m3u8",
            plugins: [
              artplayerPluginHlsControl({
                quality: {
                  // Show qualitys in control
                  control: true,
                  // Show qualitys in setting
                  setting: true,
                  // Get the quality name from level
                  getName: (level) => level.height + "P",
                  // I18n
                  title: "Quality",
                  auto: "Auto",
                },
                audio: {
                  // Show audios in control
                  control: true,
                  // Show audios in setting
                  setting: true,
                  // Get the audio name from track
                  getName: (track) => track.name,
                  // I18n
                  title: "Audio",
                  auto: "Auto",
                },
              }),
            ],
            customType: {
              m3u8: function playM3u8(video, url, art) {
                if (Hls.isSupported()) {
                  if (art.hls) art.hls.destroy();
                  const hls = new Hls();
                  hls.loadSource(url);
                  hls.attachMedia(video);
                  art.hls = hls;
                  art.on("destroy", () => hls.destroy());
                } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                  video.src = url;
                } else {
                  art.notice.show = "Unsupported playback format: m3u8";
                }
              },
            },
          }}
          style={{
            width: "100%",
            aspectRatio: "16 / 9", // Maintains a 16:9 ratio
            maxHeight: "100vh", // Prevents overflow on small screens
          }}

          // getInstance={(art) => console.log(art)}
        />
      </div>
    );
  }
};

export default VideoPlayer;
