import React, { useEffect, useRef } from "react";
import useVideoPlayer from "Hooks/useVideoPlayer";
import { joinStyles } from "Utils/dev.js";
import "Stylesheets/VideoPlayer.scss";

const VideoPlayer = ({
  onPlayerProgressUpdate,
  onSelectedVideoFormat, 
  src,
  className,
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

  const selectVideoFormat = () => {
    // select video src with appropriate video format
    if(onSelectedVideoFormat && videoPlayerRef.current) {
      // prioritize webm
      if(videoPlayerRef.current.canPlayType('video/webm')) {
        // webm
        onSelectedVideoFormat("webm")
      } else {
        // mp4
        onSelectedVideoFormat("mp4")
      }
    }
  }

  useEffect(() => {
    // pass the video player progress to the parent
    if (progress) {
      onPlayerProgressUpdate(progress);
    }
  }, [progress]);

  useEffect(() => {
    // control play/pause via parent
    setIsPlaying(isPlaying)
  }, [isPlaying])

  useEffect(() => {
    selectVideoFormat()
  },[])


  return (
    <video
      ref={videoPlayerRef}
      onLoadedMetadata={() => handleOnLoadedMetadata()}
      onTimeUpdate={() => handleOnTimeUpdate()}         
      autoPlay={false}    
      muted={isMuted}        
      preload="auto"
      className={joinStyles(["video-player", className])}
      src={src}/>
  );
};

export default VideoPlayer;
