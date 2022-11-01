import React, { useState } from "react";
import VideoPlayer from "Components/VideoPlayer"
import {VIDEO_ERROR_UI_MESSAGES, UNKNOWN_ERROR_UI_MESSAGE,} from "Constants/constants";
import {joinStyles} from "Utils/dev.js"
import "Stylesheets/RandomVideoPlayer.scss"

const RandomVideoPlayer = (props) => {
  
  const paths = ["/videos/1.mp4"]

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
        setIsPlayerOnePlaying(false)
        setIsPlayerTwoPlaying(true)              
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
      setIsPlayerOnePlaying(true)    
      setIsPlayerTwoPlaying(false)      
      setPlayerTwoSrc(getRandomVideoSrc(paths))
    } 
  }

  return (
      <div className="random-video-player">
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
