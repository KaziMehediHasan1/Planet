import { useContext } from "react";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import useArticles from "../../../hooks/useArticles/useArticles";
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const DashMyArticles = () => {
  const [articles, refetch, isLoading, error] = useArticles();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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

  return (
    <div className="md:ml-16">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Serial
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Edit 
              </th>

              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => (
              <>
                {article?.owner === user?.email ? (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10"
                        src={article.image}
                        alt="Jese image"
                      />
                    </th>
                    <th>
                      <div className="ps-3 text-base font-semibold">
                        {article.title}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {article.status === "Approved" ? (
                          <p className="text-green-700">Approved</p>
                        ) : (
                          <p className="text-red-600">Pending now</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/editArticle/${article._id}`}>
                        <HiOutlinePencilAlt className="text-2xl"></HiOutlinePencilAlt>
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDeleteArticles(article._id)}
                      className="px-6 py-4"
                    >
                      <MdDeleteForever className="text-2xl"></MdDeleteForever>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashMyArticles;
