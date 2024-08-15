import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import useArticles from "../../hooks/useArticles/useArticles";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import usePayment from "../../hooks/Payment/usePayment";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const PremiumArticle = () => {
  const [articles, isLoading, error] = useArticles();
  const [payment] = usePayment();
  const { user } = useContext(AuthContext);
  if (isLoading) {
    <h1 className="text-black">Loading....</h1>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 500,
    });
  }, []);

  const subscriber = payment?.some((sub) => sub.email === user?.email);
  return (
    <div className="pb-16">
      <Helmet>
        <title>Planet | Premium-Articles</title>
      </Helmet>
      <div className="pt-28 md:max-w-screen-2xl md:mx-auto">
        <h1 className="text-center text-3xl font-uiFont text-gray-600">
          All Premium Article
        </h1>
        <p className="text-center px-64 mt-4 text-gray-600 font-uiFont">
          <Link to="/subscription" className="hover:underline">
            <span className="text-xl text-blue-700">S</span>ubscribe
          </Link>{" "}
          and read your favorite articles on Planet, where the latest news meets
          in-depth analysis. Enjoy premium content, exclusive insights, and stay
          informed with personalized recommendations. Join our community and
          never miss a story that matters.
        </p>
        <div className=" rounded-md px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-2 md:gap-5 mt-8 font-uiFont mx-8 md:mx-0">
            {approvedArticles?.map(
              (article) =>
                article?.premium === "isPremium" && (
                  <div className=" md:max-w-screen-2xl md:mx-auto rounded-md">
                    <div className="grid grid-cols-1 gap-8 mt-14 lg:grid-cols-3 md:grid-cols-2">
                      <div
                        className=" md:max-w-screen-2xl md:mx-auto "
                        data-aos="fade-right fade-left"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0 mx-8"
                        >
                          <div className="card bg-base-100 lg:w-96 lg:h-[480px] md:w-80 md:h-[420px] mx-auto shadow-xl">
                            <figure className="relative">
                              <img
                                className="object-cover object-center lg:w-full rounded-t-md h-44"
                                src={article?.image}
                                alt="Shoes"
                              />

                              {article?.premium === "isPremium" && (
                                <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md absolute top-5 left-6 font-uiFont font-medium ring-base-50  ring ">
                                  Premium
                                </h1>
                              )}
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title font-uiFont">
                                {article?.title}
                              </h2>
                              <p className="font-uiFont font-medium">
                                {article?.Description?.slice(0, 120)}
                              </p>

                              <div className="card-title flex justify-between">
                                <h1 className="text-sm text-green-400 hover:underline font-uiFont">
                                  {article?.publisher}
                                </h1>
                                <button
                                  style={{
                                    cursor:
                                      !subscriber &&
                                      article?.premium === "isPremium"
                                        ? "not-allowed"
                                        : "pointer",
                                    pointerEvents:
                                      !subscriber &&
                                      article?.premium === "isPremium"
                                        ? "none"
                                        : "auto",
                                  }}
                                  disabled={
                                    !subscriber &&
                                    article?.premium === "isPremium"
                                  }
                                  onClick={() =>
                                    handleDetails(
                                      article?._id,
                                      article?.premium === "isPremium"
                                    )
                                  }
                                  className={`text-sm text-green-800 border-2 px-6 py-2 rounded-md font-uiFont font-semibold ${
                                    !subscriber &&
                                    article?.premium === "isPremium"
                                      ? "bg-slate-300 text-green-800"
                                      : "bg-gray-800 text-white cursor-not-allowed"
                                  }`}
                                >
                                  Read
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticle;
