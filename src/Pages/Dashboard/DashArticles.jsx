import useArticles from "../../hooks/useArticles/useArticles";
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
const DashArticles = () => {
  const [articles, refetch, isLoading, error] = useArticles();
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
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10"
                    src={article?.image}
                    alt="Jese image"
                  />
                </th>
                <th>
                  <div className="ps-3 text-base font-semibold">
                    {article.title?.slice(0, 80)}..
                  </div>
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
                <td
                  onClick={() => handleDeleteArticles(article?._id)}
                  className="px-6 py-4"
                >
                  <MdDeleteForever className="text-2xl"></MdDeleteForever>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashArticles;
