import { Link } from "react-router-dom";

const SliderCard = ({ article }) => {
  const { title, image, Description } = article;
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
              {title?.slice(0,80)}..
            </h1>
            <p className="mb-5 font-uiFont font-medium">
              {Description?.slice(0, 150)}..
            </p>
            <Link
              to={`/articleDetails/${article?._id}`}
              className="btn font-uiFont font-semibold bg-yellow-50 text-lg hover:text-white"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
