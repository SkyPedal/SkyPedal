import { useEffect, useState } from "react";


const RewardActive = ({ reward }) => {
    const { rewardName, rewardDescription, rewardPointCost, rewardExpireDate, rewardImage, isRewardActive, _id } = reward;
    const [date, setDate] = useState(null);

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
    });
    
    rewardTimeRemainingSec = Math.floor((rewardExpireDate - date) / 1000);
    rewardTimeRemainingMin = Math.floor(rewardTimeRemainingSec / 60);
    rewardTimeRemainingHour = Math.floor(rewardTimeRemainingMin / 60);
    
    return (
        <tr>
            <td ><Link to={`/reward/${_id}`}>{rewardName}</Link></td>
            <td >Expires in: {rewardTimeRemainingHour>0 ? rewardTimeRemainingHour + " hours" : rewardTimeRemainingMin>0 ? rewardTimeRemainingMin + " mins" : rewardTimeRemainingSec + " seconds" }</td>
        </tr>
    );
};

export default RewardActive;