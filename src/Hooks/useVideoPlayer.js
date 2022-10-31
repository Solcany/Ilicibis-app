import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement, videoStartTime, videoEndTime) => {
  const [autoplayFinished, setAutoplayFinished] = useState(false);
  const [playerErrorName, setPlayerErrorName] = useState("");
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    time: 0,
    progress: 0.0,
    speed: 1,
    isMuted: isAppMuted,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const setVideoTime = (time) => {
    videoElement.current.currentTime = time;
    const progress = time / videoElement.current.duration;

    setPlayerState({
      ...playerState,
      time: time,
      progress: progress,
    });
  };

  const handleOnLoadedMetadata = () => {
    setVideoTime(videoStartTime);
  };

  const isVideoEnded = (endTime) => {
    const currentTime = videoElement.current.currentTime;
    if (currentTime >= endTime) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnTimeUpdate = () => {
    const time = videoElement.current.currentTime;
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 1000;

    /* Pause the autoplayed video when clip is over,
      if the video isn't a clip play the whole video */
    if (
      videoEndTime > 0 && // does video have end time?
      !autoplayFinished && // has the clip segment of the video been played already?
      isVideoEnded(videoEndTime) // has the EndTime of the video been reached?
    ) {
      setPlayerState({
        ...playerState,
        isPlaying: false,
        time,
        progress,
      });
      // clip video will be autoplayed and paused only once
      setAutoplayFinished(true);
      // if the video isn't a clip autoplay it in its entirety
    } else {
      setPlayerState({
        ...playerState,
        time,
        progress,
      });
    }
  };

  const handleVideoProgress = (progress) => {
    const time = videoElement.current.currentTime;
    const manualChange = Number(progress);
    videoElement.current.currentTime =
      (videoElement.current.duration / 1000) * manualChange;
    setPlayerState({
      ...playerState,
      time,
      progress: manualChange,
    });
  };

  // const handleVideoSpeed = (event) => {
  //   const speed = Number(event.target.value);
  //   videoElement.current.playbackRate = speed;
  //   setPlayerState({
  //     ...playerState,
  //     speed,
  //   });
  // };

  useEffect(() => {
    // is video player initialized?
    if (videoElement.current.play) {
      if (playerState.isPlaying) {
        // play video
        let playPromise = videoElement.current.play();
        // is promise supported?
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // video is playing
              setPlayerErrorName("");
            })
            .catch(function (error) {
              //console.log(error.message)
              setPlayerErrorName(error.name);
            });
        }
      } else {
        videoElement.current.pause();
      }
    }
  }, [playerState.isPlaying, videoElement]);

  useEffect(() => {
    if (videoElement.current) {
      if (playerState.isMuted) {
        videoElement.current.muted = true;
      } else {
        videoElement.current.muted = false;
      }
    }
  }, [playerState.isMuted, videoElement]);

  useEffect(() => {
    setPlayerState({
      ...playerState,
      isMuted: isAppMuted,
    });
  }, [isAppMuted]);

  return {
    playerState,
    playerErrorName,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  };
};

export default useVideoPlayer;
