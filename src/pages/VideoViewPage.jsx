import ChannelInfo from "@components/ChannelInfo";
import RecommendedVideos from "@components/RecommendedVideos/RecommendedVideos";
import VideoInfo from "@components/VideoInfo";
import VideoPlayer from "@components/VideoPlayer/VideoPlayer";
import { usePlayVideoHook, useVideoList } from "@hooks/index";
import { formatTime } from "@utils/formate";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const VideoViewPage = () => {
  const { videoDetails } = usePlayVideoHook();
  const { channelVideos, handleVideoWatch } = useVideoList(true);
  const userDetails = useSelector((state) => state.user);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vjs.zencdn.net/7.2.3/video.js";

    script.onload = () => {
      const videojs = window.videojs;

      if (!videoDetails?.url) {
        console.warn("Video URL is missing");
        return;
      }

      videojs.Hls.xhr.beforeRequest = function (options) {
        const newUri = options.uri.includes(".ts")
          ? `${options.uri}?q=test`
          : options.uri;
        return { ...options, uri: newUri };
      };

      const player = videojs(videoRef.current, {
        responsive: true,
        fluid: true,
        sources: [
          {
            src: videoDetails.url,
            type: "application/x-mpegURL",
          },
        ],
      });

      player.on("loadedmetadata", () => {
        const initialTime = player.currentTime();
        if (isFinite(initialTime)) {
          player.currentTime(initialTime);
        } else {
          console.warn("Invalid currentTime on video load", initialTime);
        }

        let qualities = player
          .tech({ IWillNotUseThisInPlugins: true })
          .hls.representations();
        console.log("Available qualities:", qualities);

        createButtonsQualities({
          class: "item",
          qualities: qualities,
          father: player.controlBar.el_,
        });

        player.play().catch((err) => {
          console.error("Error while playing video:", err);
        });
      });

      const audioBtn = document.createElement("div");
      audioBtn.classList.add("audio-toggle", "vjs-icon-volume-high");
      audioBtn.style.color = "white";
      audioBtn.style.fontSize = "18px";
      audioBtn.style.padding = "8px";
      audioBtn.style.cursor = "pointer";

      const fullscreen = player.controlBar.el_.querySelector(
        ".vjs-fullscreen-control"
      );
      fullscreen?.before(audioBtn);

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

        let fullscreen = params.father.querySelector(".vjs-fullscreen-control");
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

      // Cleanup on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    };

    document.body.appendChild(script);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoDetails]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-4">
      <div className="lg:w-2/3">
        <div className="flex flex-col">
          <div className="container" id="videoContainer">
            <video
              width={"400px"}
              height={"400px"}
              controls
              ref={videoRef}
              className="video-js vjs-default-skin"
            />
          </div>

          <VideoInfo
            title={videoDetails?.title}
            views={videoDetails?.views}
            published={formatTime(videoDetails?.createdAt)}
          />
          {/* <VideoActions likes="2.6K" /> */}
          <ChannelInfo channelInfo={userDetails} />
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="flex flex-col gap-6">
          {/* <div className="bg-[#212121] rounded-xl overflow-hidden"></div> */}

          <RecommendedVideos
            handleVideoWatch={handleVideoWatch}
            videos={channelVideos?.data}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoViewPage;
