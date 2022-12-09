import React, { useState, useRef, useEffect } from "react";
import useToggleFullscreen from "Hooks/useToggleFullscreen"
import VideoPlayer from "Components/VideoPlayer";
import {
  VIDEO_ERROR_UI_MESSAGES,
  UNKNOWN_ERROR_UI_MESSAGE,
} from "Constants/constants";
import { joinStyles } from "Utils/dev.js";
import "Stylesheets/RandomVideoPlayer.scss";
import { assert } from "Utils/error.js";

const RandomVideoPlayer = ({ isMuted, isActive=false }) => {
  const [isPlayerOnePlaying, setIsPlayerOnePlaying] = useState(false);
  const [isPlayerTwoPlaying, setIsPlayerTwoPlaying] = useState(false);
  const [playerOnePath, setPlayerOnePath] = useState("");
  const [isPlayerOnePathSet, setIsPlayerOnePathSet] = useState(false);
  const [playerTwoPath, setPlayerTwoPath] = useState("");
  const [isPlayerTwoPathSet, setIsPlayerTwoPathSet] = useState(false);  
  const [activePlayer, setActivePlayer] = useState(1);
  const [videoPaths, setVideoPaths] = useState([]);

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

  const getRandomVideoPath = (paths) => {
    const randomIndex = Math.floor(Math.random() * paths.length);
    const path = paths[randomIndex];
    console.log(path);
    return path;
  };

  const handlePlayerOneProgressUpdate = (progress) => {
    if (progress > 0.5 && !isPlayerTwoPathSet) {
      // start loading the other video when the first is 50% finished
      setPlayerTwoPath(getRandomVideoPath(videoPaths))
      setIsPlayerTwoPathSet(true);
    }
    if (progress >= 1.0 && isPlayerOnePlaying && !isPlayerTwoPlaying) {
      // show the other player     
      console.log("showing player 2");
      setIsPlayerOnePlaying(false);
      setIsPlayerTwoPlaying(true);
      setActivePlayer(2)            
      setIsPlayerTwoPathSet(false);
    }
  };

  const handlePlayerTwoProgressUpdate = (progress) => {
    if (progress > 0.5 && !isPlayerOnePathSet) {
      // start loading the other video when the first is 50% finished      
      setPlayerOnePath(getRandomVideoPath(videoPaths));
      setIsPlayerOnePathSet(true);      
    }
    if (progress >= 1.0 && !isPlayerOnePlaying && isPlayerTwoPlaying) {
      // show the other player           
      console.log("showing player 1");
      setIsPlayerTwoPlaying(false);      
      setIsPlayerOnePlaying(true);
      setActivePlayer(1)
      setIsPlayerOnePathSet(false);      
    }
  };

  const handleOnClick = (event) => {
     if(event.detail == 1) {
      if(activePlayer == 1) {
        setIsPlayerOnePlaying(prevState => !prevState)
      } else {
        setIsPlayerTwoPlaying(prevState => !prevState)
      }
     }
    // set the player to fullscreen on double click     
     if(event.detail == 2) {
      toggleFullscreen()
    }
  }

  useEffect(() => {
    getVideoPaths();
  }, []);

  useEffect(() => {
    // preload the first video when video paths are loaded
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
      <VideoPlayer
        isPlaying={isPlayerOnePlaying}
        isMuted={isMuted}
        className={joinStyles([
          "video-player",
          activePlayer == 1
            ? "video-player-active"
            : "video-player-inactive",
        ])}
        onPlayerProgressUpdate={handlePlayerOneProgressUpdate}
        src={playerOnePath}
      />
      <VideoPlayer
        isPlaying={isPlayerTwoPlaying}
        isMuted={isMuted}
        className={joinStyles([
          "video-player",
          activePlayer == 2
            ? "video-player-active"
            : "video-player-inactive",
        ])}
        onPlayerProgressUpdate={handlePlayerTwoProgressUpdate}
        src={playerTwoPath}
      />
    </div>
  );
};

export default RandomVideoPlayer;
