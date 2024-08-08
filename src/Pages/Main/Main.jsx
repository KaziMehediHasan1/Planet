import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/NavBar/Navbar";
import Footer from "../Shared/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <div className="min-h-[calc(100vh-314px)]">
        <Outlet></Outlet>
      </div>
      {noHeaderFooter || <Footer></Footer>}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      ></ToastContainer>
    </div>
  );
};

export default Main;
