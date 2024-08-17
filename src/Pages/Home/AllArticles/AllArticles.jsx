import { NavLink, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion } from "framer-motion";
import usePayment from "../../../hooks/Payment/usePayment";
const AllArticles = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payment] = usePayment();

  const [articles, isLoading, error] = useArticles();
  const [search, setSearch] = useState("");

  if (isLoading) {
    <p>Loading...</p>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  // Check if the user is a subscriber
  const subscriber = payment?.some((sub) => sub.email === user?.email);
  // console.log(subscriber);
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  const handleDetails = async (e, isPremium) => {
    if (subscriber || !isPremium) {
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
    const searchData = async () => {
      await fetch(
        `${import.meta.env.VITE_SERVER_URL}/articles?search=${search}`
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    searchData();
  }, []);

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
        onSubmit={handleSearch}
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
        <div className="grid grid-cols-1 gap-8 mt-14 lg:grid-cols-3 md:grid-cols-2">
          {approvedArticles
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((item) => (
              <div
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
                          onClick={() =>
                            handleDetails(
                              item?._id,
                              item?.premium === "isPremium"
                            )
                          }
                          className={`text-sm text-green-800 border-2 px-6 py-2 rounded-md font-uiFont font-semibold ${
                            !subscriber && item?.premium === "isPremium"
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
