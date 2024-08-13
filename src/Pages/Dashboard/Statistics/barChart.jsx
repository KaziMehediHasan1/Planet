import useArticles from "../../../hooks/useArticles/useArticles";
import Statistics from "./Statistics";

const barChart = () => {
  const [articles] = useArticles();
  // bar chart..
  // get viewCount, article owner, article title..
  const sexArticle = articles?.slice(0, 6).filter((barA) => barA.viewCount);

  return (
    <div>
      {sexArticle?.map((item) => (
        <Statistics key={item?._id} bar={item?.title}></Statistics>
      ))}
    </div>
  );
};

export default barChart;
