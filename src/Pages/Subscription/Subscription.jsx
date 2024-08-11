import React, { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import usePlan from "../../hooks/Plan/usePlan";
const Subscription = () => {
  const { loading } = useContext(AuthContext);
  const [plan] = usePlan();
  const free = plan?.filter((free) => free?.type === "Free");
  const Essential = plan?.filter((free) => free?.type === "Essential");
  const Premium = plan?.filter((free) => free?.type === "Premium");
  if (loading) {
    <div>
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  return (
    <div className="bg-[#f7f9ff]">
      <div className="max-w-screen-xl mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Helmet>
          <title>Planet | Subscription</title>
        </Helmet>
        <div className="mt-20">
          <div
            className="hero h-80 mb-16"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/78/fa/0d/78fa0d0463a9f8f99c0d8f15e0761516.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-2xl font-semibold">
                  Stay Informed with Planet's Premium Subscription
                </h1>
                <p>
                  Unlock a world of in-depth journalism with Planet's Premium
                  Subscription. Enjoy unlimited access to exclusive articles,
                  insightful analyses, and expert opinions. Stay ahead with the
                  latest news, trending stories, and tailored premium content.
                  Join today!
                </p>
              </div>
            </div>
          </div>

          {/* all cards */}
          <div className="grid border-2 border-gray-300 shadow-md rounded-md p-10   gap-4  md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {/* first card */}
            <div className="md:max-w-sm  mx-auto border bg-gray-900 text-white shover:shadow-lg shadow-blue-400 shadow-xl hover:shadow-black rounded-lg md:mx-4 border-gray-700">
              {free?.map((first) => (
                <NavLink to={`/payment/${first._id}`}>
                  <div key={first._id}>
                    <div className="p-6">
                      <h1 className="text-xl font-medium  capitalize lg:text-2xl">
                        {first?.type}
                      </h1>

                      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl ">
                        ${first.money}
                        <span className="text-base font-medium">
                          /{first?.period}
                        </span>
                      </h2>

                      <p className="mt-1 ">{first?.duration}</p>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="p-6">
                      <h1 className="text-lg font-medium capitalize lg:text-xl">
                        What’s included:
                      </h1>

                      <div className="mt-8 space-y-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">{first?.includesone}</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">{first?.includestow}</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4">{first?.includesthree}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* second */}
            <div className="max-w-sm mx-auto border rounded-lg md:mx-4 bg-gray-900 hover:shadow-lg shadow-blue-400 shadow-xl hover:shadow-black text-white border-gray-700">
              {Essential?.map((essen) => (
                <NavLink to={`/payment/${essen._id}`}>
                  <div>
                    <div>
                      <div key={essen?._id} className="p-6">
                        <h1 className="text-xl font-medium capitalize lg:text-2xl">
                          {essen?.type}
                        </h1>

                        <h2 className="mt-4 text-2xl font-semiboldsm:text-3xl">
                          ${essen?.money}{" "}
                          <span className="text-base font-medium">
                            /{essen?.period}
                          </span>
                        </h2>

                        <p className="mt-1">{essen?.duration}</p>
                      </div>

                      <hr className="border-gray-200 dark:border-gray-700" />

                      <div className="p-6">
                        <h1 className="text-lg font-medium  capitalize lg:text-xl">
                          What’s included:
                        </h1>

                        <div className="mt-8 space-y-4">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4">{essen?.includesone}</span>
                          </div>

                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4 ">{essen?.includestow}</span>
                          </div>

                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4 ">
                              {essen?.includesthree}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4 ">{essen?.includefive}</span>
                          </div>

                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4 ">{essen?.includesix}</span>
                          </div>

                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clip-rule="evenodd"
                              />
                            </svg>

                            <span className="mx-4">{essen?.includeseven}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* third Card */}
            <div className="max-w-sm mx-auto border bg-gray-900 text-white shover:shadow-lg shadow-blue-400 shadow-xl hover:shadow-black rounded-lg md:mx-4 border-gray-700">
              {Premium?.map((prem) => (
                <NavLink to={`/payment/${prem._id}`}>
                  <div key={prem?._id}>
                    <div className="p-6">
                      <h1 className="text-xl font-medium  capitalize lg:text-2xl">
                        {prem?.type}
                      </h1>

                      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl ">
                        ${prem?.money}
                        <span className="text-base font-medium">
                          /{prem?.period}
                        </span>
                      </h2>

                      <p className="mt-1 ">{prem?.duration}</p>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="p-6">
                      <h1 className="text-lg font-medium capitalize lg:text-xl">
                        What’s included:
                      </h1>

                      <div className="mt-8 space-y-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">
                            Access to all news articles
                          </span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4">Full access to archives</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">Ad-free experience</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">Weekly newsletter</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4 ">Mobile app</span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <span className="mx-4">Unlimited users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
