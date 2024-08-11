import { useContext } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import LottieImag from "../../assets/login.json";
const Register = () => {
  const { createUser, updateUser, GoogleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUser(data.name, data.photoURL).then(() => {
        const userInfo = {
          email: data?.email,
          name: data?.name,
          image: data?.photoURL,
        };
        axiosPublic
          .post(`${import.meta.env.VITE_SERVER_URL}/users`, userInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              toast.success("Account Register Successful");
            }
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
      navigate(location?.state ? location.state : "/");
    });
  };

  const handleGoogleLogin = () => {
    GoogleLogin().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        image: result.user?.photoURL,
      };
      axiosPublic
        .post(`${import.meta.env.VITE_SERVER_URL}/users`, userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            toast.success("Google login successful");
          }
          navigate(location?.state ? location.state : "/");
        });
    });
  };

  return (
    <div className="flex justify-between max-w-screen-xl mx-auto border shadow-sm p-10 mt-10">
      <div className="  rounded-md ">
        <Lottie animationData={LottieImag}></Lottie>
      </div>
      <div className="flex flex-col rounded-lg w-full max-w-md my-32 p-12 space-y-4 text-center bg-gray-100 text-gray-800">
        <Helmet>
          <title>Planet || Create Account</title>
        </Helmet>
        <h1 className="text-3xl font-semibold">Create a new account</h1>
        <div className="text-sm text-gray-600">
          Have an account? please
          <Link className="hover:underline ml-1" to="/login">
            Sign In
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            {/* name field */}
            <label htmlFor="email" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className=" border-gray-400 rounded-t-md bg-gray-50 text-gray-800"
            />
            {errors.name && (
              <span className="text-blue-400 inline-flex">
                Name is required
              </span>
            )}

            {/* photURL */}
            <label htmlFor="email" className="sr-only">
              Photo
            </label>
            <input
              id="Photo"
              type="url"
              {...register("photoURL", { required: true })}
              placeholder="Photo"
              className=" border-gray-400 bg-gray-50 text-gray-800"
            />
            {errors.photoURL && (
              <span className="text-blue-400 inline-flex">
                PhotoURL is required
              </span>
            )}
            {/* mail field */}
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className="border-gray-400 bg-gray-50 text-gray-800"
            />
            {errors.email && (
              <span className="text-blue-400 inline-flex">
                Email is required
              </span>
            )}
            {/* password field */}
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s)/,
              })}
              className="-mt-1 rounded-b-md border-gray-400 bg-gray-50 text-gray-800"
            />
            {errors.password?.type === "required" && (
              <span className="text-blue-400 inline-flex">
                Password is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-blue-400 inline-flex">
                password must be at least 8 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-blue-400 inline-flex">
                password must have one Uppercase one lower case, one number and
                one special character.
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("remember")}
                id="remember"
                aria-label="Remember me"
                className="mr-1 rounded-sm focus:ring-sky-600 focus:border-sky-600 focus:ring-2 accent-sky-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a className="text-sm text-gray-600">Forgot your password?</a>
          </div>
          <input
            className="px-8 py-3 space-x-2 cursor-pointer font-semibold w-full rounded-md bg-orange-400 text-gray-50"
            type="submit"
            value="Sign Up"
          />
        </form>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center cursor-pointer justify-center px-2 rounded-md py-2 space-x-4 font-semibold w-full bg-white"
        >
          <FcGoogle className="text-3xl" /> <span>Login With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
