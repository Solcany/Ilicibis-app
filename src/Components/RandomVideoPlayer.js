import React, { useState, useEffect } from "react";
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
  const [playerTwoPath, setPlayerTwoPath] = useState("");
  const [videoPaths, setVideoPaths] = useState([]);

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
    // if(progress > 0.99 && !isPlayerTwoActive) {
    //   console.log("starting player 2")
    //   setIsPlayerTwoActive(true)
    // } else if(progress >= 1.0 && isPlayerOneActive) {
    //   setIsPlayerOneActive(false)
    //   setPlayerOneSrc(getRandomVideoSrc(paths))
    // }
    if (progress >= 1.0 && isPlayerOnePlaying && !isPlayerTwoPlaying) {
      console.log("showing player 2");
      setIsPlayerOnePlaying(false);
      setIsPlayerTwoPlaying(true);
      setPlayerOnePath(getRandomVideoPath(videoPaths));
    }
  };

  const handlePlayerTwoProgressUpdate = (progress) => {
    // if(progress > 0.99 &&
    //    !isPlayerOneActive) {
    //   console.log("starting player 1")
    //   setIsPlayerOneActive(true)
    if (progress >= 1.0 && !isPlayerOnePlaying && isPlayerTwoPlaying) {
      console.log("showing player 1");
      setIsPlayerOnePlaying(true);
      setIsPlayerTwoPlaying(false);
      setPlayerTwoPath(getRandomVideoPath(videoPaths));
    }
  };

  useEffect(() => {
    getVideoPaths();
  }, []);

  useEffect(() => {
    if (videoPaths.length && videoPaths.length > 0) {
      setPlayerOnePath(getRandomVideoPath(videoPaths));
      setPlayerTwoPath(getRandomVideoPath(videoPaths));
    }
  }, [videoPaths]);

  // start the first video
  useEffect(() => {
    console.log("initi")
    if(isActive) {
      console.log("actvie true")

      setIsPlayerOnePlaying(true)
    }
  }, [isActive])

  return (
    <div className="random-video-player">
      {playerOnePath.length > 0 && playerTwoPath.length > 0 && (
        <>
          <VideoPlayer
            isPlaying={isPlayerOnePlaying}
            isMuted={isMuted}
            className={joinStyles([
              "video-player",
              isPlayerOnePlaying
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
              isPlayerTwoPlaying
                ? "video-player-active"
                : "video-player-inactive",
            ])}
            onPlayerProgressUpdate={handlePlayerTwoProgressUpdate}
            src={playerTwoPath}
          />
        </>
      )}
    </div>
  );
};

export default RandomVideoPlayer;
