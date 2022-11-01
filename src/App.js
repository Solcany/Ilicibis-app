import {useState} from 'react';
import {AppProvider} from "Contexts/AppContext.js"
import ModalCard from "Components/ModalCard"
import Button from "Components/Button";
import Header from "Components/Header"
import RandomVideoPlayer from "Components/RandomVideoPlayer"
import {VIDEO_ERROR_UI_MESSAGES,UNKNOWN_ERROR_UI_MESSAGE} from "Constants/constants";
import 'Stylesheets/Reset.scss';
import 'Stylesheets/App.scss';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)

  const handleMuteButtonClick = () => {
    setIsModalVisible(false)
  }

  return (
    <AppProvider>
      <div className="app">
        <ModalCard isVisible={isModalVisible}>
          <Button onClick={handleMuteButtonClick}> Watch </Button>
        </ModalCard>
        <Header className="header"/>
        <section className="ilicibis">
          <RandomVideoPlayer/>
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
