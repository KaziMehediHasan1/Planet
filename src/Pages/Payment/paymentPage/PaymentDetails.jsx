import React from "react";
import usePayment from "../../../hooks/Payment/usePayment";

const PaymentDetails = () => {
  const [payment] = usePayment();
  console.log(payment);
  return (
    <div className="overflow-x-auto max-w-screen-lg mx-auto ">
      <table className="table mt-28 bg-cyan-300">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Subscription type</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {payment?.map((tk, index) => {
            <tr key={tk?._id}>
              <th></th>
              <td>{index + 1}</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          })} 
        </tbody>
      </table>
    </div>
  );
};

export default PaymentDetails;
