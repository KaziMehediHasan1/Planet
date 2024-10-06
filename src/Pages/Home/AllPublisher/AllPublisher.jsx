import usePublisher from "../../../hooks/getPublisher/usePublisher";
import React, { useEffect } from "react";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "aos/dist/aos.css";
import AOS from "aos";
const AllPublisher = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay:500,
    });
  }, []);
  const [publisher] = usePublisher();
  const publishers = publisher?.slice(0, 4);

  return (
    <div>
      <section className=" lg:p-28 md:p-16 p-6">
        <h2 className="text-2xl font-semibold text-center capitalize lg:text-4xl dark:text-white font-uiFont">
          Publishers{" "}
          <span className="text-bold text-green-500 font-uiFont">
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
        <div className="md:px-6 py-8 ">
          <p className="text-center font-uiFont font-medium">
            Planet collaborates with a wide range of publishers to bring you the
            latest news and insights. From global news agencies to independent
            journalists, we ensure diverse and comprehensive coverage. Our
            commitment to quality journalism means we partner with trusted
            sources to deliver accurate and timely information. Stay informed
            with Planet, where a multitude of publishers contribute to our
            dynamic news ecosystem.
          </p>
          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4 ">
            {publishers?.map((publisher) => (
              <div
                key={publisher._id}
                className="w-full lg:max-w-xs bg-slate-300 p-4 rounded-md text-white text-center"
                data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <img
                  className="object-cover object-center w-full h-44 mx-auto rounded-lg"
                  src={publisher?.logo}
                  
                />

                <h3 className="text-lg mt-5 font-medium text-black  dark:text-gray-200 font-uiFont">
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
