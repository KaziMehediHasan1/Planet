import { NavLink, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion } from "framer-motion";
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

  if (error) {
    <span>Error:{error.message}</span>;
  }
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  // read-more button
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="pt-28 mb-14">
      <Helmet>
        <title>Planet | Articles</title>
      </Helmet>
      <form
        onChange={handleSearch}
        className="space-y-5 flex justify-center mb-6 font-uiFont"
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
            className="w-96 mx-auto py-2 pl-10 text-sm rounded-md focus:outline-none focus:border-sky-600 border-2 border-cyan-600"
          />
        </div>
      </form>
      <div className=" md:max-w-screen-2xl md:mx-auto rounded-md">
        <div
          className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 mt-14 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0 font-uiFont"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          {approvedArticles
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((article) => (
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="card bg-base-100 w-96 h-[480px] shadow-xl mx-6 md:mx-0">
                  <figure className="relative">
                    <img
                      className="object-cover object-center lg:w-full rounded-t-md lg:h-full "
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
                    <h2 className="card-title">{article?.title}</h2>
                    <p>{article?.Description.slice(0, 120)}</p>
                    <div className="card-title flex justify-between">
                      <h1 className="text-sm text-green-400">
                        {article?.publisher}
                      </h1>

                      <button
                        onClick={() => handleReadMore(article?._id)}
                        className="text-sm text-green-800 border-2 px-6 py-2 rounded-md bg-slate-300 font-uiFont font-semibold"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
