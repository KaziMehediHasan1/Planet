import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";
import Subscribe from "./NewSubscribe/Subscribe";
import useArticles from "../../hooks/useArticles/useArticles";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [articles, refetch, isLoading, error] = useArticles();

  
  if (isLoading) {
    <p>loading...</p>;
  }
  return (
    <div className="bg-cyan-100">
      <div>
        <Helmet>
          <title>Planet || Home</title>
        </Helmet>
      </div>
      <Slider></Slider>
      <div className=" bg-gradient-to-b ">
        <AllPublisher></AllPublisher>

        {/* trending blogs */}
        <div className=" rounded-t-md p-4">
          <div className="max-w-screen-2xl  mx-auto border-2">
            <section className=" dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl  font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                  From the blog
                </h1>

                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                  {articles?.slice(0, 4).map((item) => (
                    <NavLink
                      to={`/articleDetails/${item?._id}`}
                      key={item?._id}
                      className="lg:flex"
                    >
                      <img
                        className="object-cover w-full h-56 rounded-lg lg:w-64"
                        src={item?.image}
                        alt=""
                      />
                      <div className="flex flex-col  py-6 lg:mx-6">
                        <p className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                          How to use sticky note for problem solving
                        </p>
                        <p className="hover:text-blue-500 mt-5 hover:font-semibold">
                          {" "}
                          {item?.Description?.slice(0, 80)}..
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Plan></Plan>
      <Subscribe></Subscribe>

      <div className=" bg-[#f7f5f6] ">
        <Static></Static>
        <Question></Question>
      </div>
    </div>
  );
};

export default Home;
