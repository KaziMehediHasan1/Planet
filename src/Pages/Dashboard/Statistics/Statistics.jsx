import Chart from "react-google-charts";
import useArticles from "../../../hooks/useArticles/useArticles";
import { useEffect, useState } from "react";

const Statistics = () => {
  const [articles] = useArticles();
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const publicationA = [
      ["Publication", "Percentage"],
      ...articles?.filter((item) => [
        item?.publisher === "Tech Decoded",
        item?.length,
      ]),
    ];
    setChartData(publicationA);
  }, []);
  return (
    <div className="text-center">
      <Chart
        chartType="PieChart"
        data={chartData}
        // options={options}
        width={"100%"}
        height={"400px"}
      ></Chart>
    </div>
  );
};

export default Statistics;
