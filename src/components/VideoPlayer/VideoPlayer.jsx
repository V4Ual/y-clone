import React, { useEffect, useRef } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ videoDetails }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  console.log({videoDetails})

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vjs.zencdn.net/7.2.3/video.js";
    script.onload = () => {
      const videojs = window.videojs;

      // Modify request
      videojs.Hls.xhr.beforeRequest = function (options) {
        let newUri = options.uri.includes(".ts")
          ? options.uri + "?q=test"
          : options.uri;
        return {
          ...options,
          uri: newUri,
        };
      };

      const player = videojs(
        videoRef.current,
        {
          responsive: true,
          fluid: true,
          sources: [
            {
              src: videoDetails.url,
              type: "application/x-mpegURL",
            },
          ],
        },
        () => {
          console.log("Start");

          player.one("loadedmetadata", () => {
            let qualities = player
              .tech({ IWillNotUseThisInPlugins: true })
              .hls.representations();
            console.log("qualities", qualities);
            createButtonsQualities({
              class: "item",
              qualities: qualities,
              father: player.controlBar.el_,
            });

            player.play();
          });

          const audioBtn = document.createElement("div");
          audioBtn.classList.add("audio-toggle", "vjs-icon-volume-high");
          audioBtn.style.color = "white";
          audioBtn.style.fontSize = "18px";
          audioBtn.style.padding = "8px";
          audioBtn.style.cursor = "pointer";
          fullscreen.before(audioBtn);

          let isMuted = false;
          audioBtn.addEventListener("click", () => {
            isMuted = !isMuted;
            player.muted(isMuted);
            audioBtn.className = isMuted
              ? "audio-toggle vjs-icon-volume-mute"
              : "audio-toggle vjs-icon-volume-high";
          });

          function createAutoQualityButton(params) {
            let button = document.createElement("div");
            button.id = "auto";
            button.innerText = `Auto`;
            button.classList.add("selected");
            if (params?.class) button.classList.add(params.class);
            button.addEventListener("click", () => {
              removeSelected(params);
              button.classList.add("selected");
              params.qualities.forEach((q) => q.enabled(true));
            });
            return button;
          }

          function createButtonsQualities(params) {
            if (document.querySelector(".contentMenu")) return;
            let contentMenu = document.createElement("div");
            let menu = document.createElement("div");
            let icon = document.createElement("div");

            let fullscreen = params.father.querySelector(
              ".vjs-fullscreen-control"
            );
            contentMenu.appendChild(icon);
            contentMenu.appendChild(menu);
            fullscreen.before(contentMenu);

            menu.classList.add("menu");
            icon.classList.add("icon", "vjs-icon-cog");
            contentMenu.classList.add("contentMenu");

            const autoButton = createAutoQualityButton(params);
            menu.appendChild(autoButton);

            params.qualities.sort((a, b) => (a.height > b.height ? 1 : 0));

            params.qualities.forEach((quality) => {
              const button = document.createElement("div");
              if (params?.class) button.classList.add(params.class);
              button.id = `${quality.height}`;
              button.innerText = `${quality.height}p`;
              button.addEventListener("click", () => {
                resetQuality(params);
                button.classList.add("selected");
                quality.enabled(true);
              });
              menu.appendChild(button);
            });

            setInterval(() => {
              const auto = document.querySelector("#auto");
              const selectedPlaylist = player
                .tech({ IWillNotUseThisInPlugins: true })
                .hls.selectPlaylist();

              const resolution = selectedPlaylist?.attributes?.RESOLUTION;
              const currentHeight = resolution?.height;

              if (auto) {
                auto.innerHTML = auto.classList.contains("selected")
                  ? `Auto <span class='current'>${currentHeight}p</span>`
                  : "Auto";
              }
            }, 1000);
          }

          function removeSelected(params) {
            document.querySelector("#auto")?.classList.remove("selected");
            [...document.querySelectorAll(`.${params.class}`)].forEach((q) => {
              q.classList.remove("selected");
            });
          }

          function resetQuality(params) {
            removeSelected(params);
            params.qualities.forEach((quality) => quality.enabled(false));
          }
        }
      );
    };
    document.body.appendChild(script);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoDetails]);

  return (
    <div className="container" id="videoContainer">
      <video
        width={"400px"}
        height={"400px"}
        controls
        ref={videoRef}
        // data-setup='{"controlBar": {"volumePanel": {"inline": false}}}'
        className="video-js vjs-default-skin"
      />
    </div>
  );
};

export default VideoPlayer;
