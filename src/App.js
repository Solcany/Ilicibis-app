import logo from 'logo.svg';
import Header from "Components/Header"
import RandomVideoPlayer from "Components/RandomVideoPlayer"
import {VIDEO_ERROR_UI_MESSAGES,UNKNOWN_ERROR_UI_MESSAGE} from "Constants/constants";
import 'Stylesheets/Reset.scss';
import 'Stylesheets/App.scss';

function App() {
  return (
    <div className="app">
      <Header className="header"/>
      <section className="ilicibis">
        <RandomVideoPlayer/>
      </section>
    </div>
  );
}

export default App;
