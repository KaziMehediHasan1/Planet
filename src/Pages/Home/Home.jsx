import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";
import Subscribe from "./NewSubscribe/Subscribe";
import useArticles from "../../hooks/useArticles/useArticles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import usePayment from "../../hooks/Payment/usePayment";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [articles, isLoading] = useArticles();
  const [payment, refetch] = usePayment();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [premiumUser, setPremiumUser] = useState();
  if (isLoading) {
    <p>loading...</p>;
  }

  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 500,
    });
  }, []);

  // is user Subscriber..
  useEffect(() => {
    const subscriber = payment?.map((sub) => sub?.email);
    const isUserPremium = !!subscriber === !!user?.email;
    setPremiumUser(isUserPremium);
    refetch();
  }, [premiumUser]);

  const handleDetails = async (e) => {
    navigate(`/articleDetails/${e}`);
    await axiosSecure.put(`/viewCount/${e}`).then((res) => {
      console.log(res);
    });
  };
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
      <div className=" rounded-t-md">
        <div className="max-w-screen-2xl mx-auto">
          <h1
            className="text-2xl  font-bold text-center capitalize lg:text-4xl dark:text-white  font-uiFont"
            data-aos="fade-right"
          >
            Trending Articles
          </h1>
          <section className=" dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3 md:grid-cols-2">
                {articles?.slice(0, 6).map((item) => (
                  <div
                    className=" md:max-w-screen-2xl md:mx-auto "
                    data-aos="fade-right fade-left"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0"
                    >
                      <div className="card bg-base-100 lg:w-96 lg:h-[480px] md:w-80 md:h-[420px] mx-auto shadow-xl">
                        <figure className="relative">
                          <img
                            className="object-cover object-center lg:w-full rounded-t-md lg:h-full "
                            src={item?.image}
                            alt="Shoes"
                          />
                          <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md absolute top-5 left-6 font-uiFont font-medium ring-base-50  ring ">
                            Premium
                          </h1>
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title font-uiFont">
                            {item?.title}
                          </h2>
                          <p className="font-uiFont font-medium">
                            {item?.Description?.slice(0, 120)}
                          </p>

                          <div className="card-title">
                            <button
                              onClick={() => handleDetails(item?._id)}
                              className="text-sm text-green-800 border-2 px-6 py-2 rounded-md bg-slate-300 font-uiFont font-semibold"
                            >
                              Read
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
