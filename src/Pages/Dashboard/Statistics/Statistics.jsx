import Chart from "react-google-charts";
import useArticles from "../../../hooks/useArticles/useArticles";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Statistics = () => {
  const [articles] = useArticles();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 500,
    });
  }, []);

  // pei chart..
  const publisherA = articles?.filter(
    (itemA) => itemA?.publisher === "Tech Decoded"
  );
  const publisherB = articles?.filter(
    (itemB) => itemB?.publisher === "IndiaTv"
  );
  const publisherC = articles?.filter(
    (itemC) => itemC?.publisher === "The Essential List"
  );
  const publisherD = articles?.filter(
    (itemD) => itemD?.publisher === "Future Earth"
  );
  const publisherE = articles?.filter(
    (itemE) => itemE?.publisher === "US Election Unspun"
  );

  // pei chart..

  const data = [
    ["Publisher", "Number of Articles"],
    ["Tech Decoded", publisherA?.length],
    ["IndiaTv", publisherB?.length],
    ["The Essential List", publisherC?.length],
    ["Future Earth", publisherD?.length],
    ["US Election Unspun", publisherE?.length],
  ];

  const options = {
    title: "Article Distribution by Publisher",
    titleTextStyle: {
      color: "#2c3e50",
      fontName: "Arial",
      fontSize: 24,
      bold: true,
      italic: false,
    },

    is3D: true,
    pieHole: 0.4,
    colors: ["#8e44ad", "#3498db", "#e74c3c", "#f1c40f", "#2ecc71"],
    fontName: "Arial",
    fontSize: 16,
    legend: {
      position: "left",
      textStyle: { color: "blue", fontSize: 16 },
    },
    chartArea: {
      left: 100,
      top: 100,
      width: "90%",
      height: "75%",
    },
    slices: {
      0: { offset: 0.1 },
      1: { offset: 0.1 },
      3: { offset: 0.1 },
    },
  };

  // bar chart..
  // get viewCount, article owner, article title..
  const sexArticle = articles?.slice(0, 6)?.filter((barA) => barA?.viewCount);
  const filter = [
    ["article", "author", "views"],
    ...sexArticle?.map((item) => [item?.title, item?.owner, item?.viewCount]),
  ];
  const options2 = {
    title: "Article Views",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Views",
      minValue: 0,
    },
    vAxis: {
      title: "Article Title",
      textStyle: { color: "#000", fontSize: 12 },
    },
    bars: "vertical",
    color: "#1c91c0",
    backgroundColor: "#f1f8e9",
    height: 400,
    width: "100%",
    legend: { position: "left", alignment: "center" },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 12,
        auraColor: "none",
        color: "#555",
      },
    },
  };

  return (
    <div data-aos="fade-up"
    data-aos-anchor-placement="top-bottom">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      ></Chart>
      {/* bar chart , who is add this most article and  */}
      <div className="mt-16 ml-20 p-4">
        <h1 className="text-center text-xl font-semibold mb-8 text-green-600">
          Top-Viewed Article
        </h1>
        <Chart
          chartType="Bar"
          data={filter}
          options={options2}
          width={"100%"}
          height={"400px"}
        ></Chart>
      </div>
    </div>
  );
};

export default Statistics;
