import React, { useRef } from "react";
import useVideoPlayer from "Hooks/useVideoPlayer";

const VideoPlayer = ({src}) => {
  const videoPlayerRef = useRef(null);

  const {
    playerState,
    playerErrorName,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  } = useVideoPlayer(videoPlayerRef);

  const { isPlaying, time, progress, speed, isMuted } = playerState;

	return (
      <video
          ref={videoPlayerRef}
          src={src}
          className=""
          onLoadedMetadata={handleOnLoadedMetadata}
          poster=""
          onTimeUpdate={() => {
            // update this VideoElement component
           // handleOnTimeUpdate();
          }}
          autoPlay={true}
          title="test"
          muted={true}
        />
	)
}

export default VideoPlayer