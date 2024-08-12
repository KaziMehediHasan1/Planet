import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";
import Subscribe from "./NewSubscribe/Subscribe";
import useArticles from "../../hooks/useArticles/useArticles";
import { NavLink } from "react-router-dom";
import "animate.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
const Home = () => {
  const [articles, isLoading] = useArticles();
  if (isLoading) {
    <p>loading...</p>;
  }

  useEffect(()=>{
    AOS.init({
      duration:1500,
      delay:500,
    })
  },[])
  return (
    <div className="bg-cyan-100">
      <div>
        <Helmet>
          <title>Planet || Home</title>
        </Helmet>
      </div>
      <Slider></Slider>

      <AllPublisher></AllPublisher>

      {/* trending blogs */}
      <div className=" rounded-t-md bg-blue-200">
        <div className="max-w-screen-2xl mx-auto p-20">
          <h1 className="text-2xl  font-bold text-center capitalize lg:text-4xl dark:text-white">
            From the blog
          </h1>
          <section className=" dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
                {articles?.slice(0, 6).map((item) => (
                  <div className=" md:max-w-screen-2xl md:mx-auto " data-aos="fade-right fade-left" >
                    <div className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0">
                      <NavLink
                        to={`/articleDetails/${item?._id}`}
                        className="card bg-base-100 w-96 h-[480px] shadow-xl"
                      >
                        <figure>
                          <img src={item?.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{item?.title}</h2>
                          <p>{item?.Description.slice(0, 120)}</p>
                          <div className="card-title flex justify-between">
                            <h1 className="text-sm text-green-400">
                              {item?.publisher}
                            </h1>
                            {item?.premium === "isPremium" && (
                              <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md">
                                Premium
                              </h1>
                            )}
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-blue-400">
        <Plan></Plan>
        <Subscribe></Subscribe>
      </div>

      <div className=" bg-[#f7f5f6] ">
        <Static></Static>
        <Question></Question>
      </div>
    </div>
  );
};

export default Home;
