import { Link, useParams } from "react-router-dom";
import planet from "../../assets/planetPay.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { FaGooglePay } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
import { RiVisaFill } from "react-icons/ri";
import { GrAmex } from "react-icons/gr";
import { LiaCcJcb } from "react-icons/lia";
import { SiDiscover } from "react-icons/si";
import { Helmet } from "react-helmet";
import usePlan from "../../hooks/Plan/usePlan";
import { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
// console.log(stripePromise);

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [plan] = usePlan();
  const id = useParams();
  return (
    <div className="pt-28 max-w-screen-lg mx-auto">
      <Helmet>
        <title>Planet | Payment</title>
      </Helmet>
      {/* logo & title */}
      <div>
        <div className="space-y-6 text-center">
          <div className="w-32 avatar">
            <img src={planet} />
          </div>
          <h1 className="text-2xl font-semibold">Payment</h1>
        </div>
        {/*   */}
        <div className="flex justify-center bg-gray-100 p-4 max-w-screen-md mx-auto mt-6 rounded-sm">
          <p className="text-sm">You are signed up with. email </p>
          <Link className="underline text-sm">Not you?</Link>
        </div>
        {/* member card */}
        <div className="border rounded-md mt-8 max-w-screen-md mx-auto p-6">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
          <div>
            <section className="flex items-center mt-3">
              <p className="text-xl font-semibold">
                Planet Membership (annual)
              </p>
              <Link to="/subscription" className="underline ml-4">
                Change plan
              </Link>
            </section>
            <hr className=" mt-4" />
            {plan?.map(
              (data) =>
                data?._id === id.id && (
                  <section className="max-w-screen-sm mt-6 space-y-5">
                    <div className="flex justify-between">
                      <p>Subscription price</p>
                      <p>
                        <p>${data?.money}</p>
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>
                        <del>10% discount for a year</del>
                      </p>
                      <p>--</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Billed Today</p>
                      <p>${data?.money}</p>
                    </div>
                  </section>
                )
            )}
          </div>
        </div>
        {/* Payment Section... */}
        <div className="border rounded-md mt-8 max-w-screen-md mx-auto p-6">
          <h1 className="text-xl font-semibold">Pay with</h1>
          <div className="flex justify-between items-center mt-4">
            <SlPaypal className="w-full bg-[#0070ba] text-4xl p-2 text-white text-center"></SlPaypal>
            <FaGooglePay className="w-full text-4xl bg-gray-200 rounded-sm ml-3"></FaGooglePay>
          </div>
          <hr className=" mt-8" />
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              Pay with credit or debit card
            </h2>
            <div className="flex space-x-5 mt-4">
              <RiVisaFill className="text-4xl"></RiVisaFill>
              <GrAmex className="text-4xl"></GrAmex>
              <LiaCcJcb className="text-4xl"></LiaCcJcb>
              <SiDiscover className="text-4xl"></SiDiscover>
            </div>
          </div>
          {/* payment card */}
          <div className="mt-8">
            <Elements stripe={stripePromise}>
              <PaymentForm id={id}></PaymentForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
