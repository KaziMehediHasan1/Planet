import { createBrowserRouter } from "react-router-dom";
import Login from "../Component/Authentication/Login";
import Register from "../Component/Authentication/Register";
import Main from "../Pages/Main/Main";
import Home from "../Pages/Home/Home";
import Error from "../Component/Authentication/Error";
import AddArticle from "../Pages/Home/AddArticles/AddArticle";
import PrivateRoutes from "./PrivateRoutes";
import AllArticles from "../Pages/Home/AllArticles/AllArticles";
import Dashboard from "../Pages/Main/Layout/Dashboard";
import DashArticles from "../Pages/Dashboard/DashArticles";
import DashPublisher from "../Pages/Dashboard/DashPublisher";
import Users from "../Pages/Dashboard/Users";
import Subscription from "../Pages/Subscription/Subscription";
import PremiumArticle from "../Pages/PremiumArticle/PremiumArticle";
import MyArticles from "../Pages/MyArticle/MyArticles";
import AdminRoute from "./AdminRoutes/AdminRoute";
import Profile from "../Pages/Profile/Profile";
import ArticleDetails from "../Pages/Home/AllArticles/ArticleDetails";
import EditArticle from "../Pages/MyArticle/EditArticle";
import Payment from "../Pages/Payment/Payment";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import PaymentDetails from "../Pages/Payment/paymentPage/PaymentDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-articles",
        element: (
          <PrivateRoutes>
            <AddArticle></AddArticle>
          </PrivateRoutes>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/articleDetails/:id",
        element: (
          <PrivateRoutes>
            <ArticleDetails></ArticleDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoutes>
            <Subscription></Subscription>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoutes>
            <Payment></Payment>
          </PrivateRoutes>
        ),
      },
      {
        path: "/premiumArticles",
        element: (
          <PrivateRoutes>
            <PremiumArticle></PremiumArticle>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment-page",
        element: (
          <PrivateRoutes>
            <PaymentDetails></PaymentDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoutes>
            <MyArticles></MyArticles>
          </PrivateRoutes>
        ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/editArticle/:id",
        element: (
          <PrivateRoutes>
            <EditArticle> </EditArticle>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true,
        element: <Statistics></Statistics>,
      },
      {
        path: "DashArticles",
        element: (
          <AdminRoute>
            <DashArticles></DashArticles>
          </AdminRoute>
        ),
        loader: () => fetch(`${import.meta.env.VITE_SERVER_URL}/articleCount`),
      },

      {
        path: "DashPublisher",
        element: (
          <AdminRoute>
            <DashPublisher></DashPublisher>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
        loader: () => fetch(`${import.meta.env.VITE_SERVER_URL}/dashUser`),
      },
    ],
  },
]);
