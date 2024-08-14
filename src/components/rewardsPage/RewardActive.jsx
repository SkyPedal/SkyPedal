import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RewardActive = ({ reward, statusSetter }) => {
  const { rewardName, rewardId, userId, dateRedeemed, dateExpiry, hasUsed, id } = reward;
  const [date, setDate] = useState(null);

  console.log("rewardId is ", rewardId);
  console.log("id is ", id);
  statusSetter("activate");

  // function today() {
  //     var d = new Date(),
  //       month = "" + (d.getMonth() + 1),
  //       day = "" + d.getDate(),
  //       year = d.getFullYear();

  //     if (month.length < 2) month = "0" + month;
  //     if (day.length < 2) day = "0" + day;

  //     return [year, month, day].join("-");
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    });

    return () => clearInterval(interval);
  }, []);

  // figure out how to calculate remaining time on the voucher!
  // also I think the new time rn is calculated every second, whoops!

  // console.log("date expiry ", dateExpiry)
  // console.log("date today ", date)

  // rewardTimeRemainingSec = Math.floor((dateExpiry - date) / 1000);
  // rewardTimeRemainingMin = Math.floor(rewardTimeRemainingSec / 60);
  // rewardTimeRemainingHour = Math.floor(rewardTimeRemainingMin / 60);

  return (
    <tr>
      <td className="rounded-l-lg bg-slate-200 py-1 hover:bg-red-100 hover:underline">
        <Link to={`/rewards/${rewardId}`}>{rewardName}</Link>
      </td>
      {/* <td >Expires in: {rewardTimeRemainingHour>0 ? rewardTimeRemainingHour + " hours" : rewardTimeRemainingMin>0 ? rewardTimeRemainingMin + " mins" : rewardTimeRemainingSec + " seconds" }</td> */}
      <td className="rounded-r-lg bg-slate-200">{dateExpiry.replace("T", " ").slice(0,16)}</td>
    </tr>
  );
};

export default RewardActive;
