import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import userProfile from "../../../assets/planet.jpg";
import useAdmin from "../../../hooks/useAdmin";
import AOS from "aos";
import "aos/dist/aos.css";
import usePayment from "../../../hooks/Payment/usePayment";
const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);
  const [nav, setNav] = useState(false);
  const [payment] = usePayment();
  const [isAdmin] = useAdmin();
  const subscriber = payment?.some((sub) => sub.email === user?.email);
  const handleSignOut = () => {
    Logout()
      .then((result) => {
        if (result) {
          toast.error("Log Out Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 500,
    });
  }, []);

  return (
    <div className="flex justify-between lg:px-10 md:px-7 px-3 fixed z-10 w-full items-center font-uiFont py-2 bg-slate-900 ">
      <div>
        <Link
          to="/"
          className="lg:text-4xl text-2xl cursor-pointer md:font-bold font-uiFont text-white "
        >
          Planet
        </Link>
      </div>
      <div
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        {/* md to lg  device */}
        <div className="md:flex items-center hidden sm:text-xs lg:text-[17px] text-white">
          <ul className="flex justify-center items-center md:space-x-[18px] lg:space-x-10 ml-4 cursor-pointer px-4">
            {user && (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium hover:scale-110 duration-500 border-b-2 border-white"
                      : "font-medium hover:scale-110 duration-200"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/add-articles"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                      : "font-medium hover:scale-110 duration-200"
                  }
                >
                  Add Article
                </NavLink>
                <NavLink
                  to="/all-articles"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                      : "font-medium hover:scale-110 duration-200"
                  }
                >
                  All Article
                </NavLink>
                <NavLink
                  to="/subscription"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                      : "font-medium hover:scale-110 duration-200"
                  }
                >
                  Subscription
                </NavLink>

                {isAdmin ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                          : "font-medium hover:scale-110 duration-200"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                ) : (
                  user && (
                    <NavLink
                      to="/my-articles"
                      className={({ isActive }) =>
                        isActive
                          ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                          : "font-medium hover:scale-110 duration-200"
                      }
                    >
                      My Article
                    </NavLink>
                  )
                )}
                {subscriber && (
                  <NavLink
                    to="/premiumArticles"
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                        : "font-medium hover:scale-110 duration-200"
                    }
                  >
                    Premium Articles
                  </NavLink>
                )}
              </>
            )}

            {user ? (
              <Link
                onClick={handleSignOut}
                className="font-medium bg-[#304483] text-white px-4 py-2 rounded-lg"
              >
                Sign Out
              </Link>
            ) : (
              <Link
                to="/register"
                className="font-medium bg-[#1e294b] px-4 py-2 rounded-lg text-white"
              >
                Sign Up
              </Link>
            )}
          </ul>
          <Link to="/profile" className="font-medium ">
            {user ? (
              <img
                src={user?.photoURL}
                alt="User-Profile"
                className="rounded-full w-12 h-12  ring-offset-base-100  ring ring-offset-2"
              />
            ) : (
              <img
                src={userProfile}
                alt="User-Profile"
                className="rounded-full w-12 h-12  ring-offset-base-100  ring ring-offset-2"
              />
            )}
          </Link>
        </div>

        {/* sm device */}
        <div className="flex items-center">
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer py-4 z-50 md:hidden"
          >
            {nav ? <FaTimes size={30} className="text-white"></FaTimes> : <FaBars size={30} className="text-white"></FaBars>}
            {nav && (
              <div>
                <ul className="flex space-y-4 text-white  flex-col justify-center mt-20 p-14 bg-black items-center absolute top-0 left-36 rounded-md">
                  {user && (
                    <>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                            : "font-medium hover:scale-110 duration-200"
                        }
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/add-articles"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                            : "font-medium hover:scale-110 duration-200"
                        }
                      >
                        Add Article
                      </NavLink>
                      <NavLink
                        to="/all-articles"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                            : "font-medium hover:scale-110 duration-200"
                        }
                      >
                        All Article
                      </NavLink>
                      <NavLink
                        to="/subscription"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                            : "font-medium hover:scale-110 duration-200"
                        }
                      >
                        Subscription
                      </NavLink>

                      {isAdmin ? (
                        <>
                          <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                              isActive
                                ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                                : "font-medium hover:scale-110 duration-200"
                            }
                          >
                            Dashboard
                          </NavLink>
                        </>
                      ) : user ? (
                        <NavLink
                          to="/my-articles"
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                              : "font-medium hover:scale-110 duration-200"
                          }
                        >
                          My Article
                        </NavLink>
                      ) : (
                        ""
                      )}

                      {subscriber && (
                        <NavLink
                          to="/premiumArticles"
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium hover:scale-110 duration-200 border-b-2 border-white hover:-border-b-2"
                              : "font-medium hover:scale-110 duration-200"
                          }
                        >
                          Premium Articles
                        </NavLink>
                      )}
                    </>
                  )}
                  {user ? (
                    <Link
                      onClick={handleSignOut}
                      className="font-medium bg-[#1e294b] text-white px-4 py-2 rounded-lg"
                    >
                      Sign Out
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className="font-medium  bg-[#1e294b] px-4 py-2 rounded-lg text-white"
                    >
                      Sign Up
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
          <Link to="/profile" className="font-medium md:hidden ml-4 ">
            {user ? (
              <img
                src={user?.photoURL}
                alt="User-Profile"
                className="rounded-full md:w-12 md:h-12 w-10 h-10"
              />
            ) : (
              <img
                src={userProfile}
                alt="User-Profile"
                title="Profile"
                className="rounded-full w-12 h-12"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
