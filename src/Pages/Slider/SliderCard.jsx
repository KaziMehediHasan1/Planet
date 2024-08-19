import { useContext } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import usePayment from "../../hooks/Payment/usePayment";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SliderCard = ({ article }) => {
  const { title, image, Description, _id, isPremium } = article;
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [payment] = usePayment();
  const navigate = useNavigate();
  const subscriber = payment?.some((sub) => sub.email === user?.email);
  // console.log(subscriber);

  const handleDetails = async (e) => {
    navigate(`/articleDetails/${e}`);
    await axiosSecure.put(`/viewCount/${e}`).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="mt-[65px]">
      <div
        className="hero h-[750px]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-uiFont font-semibold ">
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
