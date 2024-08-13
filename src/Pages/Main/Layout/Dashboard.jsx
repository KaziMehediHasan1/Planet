import { Link, NavLink, Outlet } from "react-router-dom";
import { LuBookOpenCheck, LuPenSquare } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import { Helmet } from "react-helmet";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
 
  return (
    <div>
      <Helmet>
        <title>Planet | Dashboard</title>
      </Helmet>
      <div>
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <Link to="/" className="flex items-center ps-2.5 mb-5">
              <img
                src={user?.photoURL}
                className="h-9 w-9 me-3 rounded-full"
                alt="Planet"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Home
              </span>
            </Link>
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 rounded-lg    group"
                        : "flex items-center p-2 rounded-lg"
                    }
                  >
                    <span className="w-full ms-3 whitespace-nowrap">
                      Dashboard
                    </span>
                  </NavLink>
                </NavLink>
              </li>
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/DashArticles"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <LuBookOpenCheck></LuBookOpenCheck>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        All Articles
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/DashPublisher"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <LuPenSquare></LuPenSquare>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Add Publisher
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <FaUsers></FaUsers>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        All User
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/DashMyArticles"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <LuBookOpenCheck></LuBookOpenCheck>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        My Articles
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/DashPublisher"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <LuPenSquare></LuPenSquare>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Add Publisher
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 rounded-lg bg-blue-400 text-white  hover:bg-gray-400 dark:hover:bg-gray-700 group"
                          : "flex items-center p-2 rounded-lg hover:text-white  hover:bg-blue-600 group"
                      }
                    >
                      <FaUsers></FaUsers>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        All User
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </aside>

        {/* Dashboard Content */}
        <div className="p-4 sm:ml-64 sm:mr-20">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
