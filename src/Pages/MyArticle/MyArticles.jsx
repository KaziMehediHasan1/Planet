import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import useAllArticles from "../../hooks/useAllArticles/useAllArticles";

const MyArticles = () => {
  const [allArticles, refetch, isLoading, error] = useAllArticles();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userArticles = allArticles?.filter(
    (article) => article?.owner === user?.email
  );

  if (isLoading) {
    <h1 className="text-black">Loading....</h1>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  const handleDeleteArticles = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/allArticles/${id}`).then((res) => {
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

  return (
    <div className="p-10">
      <div className="relative shadow-md sm:rounded-lg mt-16 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-uiFont">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Serial
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                details
              </th>
              <th scope="col" className="px-6 py-3">
                Premium
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Decline
              </th>
              <th scope="col" className="px-6 py-3">
                Decline reason
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {userArticles?.map((article, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 ring rounded-lg"
                    src={article?.image}
                    alt="Jese image"
                  />
                </th>
                <th>
                  <div className="ps-3 text-base font-semibold md:inline-table">
                    {article?.title.slice(0, 80)}..
                  </div>
                </th>
                <th className="px-6 py-4">
                  <Link
                    to={`/articleDetails/${article?._id}`}
                    className=" bg-cyan-600 text-white p-1 rounded font-medium"
                  >
                    Details
                  </Link>
                </th>
                <th className="px-6 py-4 text-center">
                  {article?.premium === "isPremium" ? (
                    <p className="p-1 rounded font-bold text-center">Yes</p>
                  ) : (
                    <p className="text-center">No</p>
                  )}
                </th>

                <td className="px-6 py-4">
                  {article?.status === "Approved" ? (
                    <p className="font-bold text-green-800">Approved</p>
                  ) : (
                    <p className="text-red-700 font-bold">Pending..</p>
                  )}
                </td>
                <th className="text-center">
                  <div className="ps-3 text-base font-semibold md:inline-table">
                    {article?.text && (
                      <p className="font-uiFont text-red-950 bg-green-200 px-2 rounded-md text-sm py-1">
                        Decline
                      </p>
                    )}
                  </div>
                </th>
                <th className="text-center">
                  {article?.text && (
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
                          <form>
                            <label className=" text-sm font-bold">
                              Why Admin are not approved ?
                            </label>
                            <p className="mt-8 bg-blue-400 p-10 text-white rounded-md">
                              {article?.text}
                            </p>
                          </form>
                        </div>
                      </dialog>
                    </div>
                  )}
                </th>
                <td
                  onClick={() => handleDeleteArticles(article?._id)}
                  className="px-6 py-4 cursor-pointer"
                >
                  <MdDeleteForever className="text-3xl bg-red-600 text-white rounded p-1"></MdDeleteForever>
                </td>
                <th className="px-6 py-4">
                  <Link
                    to={`/editArticle/${article?._id}`}
                    className="bg-cyan-600 text-white p-1 rounded font-medium"
                  >
                    Update
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
