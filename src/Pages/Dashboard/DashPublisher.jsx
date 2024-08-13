import { useForm } from "react-hook-form";
import img from "../../assets/publisher.jpg";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_PUBLISHER_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const DashPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const publisher = {
        name: data.name,
        logo: res.data.data.display_url,
      };
      const articlesData = await axiosSecure.post("/publisher", publisher);
      if (articlesData.data.insertedId) {
        reset();
        swal("Good job!", "Publisher Added Successfully", "success");
      }
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto font-uiFont">
      <div className=" p-5 mt-10 ">
        <img className="ml-32" src={img} alt="" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5 "
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">Publisher Name</label>
            <input
              {...register("name", { required: true })}
              className=" p-2  rounded-md border border-cyan-400"
              placeholder="Publisher Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">Category</label>
            <div>
              <input
                id="image"
                type="file"
                {...register("image", { required: true })}
                placeholder="image"
                className="w-full bg-blue-100  rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-sky-600 border-gray-300 "
              />
            </div>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-md col-span-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashPublisher;
