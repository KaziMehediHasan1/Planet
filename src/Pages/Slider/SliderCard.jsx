import { Link } from "react-router-dom";

const SliderCard = ({ article }) => {
  const { title, image, Description } = article;
  return (
    <div className="mt-[65px]">
      <div
        className="hero h-[750px]"
        style={{
          backgroundImage:
            `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5">
              {Description?.slice(0,150)}..
            </p>
            <Link to={`/articleDetails/${article?._id}`} className="btn btn-primary ">Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
