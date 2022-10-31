import logo from 'logo.svg';
import Header from "Components/Header"
import RandomVideoPlayer from "Components/RandomVideoPlayer"
import {VIDEO_ERROR_UI_MESSAGES,UNKNOWN_ERROR_UI_MESSAGE} from "Constants/constants";
import 'Stylesheets/App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <RandomVideoPlayer/>
    </div>
  );
}

export default App;
