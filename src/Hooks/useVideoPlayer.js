import { useState, useEffect } from "react";

const useVideoPlayer = (isPlaying, videoElement) => {
  const [autoplayFinished, setAutoplayFinished] = useState(false);
  const [playerErrorName, setPlayerErrorName] = useState("");

  const [playerState, setPlayerState] = useState({
    isPlaying: isPlaying,
    time: 0,
    progress: 0.0,
    speed: 1,
    isMuted: true,
  });

  const [currentVideoMetadata, setCurrentVideoMetadata] = useState({
    duration: null,
  });

  // const togglePlay = () => {
  //   setPlayerState({
  //     ...playerState,
  //     isPlaying: !playerState.isPlaying,
  //   });
  // };

  // const setVideoTime = (time) => {
  //   videoElement.current.currentTime = time;
  //   const progress = time / videoElement.current.duration;

  //   setPlayerState({
  //     ...playerState,
  //     time: time,
  //     progress: progress,
  //   });
  // };

  const handleOnLoadedMetadata = () => {
    setCurrentVideoMetadata({
      ...currentVideoMetadata,
      duration: videoElement.current.duration,
    });
  };

  const updateIsPlaying = () => {
    setPlayerState({
      ...playerState,
      isPlaying: isPlaying,
    });
  };

  // const isVideoEnded = (endTime) => {
  //   const currentTime = videoElement.current.currentTime;
  //   if (currentTime >= endTime) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleOnTimeUpdate = () => {
    const time = videoElement.current.currentTime;
    const progress =
      videoElement.current.currentTime / videoElement.current.duration;
    /* Pause the autoplayed video when clip is over,
      if the video isn't a clip play the whole video */
    // if (
    //   videoEndTime > 0 && // does video have end time?
    //   !autoplayFinished && // has the clip segment of the video been played already?
    //   isVideoEnded(videoEndTime) // has the EndTime of the video been reached?
    // ) {
    //   setPlayerState({
    //     ...playerState,
    //     isPlaying: false,
    //     time,
    //     progress,
    //   });
    //   // clip video will be autoplayed and paused only once
    //   setAutoplayFinished(true);
    //   // if the video isn't a clip autoplay it in its entirety
    // } else {

    // if(progress >= 1.0) {
    //   setPlayerState({
    //     ...playerState,
    //     isPlaying: false,
    //     time,
    //     progress,
    //   });
    // } else {

    if (time && progress) {
      setPlayerState({
        ...playerState,
        time,
        progress,
      });
    }
    // }

    // }
  };

  // const handleVideoProgress = (progress) => {
  //   const time = videoElement.current.currentTime;
  //   const manualChange = Number(progress);
  //   videoElement.current.currentTime =
  //     (videoElement.current.duration / 1000) * manualChange;
  //   setPlayerState({
  //     ...playerState,
  //     time,
  //     progress: manualChange,
  //   });
  // };

  // const handleVideoSpeed = (event) => {
  //   const speed = Number(event.target.value);
  //   videoElement.current.playbackRate = speed;
  //   setPlayerState({
  //     ...playerState,
  //     speed,
  //   });
  // };

  useEffect(() => {
    updateIsPlaying();
  }, [isPlaying]);

  useEffect(() => {
    // is video player initialized?
    if (videoElement.current.play && playerState.isPlaying) {
      // console.log("playing")
      // // play video
      // let playPromise = videoElement.current.play();
      // // is promise supported?
      // if (playPromise !== undefined) {
      //   playPromise
      //     .then(() => {
      //       console.log("play success!")
      //       // video is playing
      //       setPlayerErrorName("");
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //       setPlayerErrorName(error.name);
      //     });
      // }
      // } else {
      //videoElement.current.pause();
    }
  }, [playerState.isPlaying]);

  // useEffect(() => {
  //   if (videoElement.current) {
  //     if (playerState.isMuted) {
  //       videoElement.current.muted = true;
  //     } else {
  //       videoElement.current.muted = false;
  //     }
  //   }
  // }, [playerState.isMuted, videoElement]);

  // useEffect(() => {
  //   setPlayerState({
  //     ...playerState,
  //     isMuted: isAppMuted,
  //   });
  // }, [isAppMuted]);

  return {
    playerState,
    // playerErrorName,
    // togglePlay,
    handleOnTimeUpdate,
    // handleVideoProgress,
    handleOnLoadedMetadata,
  };
};

export default useVideoPlayer;
