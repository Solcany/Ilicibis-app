import { useState, useEffect } from "react";
import { handlePromise } from "Utils/promise";

const useVideoPlayer = (videoElementRef) => {
  const [autoplayFinished, setAutoplayFinished] = useState(false);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    time: 0,
    progress: 0.0,
    speed: 1,
    isMuted: true,
  });

  const [currentVideoMetadata, setCurrentVideoMetadata] = useState({
    duration: 0.0,
  });

  const handleOnLoadedMetadata = () => {
    setCurrentVideoMetadata({
      ...currentVideoMetadata,
      duration: videoElementRef.current.duration,
    });
  };

  const handleOnTimeUpdate = () => {
    const time = videoElementRef.current.currentTime;
    const progress = videoElementRef.current.currentTime / videoElementRef.current.duration;
    if (time && progress) {
      setPlayerState({
        ...playerState,
        time,
        progress,
      });
    }
  };

  const setIsPlaying = (isPlaying) => {
    setPlayerState({
      ...playerState,
      isPlaying: isPlaying,
    });
  };

  // WIP: should be wrapped in custom hook
  useEffect(() => {
    // toggle play/pause
    if (playerState.isPlaying && videoElementRef.current.play ) {
      // play video
      let playPromise = videoElementRef.current.play();
      handlePromise(playPromise, () => console.log("video playing"))
    } else {
      // pause it
      videoElementRef.current.pause();
    }
  }, [playerState.isPlaying]);

  return {
    playerState,
    setIsPlaying,    
    handleOnTimeUpdate,
    handleOnLoadedMetadata,
  };
};

export default useVideoPlayer;
