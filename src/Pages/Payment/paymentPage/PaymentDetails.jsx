import React, { useContext } from "react";
import usePayment from "../../../hooks/Payment/usePayment";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import { format } from 'date-fns';
const PaymentDetails = () => {
  const [payment] = usePayment();

  const { user } = useContext(AuthContext);
  return (
    <div className="overflow-x-auto max-w-screen-xl mx-auto md:px-5 lg:px-0">
      <div className="container p-2 mx-auto sm:p-4 text-gray-800 mt-20 font-uiFont">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-gray-200 text-purple-800 rounded-sm">
              <tr className="text-left">
                <th className="p-3  text-center text-[18px]">User</th>
                <th className="p-3  text-center text-[18px]">status</th>
                <th className="p-3  text-center text-[18px]">Amount</th>
                <th className="p-3  text-center text-[18px]">trans. ID</th>
                <th className="p-3  text-center text-[18px]">Started Date</th>
                <th className="p-3  text-center text-[18px]">End Date</th>
              </tr>
            </thead>
            <tbody>
              {payment?.map(
                (item) =>
                  item.email === user?.email && (
                    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                      <td className="p-3 text-center">
                        <p className="text-[13px]">{item?.email}</p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="bg-blue-500 py-1 rounded-sm text-center text-white text-[13px]">
                          {item?.status}
                        </p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="text-[13px]">${item?.price}</p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="text-[13px]">{item?.transactionId}</p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="text-[13px]">
                          {new Date(item?.date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="text-[13px]">
                          {new Date(item?.planId?.subscriptionEnd)}
                        </p>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
