import { Helmet } from "react-helmet";
import AllPublisher from "./AllPublisher/AllPublisher";
import Static from "./Static/Static";
import Plan from "./Plan/Plan";
import Slider from "../Slider/Slider";
import Question from "./Question/Question";
import Subscribe from "./NewSubscribe/Subscribe";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import usePayment from "../../hooks/Payment/usePayment";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import useArticles from "../../hooks/useArticles/useArticles";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import modal from "../../assets/modaltow.json";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [payment, isLoading] = usePayment();
  const axiosSecure = useAxiosSecure();
  const [articles] = useArticles();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log("Modal should open now");
      setShowModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [showModal]);
  const closeModal = () => {
    setShowModal(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (isLoading) {
    <p>loading...</p>;
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 500,
    });
  }, []);

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
  return (
    <div className="bg-cyan-100">
      <div>
        <Helmet>
          <title>Planet || Home</title>
        </Helmet>
      </div>

      {/*  */}
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <div className=" rounded-t-md">
        {/* trending blogs */}
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
                {approvedArticles?.slice(0, 6).map((item) => (
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

                          {item?.premium === "isPremium" && (
                            <h1 className="text-sm border p-2 bg-pink-500 text-white rounded-md absolute top-5 left-6 font-uiFont font-medium ring-base-50  ring ">
                              Premium
                            </h1>
                          )}
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
          </section>
        </div>
        {/* Render the modal here */}
        <div>
          {showModal && (
            <dialog
              ref={dialogRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="relative flex justify-center">
                <button className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Open Modal
                </button>

                <div
                  x-show="isOpen"
                  x-transition:enter="transition duration-300 ease-out"
                  x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                  x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
                  x-transition:leave="transition duration-150 ease-in"
                  x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
                  x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    ></span>

                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                      <div>
                        <Lottie
                          animationData={modal}
                          className="object-cover w-full h-48 rounded-md"
                        ></Lottie>

                        <div className="mt-4 text-center">
                          <h3
                            className="font-semibold text-xl leading-6 text-gray-800 capitalize dark:text-white"
                            id="modal-title"
                          >
                            Welcome to our Planet site
                          </h3>

                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Stay updated with our latest posts and news.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
                        <Link
                          to="/subscription"
                          className="w-full px-4 py-2 text-sm text-center font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                        >
                          Subscribe
                        </Link>

                        <button
                          onClick={closeModal}
                          className="w-full px-4 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
          )}
        </div>
        {/*  */}
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
