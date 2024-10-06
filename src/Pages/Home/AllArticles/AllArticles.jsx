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
  const [filter, setFilter] = useState("");
  const [articles, isLoading] = useArticles({
    search: search,
    filter: filter,
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payment] = usePayment();

  // Check if the user is a subscriber
  const subscriber = payment?.some((sub) => sub.email === user?.email);
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
    setSearch(search);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className="pt-28 mb-10">
      <Helmet>
        <title>Planet | Articles</title>
      </Helmet>
      <div className="md:flex md:items-center md:justify-center  md:space-x-3 w-[350px] mx-auto space-x-5 space-y-3 md:space-y-0">
        <form onSubmit={handleSearch} className=" font-uiFont ">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5 md:pl-5">
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
              className="w-[300px] mx-auto py-[9px] ml-5 pl-10 text-sm rounded-md focus:outline-none focus:border-sky-600 border-2 border-cyan-600"
            />
          </div>
        </form>
        <select
          onChange={(e) => setFilter(e.target.value)}
          name="publisher"
          className="border rounded-md border-cyan-600 w-[300px] mx-auto"
        >
          <option value="Tech Decoded">Tech Decoded</option>
          <option value="IndiaTv">IndiaTv</option>
          <option value="The Essential List">The Essential List</option>
          <option value="Future Earth">Future Earth</option>
          <option value="US Election Unspun">US Election Unspun</option>
          <option value="Daily Star">Daily Star</option>
          <option value="Ajker Bangla">Ajker Bangla</option>
        </select>
        <button className="bg-cyan-700 p-2 hidden md:block text-white rounded-md font-uiFont">
          Reset
        </button>
      </div>

      <div className=" lg:w-[1320px]  mx-auto rounded-md">
        <div className="grid grid-cols-1 gap-4 mt-14 lg:grid-cols-3 md:grid-cols-2">
          {approvedArticles.map((item) => (
            <div
              key={item?._id}
              className=" md:max-w-screen-2xl md:mx-auto "
              data-aos="fade-right fade-left"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="grid lg:grid-cols-3 mb-14 md:grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5 md:max-w-screen-xl md:mx-auto md:px-8 lg:px-0 mx-8 "
              >
                <div className="card bg-base-100 w-80 w lg:h-[500px] md:h-[450px] mx-auto shadow-xl">
                  <figure className="relative">
                    <img
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover object-center rounded-t-md"
                      src={item?.image}
                      alt="Shoes"
                    />
                    {item?.premium === "isPremium" && (
                      <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md absolute top-5 left-6 font-uiFont font-medium ring-base-50 ring">
                        Premium
                      </h1>
                    )}
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title font-uiFont">
                      {item?.title.slice(0, 30)}
                    </h2>
                    <p className="font-uiFont font-medium">
                      {item?.Description?.slice(0, 100)}
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
                        disabled={!subscriber && item?.premium === "isPremium"}
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
