import React, { useEffect, useRef } from "react";
import useVideoPlayer from "Hooks/useVideoPlayer";
import { joinStyles } from "Utils/dev.js";
import "Stylesheets/VideoPlayer.scss";

const VideoPlayer = ({
  src,
  className,
  onPlayerProgressUpdate,
  isMuted = true,
  isPlaying = false,
}) => {
  const videoPlayerRef = useRef(null);

  const {
    playerState,
    playerErrorName,
    togglePlay,
    updateIsPlaying,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  } = useVideoPlayer(videoPlayerRef);

  const progress = playerState.progress;

  useEffect(() => {
    if (progress) {
      onPlayerProgressUpdate(progress);
    }
  }, [progress]);

  useEffect(() => {
    updateIsPlaying(isPlaying)
  }, [isPlaying])

  const handleOnClick = () => {
    if(playerState.isPlaying) {
      updateIsPlaying(false)
    } else {
      updateIsPlaying(true)
    }
  }

  return (
    <video
      ref={videoPlayerRef}
      onClick={() => handleOnClick()}
      onLoadedMetadata={() => handleOnLoadedMetadata()}
      onTimeUpdate={() => handleOnTimeUpdate()}         
      src={src}
      autoPlay={false}    
      muted={isMuted}        
      preload="auto"
      className={joinStyles(["video-player", className])}      
      // title="ilicibis player"
    />
  );
};

export default VideoPlayer;
