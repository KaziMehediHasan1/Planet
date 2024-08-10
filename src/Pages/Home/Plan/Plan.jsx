import { Link, NavLink } from "react-router-dom";
import usePlan from "../../../hooks/Plan/usePlan";

const Plan = () => {
  const [plan, refetch] = usePlan();

  const free = plan?.filter((free) => free?.type === "Free");
  const Essential = plan?.filter((free) => free?.type === "Essential");
  const Premium = plan?.filter((free) => free?.type === "Premium");
  refetch()
  return (
    
      <div className="container px-6 py-14 mx-auto">
        <div className="xl:items-center xl:-mx-10 xl:flex">
          <div className="flex flex-col items-center  xl:items-start xl:mx-10">
            <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
              Our Pricing Plan
            </h1>

            <div className="mt-4">
              <span className="inline-block w-40 h-1 bg-white rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-white rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-white rounded-full"></span>
            </div>

            <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
              You can get All Access by selecting your plan!
            </p>

            <a
              href="#"
              className="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              <Link
                to="/subscription"
                className="mx-1 bg-blue-600 p-2 px-2 text-white rounded-md capitalize font-semibold"
              >
                check more
              </Link>
              <svg
                className="w-4 h-4 mx-1 rtl:-scale-x-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>

          <div className="flex-1 xl:mx-8">
            <div className="grid border-2 border-gray-300  shadow-md rounded-md p-10 md:mt-5 mt-6 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {/* first card */}
              <div className="md:max-w-sm  mx-auto border bg-gray-900 text-white shover:shadow-lg shadow-blue-400 shadow-xl hover:shadow-black rounded-lg md:mx-4 border-gray-700">
                {free?.map((first) => (
                  <NavLink to="/subscription">
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
                  <NavLink to="/subscription">
                    
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

                              <span className="mx-4 ">
                                {essen?.includestow}
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

                              <span className="mx-4 ">
                                {essen?.includefive}
                              </span>
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

                              <span className="mx-4">
                                {essen?.includeseven}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                  </NavLink>
                ))}
              </div>
              {/* third card */}
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

export default Plan;
