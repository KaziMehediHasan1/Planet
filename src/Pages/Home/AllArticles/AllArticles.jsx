import { useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const AllArticles = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: payment, refetch } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });
  refetch();

  const [articles, isLoading, error] = useArticles();
  const [search, setSearch] = useState("");

  if (isLoading) {
    <h1 className="text-black">Loading....</h1>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  // readmore button
  const handleReadMore = async (id) => {
    navigate(`/articleDetails/${id}`);
    await axiosSecure.put(`/viewCount/${id}`).then((res) => {
      console.log(res);
    });
  };

  // search field...
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <div className="pt-28">
      <Helmet>
        <title>Planet | Articles</title>
      </Helmet>
      <form
        onChange={handleSearch}
        className="space-y-5 flex justify-center mb-6"
      >
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:ring">
              <CiSearch className="w-5 h-5 text-gray-800"></CiSearch>
            </button>
          </span>
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-96 mx-auto py-2 pl-10 text-sm rounded-md focus:outline-none focus:border-sky-600"
          />
        </div>
      </form>
      <div className=" md:max-w-screen-2xl md:mx-auto border border-gray-400 shadow-lg rounded-md">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 mt-14 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0">
          {approvedArticles
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((article) => (
              <div
                key={article._id}
                className="mb-10 shadow-lg border rounded-lg dark:border-gray-700"
              >
                <div className="relative">
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={article?.image}
                    alt={article?.title}
                  />
                  {article.premium && (
                    <h1 className="absolute top-4 left-4 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-md p-1 text-white font-medium">
                      Premium
                    </h1>
                  )}
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

                  {payment && (
                    <button
                      onClick={() => handleReadMore(article?._id)}
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
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
