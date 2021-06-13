import Carousel from "../Carousel/Carousel";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

import "./Main.css";

function Main() {
  return (
    <div className='main'>
      <Carousel />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  );
}

export default Main;
