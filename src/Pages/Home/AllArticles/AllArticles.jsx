import { NavLink, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import loading from "../../../assets/loading.json";
import Lottie from "lottie-react";
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
    <Lottie className="p-52" animationData={loading} />;
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
    <div className="pt-28 mb-14">
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
        <div className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 mt-14 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0">
          {approvedArticles
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((article) =>
              article?.premium === "isPremium" ? (
                <div className="card bg-base-100 w-96 h-[480px] shadow-xl">
                  <figure>
                    <img src={article?.image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{article?.title}</h2>
                    <p>{article?.Description.slice(0, 120)}</p>
                    <div className="card-title flex justify-between">
                      <h1 className="text-sm text-green-400">
                        {article?.publisher}
                      </h1>
                      {article?.premium === "isPremium" && (
                        <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md">
                          Premium
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
