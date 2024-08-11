import usePublisher from "../../../hooks/getPublisher/usePublisher";
import React from "react";
import {  Cursor, Typewriter } from "react-simple-typewriter";
const AllPublisher = () => {
  const [publisher] = usePublisher();
  const publishers = publisher?.slice(0, 4);
 
  return (
    <div>
      <section className=" p-28">
        <h2 className="text-2xl font-semibold text-center capitalize lg:text-4xl dark:text-white">
          Publishers{" "}
          <span className="text-bold text-green-500">
            <Typewriter
              words={[
                "IndiaTv",
                "The Essential List",
                "Tech Decoded",
                "Future Earth",
              ]}
              loop={5}
            ></Typewriter>
          </span>{" "}
          <Cursor></Cursor>
        </h2>
        <div className="md:max-w-screen-xl mx-auto px-6 py-8 ">
          <p className="text-center">
            Planet collaborates with a wide range of publishers to bring you the
            latest news and insights. From global news agencies to independent
            journalists, we ensure diverse and comprehensive coverage. Our
            commitment to quality journalism means we partner with trusted
            sources to deliver accurate and timely information. Stay informed
            with Planet, where a multitude of publishers contribute to our
            dynamic news ecosystem.
          </p>
          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publishers?.map((publisher) => (
              <div
                key={publisher._id}
                className="w-full max-w-xs bg-slate-500 p-4 rounded-md text-white text-center"
              >
                <img
                  className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                  src={publisher?.logo}
                  alt="avatar"
                />

                <h3 className="text-lg mt-5 font-medium  dark:text-gray-200">
                  {publisher?.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllPublisher;
