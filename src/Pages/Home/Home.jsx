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
  const [articles, isLoading] = useArticles();
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

      <AllPublisher></AllPublisher>

      {/* trending blogs */}

      <div className="max-w-screen-2xl mx-auto p-20">
        <h1 className="text-2xl  font-bold text-center  capitalize lg:text-5xl dark:text-white">
          From the blog
        </h1>
        <section className=" dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-3">
              {articles?.slice(0, 6).map((item) => (
                <NavLink
                  to={`/articleDetails/${item?._id}`}
                  key={item?._id}
                  className="lg:flex"
                >
                  <div className="max-w-lg p-4 shadow-md bg-gray-50 text-gray-800">
                    <div className="flex justify-between pb-4 border-bottom">
                      <div className="flex items-center">
                        <p className="mb-0 capitalize text-gray-800">
                          {item?.publisher}
                        </p>
                      </div>
                      <p>
                        {item?.premium === "isPremium" && (
                          <p className="border px-2 bg-pink-500 rounded-md py-1 text-white">
                            Premium
                          </p>
                        )}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <img
                          src={item?.image}
                          alt=""
                          className="block object-cover object-center w-full rounded-md h-72 bg-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <a rel="noopener noreferrer" href="#" className="block">
                          <h3 className="text-xl font-semibold text-violet-600">
                            {item?.title}
                          </h3>
                        </a>
                        <p className="leading-snug text-gray-600">
                          {item?.Description.slice(0, 80)}..
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
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
