import React, { useState } from "react";
import VideoPlayer from "Components/VideoPlayer"
import useRandomVideoPlayer from "Hooks/useRandomVideoPlayer";
import {VIDEO_ERROR_UI_MESSAGES, UNKNOWN_ERROR_UI_MESSAGE,} from "Constants/constants";
import "Stylesheets/RandomVideoPlayer.scss"
import {joinStyles} from "Utils/dev.js"

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


  const paths = ["/videos/1.mp4", "/videos/3.mp4"]

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


  const getRandomVideoSrc = (srcs) => {
    const randomIndex = Math.floor(Math.random() * srcs.length)
    return paths[randomIndex]
  }

  const [isPlayerOnePlaying, setIsPlayerOnePlaying] = useState(true)
  const [isPlayerTwoPlaying, setIsPlayerTwoPlaying] = useState(false)
  const [playerOneSrc, setPlayerOneSrc] = useState(getRandomVideoSrc(paths))
  const [playerTwoSrc, setPlayerTwoSrc] = useState(getRandomVideoSrc(paths))

  const handlePlayerOneProgressUpdate = (progress) => {
      // if(progress > 0.99 && !isPlayerTwoActive) {
      //   console.log("starting player 2")        
      //   setIsPlayerTwoActive(true)
      // } else if(progress >= 1.0 && isPlayerOneActive) {
      //   setIsPlayerOneActive(false)
      //   setPlayerOneSrc(getRandomVideoSrc(paths))
      // }      
    if(progress >= 1.0 &&
       isPlayerOnePlaying &&
       !isPlayerTwoPlaying) {
        console.log("showing player 2")
        setIsPlayerTwoPlaying(true)      
        setIsPlayerOnePlaying(false)
        setPlayerOneSrc(getRandomVideoSrc(paths))
    }       
  }

  const handlePlayerTwoProgressUpdate = (progress) => {
    // if(progress > 0.99 && 
    //    !isPlayerOneActive) {
    //   console.log("starting player 1")
    //   setIsPlayerOneActive(true)
    if(progress >= 1.0 &&
       !isPlayerOnePlaying &&
       isPlayerTwoPlaying) {
      console.log("showing player 1")
      setIsPlayerOnePlaying(false)    
      setIsPlayerOnePlaying(true)      
      setPlayerTwoSrc(getRandomVideoSrc(paths))
    } 
  }



  return (
      <div className="parent">
{/*        <ErrorOverlay
          isVisible={playerErrorName !== ""}
          error={
            VIDEO_ERROR_UI_MESSAGES[playerErrorName] || UNKNOWN_ERROR_UI_MESSAGE
          }
        />
*/} 

        <VideoPlayer isPlaying={isPlayerOnePlaying} 
                     className={joinStyles(["video-player", (isPlayerOnePlaying ? "video-player-active" : "video-player-inactive")])}
                     onPlayerProgressUpdate={handlePlayerOneProgressUpdate}
                     src={playerOneSrc}/>

        <VideoPlayer isPlaying={isPlayerTwoPlaying} 
                     className={joinStyles(["video-player", (isPlayerTwoPlaying ? "video-player-active" : "video-player-inactive")])}
                     onPlayerProgressUpdate={handlePlayerTwoProgressUpdate}
                     src={playerTwoSrc}/>

      </div>
  );
};

export default RandomVideoPlayer;
