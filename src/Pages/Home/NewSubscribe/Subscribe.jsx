import React from "react";
import { toast } from "react-toastify";

const Subscribe = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.target.email.value;
    if (form) {
      toast.success("Thank you for subscribing to our newsletter");
      form.reset();
    }
  };
  return (
    <div className="mt-14  p-16 bg-slate-200">
      <section className="flex flex-col max-w-screen-lg mx-auto overflow-hidden bg-blue-100 rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-52 font-uiFont font-medium">
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
          <div className="px-6 py-6 md:px-8 md:py-0 ">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
              Subscribe
              <span className="text-blue-600 dark:text-blue-400 md:text-blue-300 ml-2">
                Planet
              </span>{" "}
              take Daily NewsLatter update
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
              please given your mail and we are daily update our blogs send your
              mail
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
          <form onSubmit={handleSubscribe}>
            <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                type="text"
                name="email"
                placeholder="planetAdmin@gmail.com"
                aria-label="Enter your email"
              />

              <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Subscribe;
