import useAllUsers from "../../hooks/useAllUsers/useAllUsers";
import { GrUserManager } from "react-icons/gr";
import { BiSolidEraser } from "react-icons/bi";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";


const Users = () => {
  const [users, refetch, isLoading] = useAllUsers();
  const [countUser, setCountUser] = useState([]);
  const { count } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];
  const { user: Users, loading } = useContext(AuthContext);
  const admin = users?.find((user) => user.role === "admin");

  // console.log(loading,isLoading);
  if (isLoading || loading) {
    return <p>Loading.....</p>;
  }

  useEffect(() => {
    const fetchCount = async () => {
      await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/users?page=${currentPage}&size=${itemsPerPage}`
      )
        .then((res) => res.json())
        .then((data) => setCountUser(data));
    };
    fetchCount()
  }, [currentPage]);
  

  const handleDeleteUser = (user) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete && Users?.email === admin?.email) {
        axiosSecure.delete(`/users/${user?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          }
          refetch();
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        swal("Awesome", `${user?.name} is and Admin Now!`, "success");
      } else {
        swal("Sad!", `${user?.name} Not Update`, "error");
      }
    });
  };
  //prev page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  // next page
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Helmet>
          <title>Planet | Dashboard | Users</title>
        </Helmet>
        <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="pl-10">#</th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {countUser?.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="pl-10">{index + 1}</td>
                <td>
                  <img
                    className="w-10 h-10 rounded-full ring animate-pulse"
                    src={user?.image}
                    alt={user?.name}
                  />
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user?.name}</div>
                  </div>
                </th>
                <td>
                  <div className="font-normal text-gray-500">{user?.email}</div>
                </td>
                <td className="px-6 py-4">
                  {user?.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)}>
                      <GrUserManager className="text-2xl"></GrUserManager>
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <BiSolidEraser className="text-2xl"></BiSolidEraser>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex max-w-screen-md mx-auto px-64 mt-5">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages?.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={page}
            className={
              currentPage === page &&
              " px-3 py-2 mx-1  transition-colors duration-300 transform bg-purple-900 rounded-md sm:inline dark:bg-gray-800  dark:hover:bg-blue-500 text-white dark:hover:text-gray-200"
            }
          >
            {page + 1}
          </button>
        ))}

        {/* <select className="rounded-md" name="" id="">
          <option value="10">10</option>
          <option value="10"></option>
          <option value="10">10</option>
        </select> */}

        <button
          onClick={handleNextPage}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Users;
