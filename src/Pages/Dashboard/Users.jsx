import useAllUsers from "../../hooks/useAllUsers/useAllUsers";
import { GrUserManager } from "react-icons/gr";
import { BiSolidEraser } from "react-icons/bi";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
const Users = () => {
  const [users, refetch, isLoading] = useAllUsers();
  const axiosSecure = useAxiosSecure();
  const { user: Users, loading } = useContext(AuthContext);
  const admin = users?.find((user) => user.role === "admin");

  // console.log(loading,isLoading);

  if (isLoading || loading) {
    return <p>Loading.....</p>;
  }

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

  return (
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
          {users?.map((user, index) => (
            <tr
              key={user._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="pl-10">{index + 1}</td>
              <td>
                <img
                  className="w-10 h-10 rounded-full ring"
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
  );
};

export default Users;
