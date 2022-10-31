import React, { useEffect, useRef } from "react";
import useVideoPlayer from "Hooks/useVideoPlayer";

const VideoPlayer = ({src,
					  className,
    				  onPlayerProgressUpdate,
					  isActive=false}) => {

  const videoPlayerRef = useRef(null);

  const {
    playerState,
    playerErrorName,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  } = useVideoPlayer(isActive,
  					 videoPlayerRef);

  const { isPlaying, time, progress, speed, isMuted } = playerState;

  useEffect(()=> {
  	if(progress) {
    	onPlayerProgressUpdate(progress)
	}
  }, [progress])

	return (
      <video
          ref={videoPlayerRef}
          src={src}
          preload="auto"
          className={className}
          onLoadedMetadata={()=>handleOnLoadedMetadata()}
          poster=""
          onTimeUpdate={() => handleOnTimeUpdate()}
          title="test"
          muted={true}
        />
	)
}

export default VideoPlayer