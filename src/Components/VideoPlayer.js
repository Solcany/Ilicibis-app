import React, { useEffect, useRef } from "react";
import useVideoPlayer from "Hooks/useVideoPlayer";
import {joinStyles} from "Utils/dev.js"
import "Stylesheets/VideoPlayer.scss"

const VideoPlayer = ({src,
					  className,
    				  onPlayerProgressUpdate,
					  isPlaying=false}) => {

  const videoPlayerRef = useRef(null);

  const {
    playerState,
    playerErrorName,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  } = useVideoPlayer(isPlaying,
  					 videoPlayerRef);

  const progress = playerState.progress;

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
          className={joinStyles(["video-player", className])}
          onLoadedMetadata={()=>handleOnLoadedMetadata()}
          poster=""
          onTimeUpdate={() => handleOnTimeUpdate()}
          title="test"
          muted={true}
        />
	)
}

export default VideoPlayer