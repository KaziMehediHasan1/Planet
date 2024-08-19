import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion } from "framer-motion";
import usePayment from "../../../hooks/Payment/usePayment";
import useArticles from "../../../hooks/useArticles/useArticles";
import { toast } from "react-toastify";
const AllArticles = () => {
  const [search, setSearch] = useState("");
  const [articles, isLoading, error] = useArticles(search);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payment] = usePayment();

  if (isLoading) {
    <p className="mt-[500px]">loading...</p>;
  }

  // Check if the user is a subscriber
  const subscriber = payment?.some((sub) => sub.email === user?.email);
  // console.log(subscriber);
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  const handleDetails = async (e) => {
    if (user?.email) {
      navigate(`/articleDetails/${e}`);
      await axiosSecure.put(`/viewCount/${e}`).then((res) => {
        console.log(res);
      });
    } else if (!user) {
      toast.error("Please buy a subscription plan!");
    }
  };

  // search field...
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    // console.log(search);
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
      <div className="flex items-center justify-center space-x-3">
        <form onSubmit={handleSearch} className=" font-uiFont">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:ring"
              >
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
        <select
          onChange={(e) => setFilter(e.target.value)}
          name="publisher"
          id="category"
          className="border rounded-md"
        >
          <option value="">Tech Decoded</option>
          <option value="Education">IndiaTv</option>
          <option value="Technology">The Essential List</option>
          <option value="Health">Future Earth</option>
          <option value="Travel">US Election Unspun</option>
          <option value="Travel">Daily Star</option>
          <option value="Travel">Ajker Bangla</option>
        </select>
      </div>

      <div className=" md:max-w-screen-2xl md:mx-auto rounded-md">
        <div className="grid grid-cols-1 gap-8 mt-14 lg:grid-cols-3 md:grid-cols-2">
          {approvedArticles
            // ?.filter((item) => {
            //   return search.toLowerCase() === ""
            //     ? item
            //     : item.title.toLowerCase().includes(search);
            // })
            .map((item) => (
              <div
                key={item?._id}
                className=" md:max-w-screen-2xl md:mx-auto "
                data-aos="fade-right fade-left"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0 mx-8 "
                >
                  <div className="card bg-base-100 lg:w-96 lg:h-[480px] md:w-80 md:h-[420px] mx-auto shadow-xl ">
                    <figure className="relative">
                      <img
                        className="   object-cover object-center w-full  rounded-t-md h-72"
                        src={item?.image}
                        alt="Shoes"
                      />

                      {item?.premium === "isPremium" && (
                        <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md absolute top-5 left-6 font-uiFont font-medium ring-base-50  ring ">
                          Premium
                        </h1>
                      )}
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title font-uiFont">
                        {item?.title.slice(0, 80)}
                      </h2>
                      <p className="font-uiFont font-medium">
                        {item?.Description?.slice(0, 120)}
                      </p>

                      <div className="card-title flex justify-between">
                        <h1 className="text-sm text-green-400 hover:underline font-uiFont">
                          {item?.publisher}
                        </h1>
                        <button
                          style={{
                            cursor:
                              !subscriber && item?.premium === "isPremium"
                                ? "not-allowed"
                                : "pointer",
                            pointerEvents:
                              !subscriber && item?.premium === "isPremium"
                                ? "none"
                                : "auto",
                          }}
                          disabled={
                            !subscriber && item?.premium === "isPremium"
                          }
                          onClick={() => handleDetails(item?._id)}
                          className={`text-sm text-green-800 border-2 px-6 py-2 rounded-md font-uiFont font-semibold ${
                            !subscriber && item?.premium === "isPremium"
                              ? "bg-slate-200 text-green-800"
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
