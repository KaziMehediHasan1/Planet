import { Carousel } from "react-responsive-carousel";
import useArticles from "../../hooks/useArticles/useArticles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SliderCard from "./SliderCard";

const Slider = () => {
  const [articles] = useArticles();
  const data = articles?.filter(article=>article?.status === "Approved");
  
  return <Carousel>
    {data?.map(article=>(
      <SliderCard key={article?._id} article={article}></SliderCard>
    ))}
  </Carousel>;
};

export default Slider;
