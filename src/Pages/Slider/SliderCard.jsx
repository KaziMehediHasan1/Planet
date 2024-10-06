import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const SliderCard = ({ article }) => {
  const { title, image, Description, _id } = article;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleDetails = async (e) => {
    navigate(`/articleDetails/${e}`);
    await axiosSecure.put(`/viewCount/${e}`).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="mt-[64px] h-[500px] lg:h-[700px] ">
      <div
        className="hero h-[750px]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div>
            <h1 className="md:mb-5 mb-0 lg:text-4xl md:text-3xl text-xl font-uiFont font-semibold">
              {title?.slice(0, 80)}..
            </h1>
            <p className="mb-5 font-uiFont font-medium">
              {Description?.slice(0, 150)}..
            </p>
            <button
              onClick={() => handleDetails(_id)}
              className=" rounded-md py-2 font-uiFont font-semibold bg-gray-950 text-lg px-4"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
