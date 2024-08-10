import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";
import Subscribe from "./NewSubscribe/Subscribe";
import mostView from "./MostViewing/mostView";

const Home = () => {
  return (
    <div className="bg-cyan-100">
      <div>
        <Helmet>
          <title>Planet || Home</title>
        </Helmet>
      </div>
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <mostView></mostView>
      <Subscribe></Subscribe>
      
      <Static></Static>
      <Plan></Plan>
      <Question></Question>
    </div>
  );
};

export default Home;
