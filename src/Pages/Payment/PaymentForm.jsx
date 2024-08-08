import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import usePlan from "../../hooks/Plan/usePlan";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ id }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState();
  const axiosSecure = useAxiosSecure();
  const [plan] = usePlan();
  const money = plan.find((item) => item?._id === id.id);
  const prices = parseInt(money?.money);
  useEffect(() => {
    if (prices > 0) {
      axiosSecure.post("/create-payment-intent", { prices }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, prices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment..
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          price: prices,
          transactionId: paymentIntent.id,
          date: new Date(),
          planId: plan.find((item) => item?._id === id.id && item?._id),
          status: "pending",
        };
        const res = await axiosSecure.post("/payment", payment);
        console.log(res.data);
        if (res.data?.insertedId) {
          swal("Good job!", "You payment success!", "success");
          navigate("/premiumArticles");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="w-full btn-sm btn btn-primary mt-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-500">Your transaction id:{transactionId}</p>
      )}
    </form>
  );
};

export default PaymentForm;
