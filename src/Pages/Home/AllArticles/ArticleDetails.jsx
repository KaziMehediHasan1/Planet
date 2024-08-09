import { useParams } from "react-router-dom";
import useArticles from "../../../hooks/useArticles/useArticles";
import { Helmet } from "react-helmet";
import { useState } from "react";

const ArticleDetails = () => {
  const [articles] = useArticles();
  const { id } = useParams();
  // const [counter, setCounter] = useState(1);
  console.log(id);

  return (
    <div>
      <Helmet>
        <title>Planet | Article Details</title>
      </Helmet>
      {articles?.map(
        (article) =>
          article._id === id && (
            <div key={article._id}>
              <div className="max-w-screen-xl mx-auto">
                <img
                  className="sm:w-2/3 w-2/3 py-28 mx-auto"
                  src={article?.image}
                />
                <div className="sm:px-14 px-14">
                  <div className="mb-10">
                    <h2 className="text-4xl font-semibold">{article?.title}</h2>
                    <p className="pt-10 text-lg">{article?.Description}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2 className="text-2xl font-semibold">Publisher:</h2>
                    <p className="text-2xl">{article?.publisher}</p>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default ArticleDetails;
