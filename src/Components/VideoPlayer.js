import React, { useRef } from "react";
import {VIDEO_ERROR_UI_MESSAGES,UNKNOWN_ERROR_UI_MESSAGE,} from "Constants/constants";
import useVideoPlayer from "hooks/useVideoPlayer";

const ErrorOverlay = ({ error, isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className="">
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

const VideoElement = (props) => {
  const videoElement = useRef(null);

  const {
    src,
    poster,
    width,
    height,
    autoplay,
    title,
    controls,
    preload,
    muted,
    playsInline,
    loop,
    duration,
    framesTotal,
    framerate,
    onLoadedMetadata,
    onLoadedData,
    onTimeUpdate,
    onProgress,
    onCanPlay,
    onCanPlayThrough,
    onSeeked,
    onSeeking,
    onEnded,
    onError,
    onWaiting,
    onLoadStart,
  } = props;

  const {
    playerState,
    playerErrorName,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleOnLoadedMetadata,
  } = useVideoPlayer(videoElement, videoStartTime, videoEndTime);

  const { isPlaying, time, progress, speed, isMuted } = playerState;

  return (
      <div className={styles.videoWrapper}>
        <ErrorOverlay
          isVisible={playerErrorName !== ""}
          error={
            VIDEO_ERROR_UI_MESSAGES[playerErrorName] || UNKNOWN_ERROR_UI_MESSAGE
          }
        />
        <video
          ref={videoElement}
          src={src}
          className={styles.video}
          onLoadedMetadata={handleOnLoadedMetadata}
          poster={poster}
          onTimeUpdate={() => {
            // update this VideoElement component
            handleOnTimeUpdate();
          }}
          autoPlay={autoplay}
          title={title}
        />
      </div>
  );
};

export default VideoElement;
