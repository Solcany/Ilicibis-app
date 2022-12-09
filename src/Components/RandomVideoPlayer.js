import React, { useState, useEffect } from "react";
import useToggleFullscreen from "Hooks/useToggleFullscreen"
import VideoPlayer from "Components/VideoPlayer";
import { joinStyles } from "Utils/dev.js";
import "Stylesheets/RandomVideoPlayer.scss";

const RandomVideoPlayer = ({ isMuted, isActive=false }) => {
  const [isPlayerOnePlaying, setIsPlayerOnePlaying] = useState(false);
  const [isPlayerTwoPlaying, setIsPlayerTwoPlaying] = useState(false);
  const [playerOnePath, setPlayerOnePath] = useState("");
  const [isPlayerOnePathSet, setIsPlayerOnePathSet] = useState(false);
  const [playerTwoPath, setPlayerTwoPath] = useState("");
  const [isPlayerTwoPathSet, setIsPlayerTwoPathSet] = useState(false);  
  const [activePlayer, setActivePlayer] = useState(1);
  const [videoPaths, setVideoPaths] = useState([]);
  const [videoFormat, setVideoFormat] = useState("");

  const {fullscreenRef, toggleFullscreen} = useToggleFullscreen()

  const getVideoPaths = () => {
    fetch("data/videos.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setVideoPaths(json.videos);
      });
  };
 
  const getRandomVideoPath = () => {
    const randomIndex = Math.floor(Math.random() * videoPaths.length);
    const srcs = videoPaths[randomIndex];
    if(videoFormat === "webm") {
      return srcs[0] 
    } else {
      return srcs[1]
    }
  };

  const handleOnPlayerOneProgressUpdate = (progress) => {
    // start loading the other video when the first is 50% finished
    if (progress > 0.5 && !isPlayerTwoPathSet) {
      // set the src path to preload the other player's video      
      setPlayerTwoPath(getRandomVideoPath())
      setIsPlayerTwoPathSet(true);
    }
    // show the other video player when this player's video is finished
    if (progress >= 1.0 && isPlayerOnePlaying && !isPlayerTwoPlaying) {
      console.log("showing player 2");
      // pause this video player
      setIsPlayerOnePlaying(false);
      // start the other one
      setIsPlayerTwoPlaying(true);
      // keep track of which player is currently active
      setActivePlayer(2)
      // keep track whether this player has video src set
      setIsPlayerTwoPathSet(false);
    }
  };

  const handleOnPlayerTwoProgressUpdate = (progress) => {
    // start loading the other video when the first is 50% finished    
    if (progress > 0.5 && !isPlayerOnePathSet) {
      // set the src path to preload the other player's video      
      setPlayerOnePath(getRandomVideoPath());
      setIsPlayerOnePathSet(true);      
    }
    // show the other video player when this player's video is finished    
    if (progress >= 1.0 && !isPlayerOnePlaying && isPlayerTwoPlaying) {
      console.log("showing player 1");
      // pause this video player      
      setIsPlayerTwoPlaying(false);  
      // start the other one          
      setIsPlayerOnePlaying(true);
      // keep track of which player is currently active      
      setActivePlayer(1)
      // keep track whether this player has video src set
      setIsPlayerOnePathSet(false);      
    }
  };

  const handleOnSelectedVideoFormat = (format) => {
    setVideoFormat(format)
  }

  const handleOnClick = (event) => {
     // toggle play/pause of the active video player on single click
     if(event.detail === 1) {
      if(activePlayer === 1) {
        setIsPlayerOnePlaying(prevState => !prevState)
      } else {
        setIsPlayerTwoPlaying(prevState => !prevState)
      }
     }
    // toggle fullscreen on double click     
     if(event.detail === 2) {
      toggleFullscreen()
    }
  }

  useEffect(() => {
    // get videos srcs on this component's render
    getVideoPaths();
  }, []);

  useEffect(() => {
    // preload the first video when the videos srcs are loaded
    if (videoPaths.length && videoPaths.length > 0) {
      setPlayerOnePath(getRandomVideoPath(videoPaths));
    }
  }, [videoPaths]);

  useEffect(() => {
  // play the first video when this component is activated by parent 
    if(isActive) {
      setIsPlayerOnePlaying(true)
    }
  }, [isActive])

  return (
    <div 
      className="random-video-player"
      ref={fullscreenRef}
      onClick={(e) => handleOnClick(e)}>
      {/* player 1 */}
      <VideoPlayer
        isPlaying={isPlayerOnePlaying}
        isMuted={isMuted}
        className={joinStyles([
          "video-player",
          activePlayer === 1
            ? "video-player-active"
            : "video-player-inactive",
        ])}
        onPlayerProgressUpdate={handleOnPlayerOneProgressUpdate}
        onSelectedVideoFormat={handleOnSelectedVideoFormat}
        src={playerOnePath}
      />
      {/* player 2 */}      
      <VideoPlayer
        isPlaying={isPlayerTwoPlaying}
        isMuted={isMuted}
        className={joinStyles([
          "video-player",
          activePlayer === 2
            ? "video-player-active"
            : "video-player-inactive",
        ])}
        onPlayerProgressUpdate={handleOnPlayerTwoProgressUpdate}
        src={playerTwoPath}
      />
    </div>
  );
};

export default RandomVideoPlayer;
