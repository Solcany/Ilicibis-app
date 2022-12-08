import { useState, useContext } from "react";
// import {AppProvider} from "Contexts/AppContext.js"
// import AppContext from "Contexts/AppContext.js"
import ModalCard from "Components/ModalCard";
import Button from "Components/Button";
import Header from "Components/Header";
import RandomVideoPlayer from "Components/RandomVideoPlayer";
import {
  VIDEO_ERROR_UI_MESSAGES,
  UNKNOWN_ERROR_UI_MESSAGE,
} from "Constants/constants";
import "Stylesheets/Reset.scss";
import "Stylesheets/App.scss";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isAppMuted, setIsAppMuted] = useState(true);

  const handleMuteButtonClick = () => {
    setIsModalVisible(false);
    setIsAppMuted(false);
  };

  return (
    <div className="app">
      <section className="ilicibis">
        <ModalCard isVisible={isModalVisible} className="modal-unmute-app">
          {/*<Header className="header">I LICK I CLICK I BITE I SPIT</Header>*/}

          <Button onClick={handleMuteButtonClick}> start </Button>
        </ModalCard>
         <RandomVideoPlayer isActive={!isModalVisible} isMuted={true}/>
      </section>
    </div>
  );
};

export default App;
