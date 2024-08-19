import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SliderCard from "./SliderCard";
import useAllArticles from "../../hooks/useAllArticles/useAllArticles";

const Slider = () => {

  const [allArticles] = useAllArticles();
  const data = allArticles?.filter((article) => article?.status === "Approved");
  const approvedArticles = data?.filter(
    (article) => article?.status === "Approved"
  );
  const sortedArticles = approvedArticles?.sort((a, b) => b.viewCount - a.viewCount);

  return (
    <Carousel>
      {sortedArticles?.slice(0, 6).map((article) => (
        <SliderCard key={article?._id} article={article}></SliderCard>
      ))}
    </Carousel>
  );
};

export default Slider;
