import { Helmet } from "react-helmet";
import CreatableSelect from "react-select/creatable";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import usePublisher from "../../hooks/getPublisher/usePublisher";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import useAllArticles from "../../hooks/useAllArticles/useAllArticles";
const EditArticle = () => {
  const { id } = useParams();
  const [allArticles, refetch, isLoading, error] = useAllArticles();
  const { user } = useContext(AuthContext);
  const userArticles = allArticles?.filter(
    (article) => article?.owner === user?.email
  );
  const [publisher] = usePublisher();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = async (data) => {
    const Articles = {
      title: data.title,
      Description: data.description,
      publisher: data.publisher,
      tags: data.tags,
    };
    const articlesData = await axiosSecure.patch(
      `/EditArticle/${id}`,
      Articles
    );
    if (articlesData.data.modifiedCount > 0) {
      navigate("/my-articles");
      reset();
      swal("Good job!", "Your Article is Update Successfully", "success");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Planet || Add Article</title>
      </Helmet>
      <section className="p-6 bg-gray-100 text-gray-900">
        {userArticles?.map(
          (item) =>
            item?._id === id && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="container font-Fraunces mt-28 mb-20 flex flex-col mx-auto space-y-12"
              >
                <fieldset
                  key={item._id}
                  className="grid grid-cols-6 gap-10 p-6 rounded-md shadow-sm bg-gray-50"
                >
                  <div className="space-y-2 mt-4 col-span-full lg:col-span-3">
                    <img className="rounded-lg" src={item?.image} alt="" />
                  </div>

                  {/* Input Field */}
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full w-full sm:col-span-4">
                      <label
                        htmlFor="firstname"
                        className="text-sm font-semibold"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        defaultValue={item?.title}
                        placeholder="Title"
                        {...register("title")}
                        className="w-full hover:bg-blue-100 rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300"
                      />
                    </div>

                    <div className="col-span-5 sm:col-span-4">
                      <label htmlFor="email" className="text-sm font-semibold">
                        Description
                      </label>
                      <input
                        id="Description"
                        type="text"
                        defaultValue={item?.Description}
                        {...register("description")}
                        placeholder="Description"
                        className="w-full rounded-md hover:bg-blue-100  focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300"
                      />
                    </div>
                    <div className="col-span-4">
                      <label
                        htmlFor="address"
                        className="text-sm font-semibold"
                      >
                        Image
                      </label>
                      <input
                        id="image"
                        type="file"
                        {...register("image")}
                        disabled
                        placeholder="image"
                        className="w-full hover:bg-blue-100  rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300"
                      />
                    </div>
                    <div className="col-span-full  w-full sm:col-span-4">
                      <label
                        htmlFor="firstname"
                        className="text-sm font-semibold"
                      >
                        Publisher
                      </label>

                      <select
                        {...register("publisher")}
                        defaultValue={item?.publisher}
                        name="publisher"
                        className="w-full hover:bg-blue-100 rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300 mt-2"
                      >
                        {publisher?.map((pub) => (
                          <option
                            defaultValue={item?.publisher}
                            key={pub._id}
                            value={pub?.name}
                          >
                            {pub?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-full w-full sm:col-span-4">
                      <label htmlFor="Tags" className="text-sm font-semibold">
                        Tags
                      </label>
                      <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                          <CreatableSelect {...field} isMulti />
                        )}
                      />
                    </div>
                    <br />
                    <div className="col-span-full w container space-x-4 sm:col-span-2">
                      <button
                        type="submit"
                        className="my-4 w-full p-2 px-6 font-semibold rounded bg-blue-500 hover:bg-blue-300 hover:text-black shadow-lg text-gray-100"
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            )
        )}
      </section>
    </div>
  );
};

export default EditArticle;
