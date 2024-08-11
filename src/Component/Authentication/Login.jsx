import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
const Login = () => {
  const { LoginUser, GoogleLogin, resetPassword } =
    useContext(AuthContext);
  const [email, setEmail] = useState();
  const [disabled, setDisabled] = useState(true);
  const axiosPublic = useAxiosPublic();
  const captchaRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setEmail(email);
    LoginUser(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        if (loggedInUser) {
          toast.success("Login Successful");
        }
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login Failed");
      });
  };

  

  // reset password
  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first");
    try {
      await resetPassword(email);
      toast.success("Request Success! Check your email for further process");
    } catch (error) {
      console.log(error.message);
    }
  };
  // captcha..
  const handleValidateCaptcha = () => {
    const captchaValue = captchaRef.current.value;
    if (validateCaptcha(captchaValue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
          if (res.data) {
            toast.success("Google Login Successful");
            navigate(location?.state ? location.state : "/");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  return (
    <div className="flex flex-col border-blue-600 shadow-2xl shadow-blue-700 rounded-lg w-full max-w-md p-12 container mx-auto my-32 space-y-4 text-center bg-gray-100 text-gray-800">
      <Helmet>
        <title>Planet || Login</title>
      </Helmet>
      <h1 className="text-3xl font-semibold">Sign in to your account</h1>
      <div className="text-sm text-gray-600">
        You have no account? Please
        <Link className="hover:underline ml-1" to="/register">
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          {/* mail field */}
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="border-gray-400 rounded-t-md bg-gray-50 text-gray-800"
          />

          {/* password field */}
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            className="-mt-1 rounded-b-md border-gray-400 bg-gray-50 text-gray-800"
          />

          <span htmlFor="password" className="sr-only">
            Captcha
          </span>
          <input
            id="captcha"
            type="text"
            ref={captchaRef}
            placeholder="Type Captcha"
            name="captcha"
            required
            className="-mt-1 rounded-b-md border-gray-400 bg-gray-50 text-gray-800"
          />

          <span className="flex justify-between items-center py-4">
            <LoadCanvasTemplate />
            <button
              onClick={handleValidateCaptcha}
              className="px-3 py-2 text-xs font-medium text-center hover:text-white bg-orange-200 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              validate
            </button>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              aria-label="Remember me"
              className="mr-1 rounded-sm focus:ring-sky-600 focus:border-sky-600 focus:ring-2 accent-sky-600"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <Link onClick={handleResetPassword} className="text-sm text-gray-600">
            Forgot your password?
          </Link>
        </div>
        <button
          disabled={disabled}
          className="btn px-8 py-3 space-x-2 font-semibold w-full rounded-md bg-orange-400 text-gray-50"
        >
          Sign In
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center px-2 rounded-md py-2 space-x-4 font-semibold w-full bg-white"
      >
        <FcGoogle className="text-3xl" /> <span>Login With Google</span>
      </button>
    </div>
  );
};

export default Login;
