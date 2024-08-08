import React from "react";
import { Helmet } from "react-helmet";
import useArticles from "../../hooks/useArticles/useArticles";
import { Link } from "react-router-dom";

const PremiumArticle = () => {
  const [articles, isLoading, error] = useArticles();

  if (isLoading) {
    <h1 className="text-black">Loading....</h1>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  return (
    <div>
      <Helmet>
        <title>Planet | Premium-Articles</title>
      </Helmet>
      <div className="pt-28">
        <div className="md:max-w-screen-xl md:mx-auto  border border-gray-400 shadow-lg rounded-md">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 md:gap-20 gap-5 mt-14 px-8 lg:space-x-4">
            {approvedArticles?.map(
              (article) =>
                article?.premium === "isPremium" && (
                  <div
                    key={article._id}
                    className="mb-10 shadow-lg border rounded-lg dark:border-gray-700 md:w-80 max-h-[450px]"
                  >
                    <div className="relative">
                    <img
                      className="rounded-t-lg w-full h-48 object-cover"
                      src={article?.image}
                      alt={article?.title}
                    />
                    <h1 className="absolute top-4 left-4 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-md p-1 text-white font-medium">Premium</h1>
                    </div>
                    <div className="p-4">
                      <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
                        {article?.title}
                      </h5>
                      <p className="mb-3 font-normal dark:text-gray-400">
                        {article?.Description?.slice(0, 80)}..
                      </p>
                      <h2 className="text-md pb-2">
                        Publisher: {article?.publisher}
                      </h2>
                      <Link
                        to={`/articleDetails/${article?._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
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
