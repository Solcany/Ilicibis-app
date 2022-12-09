import { useRef, useState } from 'react';
import {handlePromise} from "Utils/promise";

const useToggleFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenRef = useRef(null)

  const enterFullscreen = () => {
    if (fullscreenRef.current) {
      if (fullscreenRef.current.requestFullscreen) {
        let promise = fullscreenRef.current.requestFullscreen();
        handlePromise(promise, () => setIsFullscreen(true));
      } else if (fullscreenRef.current.mozRequestFullScreen) {   
        let promise = fullscreenRef.current.mozRequestFullScreen();
        handlePromise(promise, () => setIsFullscreen(true));        
      } else if (fullscreenRef.current.wekitRequestFullscreen) {   
        let promise = fullscreenRef.current.wekitRequestFullscreen();        
        handlePromise(promise, () => setIsFullscreen(true));                
      } else if (fullscreenRef.current.msRequestFullscreen) { 
        fullscreenRef.current.msRequestFullscreen();
      }
    }
  };
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      let promise = document.exitFullscreen();
      handlePromise(promise, () => setIsFullscreen(false));
    } else if (document.mozCancelFullScreen) {
      let promise =  document.mozCancelFullScreen();
      handlePromise(promise, () => setIsFullscreen(false));      
    } else if (document.webkitExitFullscreen) { 
      let promise = document.webkitExitFullscreen();
      handlePromise(promise, () => setIsFullscreen(false));      
    } else if (document.msExitFullscreen) {
      let promise = document.msExitFullscreen();
      handlePromise(promise, () => setIsFullscreen(false));

    }
  };
  const toggleFullscreen = () => {
    isFullscreen ? exitFullscreen() : enterFullscreen()
  }

  return { fullscreenRef, toggleFullscreen };
};

export default useToggleFullscreen