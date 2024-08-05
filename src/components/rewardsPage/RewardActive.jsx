import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const RewardActive = ({ reward }) => {
    const { rewardId, userId, dateRedeemed, dateExpiry, hasUsed, id } = reward;
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
            {/* figure out how to do sql operations to show actual reward data */}
            <td ><Link to={`/reward/${id}`}>{rewardId}</Link></td>
            {/* <td >Expires in: {rewardTimeRemainingHour>0 ? rewardTimeRemainingHour + " hours" : rewardTimeRemainingMin>0 ? rewardTimeRemainingMin + " mins" : rewardTimeRemainingSec + " seconds" }</td> */}
            <td>{dateExpiry}</td>
        </tr>
    );
};

export default RewardActive;