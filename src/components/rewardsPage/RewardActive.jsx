import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RewardActive = ({ reward }) => {
  const { rewardName, rewardId, userId, dateRedeemed, dateExpiry, hasUsed, id } = reward;

  return (
    
    <tr>
      
      <td className="rounded-l-lg bg-slate-200 py-1 hover:bg-red-100 hover:underline">
      <Link to={`/rewards/${rewardId}/activate/${id}`}>{rewardName}</Link>
      </td>
      {/* <td >Expires in: {rewardTimeRemainingHour>0 ? rewardTimeRemainingHour + " hours" : rewardTimeRemainingMin>0 ? rewardTimeRemainingMin + " mins" : rewardTimeRemainingSec + " seconds" }</td> */}
      <td className="rounded-r-lg bg-slate-200">{dateExpiry.replace("T", " ").slice(0,16)}</td>
      
    </tr>
  );
};

export default RewardActive;
