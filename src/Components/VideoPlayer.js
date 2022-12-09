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
    setIsPlaying,
    handleOnTimeUpdate,
    handleOnLoadedMetadata,
  } = useVideoPlayer(videoPlayerRef);

  const progress = playerState.progress;

  useEffect(() => {
    // pass the video player progress to the parent
    if (progress) {
      onPlayerProgressUpdate(progress);
    }
  }, [progress]);

  useEffect(() => {
    // video player can be controlled via parent
    setIsPlaying(isPlaying)
  }, [isPlaying])

  return (
    <video
      ref={videoPlayerRef}
      onLoadedMetadata={() => handleOnLoadedMetadata()}
      onTimeUpdate={() => handleOnTimeUpdate()}         
      src={src}
      autoPlay={false}    
      muted={isMuted}        
      preload="auto"
      className={joinStyles(["video-player", className])}      
    />
  );
};

export default VideoPlayer;
