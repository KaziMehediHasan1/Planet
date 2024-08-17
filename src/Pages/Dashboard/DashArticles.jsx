import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useArticles from "../../hooks/useArticles/useArticles";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
const DashArticles = () => {
  const { user } = useContext(AuthContext);
  const { count } = useLoaderData();
  const [, refetch] = useArticles();
  const [countUser, setCountUser] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];
  const axiosSecure = useAxiosSecure();

  const handleDeleteArticles = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/articles/${id}`).then((res) => {
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
  const handleApprove = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to recover this article",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApproved) => {
      if (willApproved) {
        axiosSecure.patch(`/articles/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            swal("Poof! this article has been updated!", {
              icon: "success",
            });
          }
          refetch();
        });
      } else {
        swal("this article is not approved!");
      }
    });
  };

  const handlePremium = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        axiosSecure.put(`/articles/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
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

  //
  useEffect(() => {
    const fetchCount = async () => {
      await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/paginationArticle?page=${currentPage}&size=${itemsPerPage}`
      )
        .then((res) => res.json())
        .then((data) => setCountUser(data));
    };
    fetchCount();
    refetch();
  }, [currentPage, itemsPerPage]);
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

  // decline..
  const handleDecline = async (e, id) => {
    e.preventDefault();
    const form = e.target.textarea.value;
    document.getElementById("my_modal_3").close();
    e.target.textarea.value = "";
    console.log(form);
    const decline = {
      text: form,
      admin: user?.email,
    };
    const articlesData = await axiosSecure.patch(`/articles/${id}`, decline);
    console.log(articlesData);
    if (articlesData.data.modifiedCount > 0) {
      swal("Good job!", "decline message successfully send", "success");
    }
  };
  return (
    <div className="md:ml-16">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-uiFont">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase  bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Serial
              </th>

              <th scope="col" className="px-6 py-3">
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Author Mail
              </th>
              <th scope="col" className="px-6 py-3">
                Author Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Post Date
              </th>
              <th scope="col" className="px-6 py-3">
                Publisher
              </th>
              <th scope="col" className="px-6 py-3">
                Approve
              </th>
              <th scope="col" className="px-6 py-3">
                Decline
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {countUser?.map((article, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">{index + 1}</td>

                <th>
                  <h2 className="ps-3   font-semibold">
                    {article?.title?.slice(0, 80)}..
                  </h2>
                </th>
                <th>
                  <h2 className="ps-3  font-semibold">{article?.ownerName}</h2>
                </th>
                <th>
                  <h2 className="ps-3  font-semibold">{article?.owner}</h2>
                </th>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 ring rounded-lg"
                    src={article?.ownerPic}
                    alt="author photo"
                  />
                </th>
                <th>
                  <h2 className="ps-3  font-semibold">{article?.Date}</h2>
                </th>
                <th>
                  <h2 className="ps-3 font-semibold">{article?.publisher}</h2>
                </th>

                <td className="px-6 py-4">
                  {article?.status === "Approved" ? (
                    <p className=" text-green-600 font-bold">Approved</p>
                  ) : (
                    <button
                      onClick={() => handleApprove(article?._id)}
                      className="flex items-center"
                    >
                      <p className=" text-red-600">Approve</p>
                    </button>
                  )}
                </td>
                <th className="text-center">
                  <div>
                    <button
                      className="font-uiFont text-red-950 bg-green-200 px-2 py-1 rounded-md"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Decline
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_3").close()
                          }
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </button>
                        <form onSubmit={(e) => handleDecline(e, article?._id)}>
                          <label className="font-bold text-sm">
                            Why we are not approved
                          </label>
                          <textarea
                          defaultValue={article?.text && article?.text}
                            name="textarea"
                            className="rounded-md w-full line-clamp-none resize-none mt-2 border-gray-400"
                          ></textarea>
                          <button
                            type="submit"
                            className="text-white w-[40%] rounded-md mt-4 py-2 bg-cyan-600"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </th>
                <td
                  onClick={() => handleDeleteArticles(article?._id)}
                  className="px-6 py-4"
                >
                  <MdDeleteForever className="text-2xl"></MdDeleteForever>
                </td>
                <th className="px-6 py-4">
                  {article?.premium === "isPremium" ? (
                    <p className="p-1 rounded font-bold">Yes</p>
                  ) : (
                    <button
                      onClick={() => handlePremium(article?._id)}
                      className="text-white p-1 rounded font-medium bg-green-400 "
                    >
                      Premium
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
      {/* decline modal */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
    </div>
  );
};

export default DashArticles;
