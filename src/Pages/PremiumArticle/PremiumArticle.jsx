import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import useArticles from "../../hooks/useArticles/useArticles";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Box,
  Card,
  Inset,
  Strong,
  Text,
} from "@radix-ui/themes/dist/cjs/index.js";

const PremiumArticle = () => {
  const [articles, isLoading, error] = useArticles();

  if (isLoading) {
    <h1 className="text-black">Loading....</h1>;
  }
  if (error) {
    <span>Error:{error.message}</span>;
  }
  const approvedArticles = articles?.filter(
    (article) => article?.status === "Approved"
  );
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 500,
    });
  }, []);
  return (
    <div className="pb-16">
      <Helmet>
        <title>Planet | Premium-Articles</title>
      </Helmet>
      <div className="pt-28 md:max-w-screen-2xl md:mx-auto ">
        <div className=" border border-gray-400 shadow-lg rounded-md px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:gap-2 sm:gap-5 mt-14">
            {approvedArticles?.map(
              (article) =>
                article?.premium === "isPremium" && (
                  <Box className="w-80 h-[480px]"   data-aos="fade-bottom">
                    <Card size="2" className="w-80 h-[290px]">
                      <Inset clip="padding-box" side="top" pb="current">
                        <img
                          src={article?.image}
                          alt="Bold typography"
                          style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 140,
                            backgroundColor: "var(--gray-5)",
                          }}
                        />
                      </Inset>
                      <Text className="" as="p" size="3">
                        <Strong>{article?.title.slice(0, 40)}</Strong>{" "}
                        {article?.Description.slice(0, 80)}
                      </Text>
                    </Card>
                  </Box>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticle;
