import { useParams } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const ArticleDetails = () => {
  const [articles] = useArticles();
  const { id } = useParams();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 500,
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Planet | Article Details</title>
      </Helmet>
      <div className="max-w-screen-xl mx-auto mb-10 font-uiFont">
        <div>
          {articles?.map(
            (article) =>
              article._id === id && (
                <div key={article._id}>
                  <img
                    className="sm:w-2/3 w-2/3 py-28 mx-auto"
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    src={article?.image}
                  />
                  <div className="sm:px-14 px-14">
                    <div className="mb-10">
                      <h2 className="text-4xl font-medium capitalize">
                        {article?.title}
                      </h2>
                      <div className="flex gap-2 mt-5">
                        <h2 className="text-2xl font-semibold text-blue-800">
                          Publisher:
                        </h2>
                        <p className="text-2xl text-green-600 hover:underline">
                          {article?.publisher}
                        </p>
                      </div>
                      <p className="pt-10  font-medium text-xl">
                        {article?.Description}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
