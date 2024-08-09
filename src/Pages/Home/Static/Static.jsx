import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useAllUsers from "../../../hooks/useAllUsers/useAllUsers";
import usePayment from "../../../hooks/Payment/usePayment";

const Static = () => {
  const [allUser, setAllUsers] = useState(0);
  const [normalUser, setNormalUser] = useState(0);
  const [premiumUser, setPremiumUser] = useState(0);
  const [users] = useAllUsers();
  const [payment] = usePayment();
  console.log(payment);
  useEffect(() => {
    setTimeout(() => {
      if (allUser < users.length) {
        setAllUsers(allUser + 1);
      }
    }, 10);
  }, [allUser]);
  // normal user..
  useEffect(() => {
    setTimeout(() => {
      if (allUser < users.length) {
        setAllUsers(allUser + 1);
      }
    }, 10);
  }, [allUser]);
  // premium user...
  useEffect(() => {
    setTimeout(() => {
      if (premiumUser < payment.length) {
        setPremiumUser(allUser + 1);
      }
    }, 10);
  }, [allUser]);

  return (
    <div className="border-t-2 rounded-t-xl mt-10 bg-[#f7f5f6] border-blue-300">
      <div className="md:w-4/5 lg:w-2/3 w-1/4 gap-5 md:gap-10 grid  md:grid-cols-5 container mx-auto py-14">
        <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            All Users
          </label>

          <CircularProgressbar
            className="drop-shadow-lg"
            value={allUser}
            text={`${allUser}`}
          ></CircularProgressbar>
        </div>
        <div></div>
        <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            Normal Users
          </label>
          <CircularProgressbar
            className="drop-shadow-lg"
            value={allUser}
            text={`${allUser}`}
          />
        </div>
        <div></div>
        <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            Premium Users
          </label>
          <CircularProgressbar
            className="drop-shadow-lg"
            value={allUser}
            text={`${allUser}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Static;
