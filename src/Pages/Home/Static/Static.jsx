import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useAllUsers from "../../../hooks/useAllUsers/useAllUsers";

const Static = () => {
  const [users, refetch, isLoading, error] = useAllUsers();
  const [counts, setCounts] = useState({
    allUsers: 0,
    normalUsers: 0,
    premiumUsers: 0,
  });
  // console.log(users.length);

  useEffect(() => {
    if (users) {
      const total = users.length;
      const normal = users.filter(user => !user.isPremium).length;
      const premium = users.filter(user => user.isPremium).length;

      setCounts({
        allUsers: total,
        normalUsers: normal,
        premiumUsers: premium,
      });
    }
  }, [users]);

  return (
    <div className="border-t-2 rounded-t-xl mt-10 bg-[#f7f5f6] border-blue-300">
      <div className="md:w-4/5 lg:w-2/3 w-1/4 gap-5 md:gap-10 grid  md:grid-cols-5 container mx-auto py-14">
        <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            All Users
          </label>

          <CircularProgressbar
            className="drop-shadow-lg"
            value={counts}
            text={`${counts.allUsers}%`}
          ></CircularProgressbar>
        </div>
        <div></div>
        {/* <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            Normal Users
          </label>
          <CircularProgressbar
            className="drop-shadow-lg"
            value={percentage}
            text={`${percentage}%`}
          />
        </div> */}
        <div></div>
        {/* <div className="text-center space-y-5">
          <label className="lg:text-2xl sm:text-xs font-medium inline-block">
            Premium Users
          </label>
          <CircularProgressbar
            className="drop-shadow-lg"
            value={percentage}
            text={`${percentage}%`}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Static;
