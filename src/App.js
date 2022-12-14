import { useState } from "react";
import ModalCard from "Components/ModalCard";
import ButtonCard from "Components/ButtonCard";
import RandomVideoPlayer from "Components/RandomVideoPlayer";
import "Stylesheets/Reset.scss";
import "Stylesheets/App.scss";

const App = () => {
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const handleMuteButtonClick = () => {
    setIsPlayerActive(true);
  };

  return (
    <div className="app">
      <section className="ilicibis">
        <ModalCard isVisible={!isPlayerActive} className="modal-unmute-app">        
          <ButtonCard 
            className="button_card"
            onClick={handleMuteButtonClick}> 
            <div className="content">
              <img className="triangle_img" src="svg/triangle.svg" alt="red triangle with rounded corners"/>
              <img className="logo_img" src="svg/logo.svg" alt="red rectangular logo with vertically arranged white text: I lick I Clik I Bite I Spit"/>
              <img className="triangle_img" src="svg/triangle.svg" alt="red triangle with rounded corners"/>
            </div> 
          </ButtonCard>
        </ModalCard>
         <RandomVideoPlayer isActive={isPlayerActive} isMuted={false}/>
      </section>
    </div>
  );
};

export default App;
