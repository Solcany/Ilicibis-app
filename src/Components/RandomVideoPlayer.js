import VideoPlayer from "Components/VideoPlayer"
import useRandomVideoPlayer from "Hooks/useRandomVideoPlayer";
import {VIDEO_ERROR_UI_MESSAGES,UNKNOWN_ERROR_UI_MESSAGE,} from "Constants/constants";

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

const RandomVideoPlayer = (props) => {

  // const {
  //   src,
  //   poster,
  //   width,
  //   height,
  //   autoplay,
  //   title,
  //   controls,
  //   preload,
  //   muted,
  //   playsInline,
  //   loop,
  //   duration,
  //   framesTotal,
  //   framerate,
  //   onLoadedMetadata,
  //   onLoadedData,
  //   onTimeUpdate,
  //   onProgress,
  //   onCanPlay,
  //   onCanPlayThrough,
  //   onSeeked,
  //   onSeeking,
  //   onEnded,
  //   onError,
  //   onWaiting,
  //   onLoadStart,
  // } = props;

  return (
      <div className="">
{/*        <ErrorOverlay
          isVisible={playerErrorName !== ""}
          error={
            VIDEO_ERROR_UI_MESSAGES[playerErrorName] || UNKNOWN_ERROR_UI_MESSAGE
          }
        />
*/} 
        <VideoPlayer src="/videos/1.mp4"/>
        <VideoPlayer src="/videos/2.mp4"/>

      </div>
  );
};

export default RandomVideoPlayer;
