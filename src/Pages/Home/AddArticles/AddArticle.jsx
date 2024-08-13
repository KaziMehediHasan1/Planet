import { Helmet } from "react-helmet";
import CreatableSelect from "react-select/creatable";
import img from "../../../assets/addArticle.json";
import swal from "sweetalert";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import usePublisher from "../../../hooks/getPublisher/usePublisher";
import Lottie from "lottie-react";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticle = () => {
  const axiosPublic = useAxiosPublic();
  const [publisher, isLoading] = usePublisher();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const Articles = {
        title: data.title,
        Description: data.description,
        image: res.data.data.display_url,
        publisher: data.publisher,
        tags: data.tags,
        owner: user?.email,
      };
      const articlesData = await axiosSecure.post("/articles", Articles);
      if (articlesData.data.insertedId) {
        navigate("/my-articles");
        reset();
        swal("Good job!", "Your Article is Submit Successfully", "success");
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Planet || Add Article</title>
      </Helmet>
      <section className="p-6 bg-gray-100 text-gray-900 font-uiFont">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container  mt-14 flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-6 gap-10 p-6 rounded-md shadow-sm bg-gray-50 ">
            <div className="space-y-2 max-lg:w-96 mt-4 lg:col-span-3">
              <Lottie animationData={img}></Lottie>
            </div>

            {/* Input Field */}
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full w-full sm:col-span-4">
                <label htmlFor="firstname" className="text-sm font-semibold">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
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
                  {...register("description", { required: true })}
                  placeholder="Description"
                  className="w-full rounded-md hover:bg-blue-100  focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300"
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="address" className="text-sm font-semibold">
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  {...register("image", { required: true })}
                  placeholder="image"
                  className="w-full hover:bg-blue-100  rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300"
                />
              </div>
              <div className="col-span-full  w-full sm:col-span-4">
                <label htmlFor="firstname" className="text-sm font-semibold">
                  Publisher
                </label>

                <select
                  {...register("publisher", { required: true })}
                  name="publisher"
                  className="w-full hover:bg-blue-100 rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300 mt-2"
                >
                  {publisher?.map((pub) => (
                    <option key={pub._id} value={pub?.name}>
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
                  rules={{ required: true }}
                  name="tags"
                  control={control}
                  render={({ field }) => <CreatableSelect {...field} isMulti />}
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
      </section>
    </div>
  );
};

export default AddArticle;
