import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";import Subscribe from "./NewSubscribe/Subscribe";
;

const Home = () => {

  return (
    <div>
      <div>
        <Helmet>
          <title>Planet || Home</title>
        </Helmet>
      </div>
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <Subscribe></Subscribe>
      <Static></Static>
      <Plan></Plan>
      <Question></Question>
    </div>
  );
};

export default Home;
