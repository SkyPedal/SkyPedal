import { Link } from "react-router-dom";
import ActiveRewardModel from "./ActiveReward.model";
import { useEffect, useState } from "react";
import RewardActive from "./RewardActive";


const ActiveVouchers = ({ data }) => {

    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    useEffect(() => {
        if (data?.error) {
            setDataStatus({ name: `error`, message: data.error });
        }
        else if (data?.rewards) {
            const ds = data.rewards.length > 0 ? { name: `data`, message: null } : { name: `nodata`, message: `There were no rewards previously activated` };
            setDataStatus(ds);
        }
        else {
            setDataStatus({ name: `loading`, message: `Data is loading...` });
        }
    }, [data]);

    const populateTable = (data) => {
        console.log("Populate table");
        console.log(data);
        if (data?.rewards?.length > 0) {
            return data.rewards.map(currentReward => {
                const { id, reward_id, user_id, date_redeemed, date_expiry, has_used } = currentReward;
                // const reward = new RewardModel( rewardName={rewardName}, rewardAmountRemaining={rewardAmountRemaining}, rewardPointCost={rewardPointCost}, _id={_id});
                const reward = new ActiveRewardModel( reward_id, user_id, date_redeemed, date_expiry, has_used, id );
                console.log(reward);
                return <RewardActive reward={reward} key={reward.id} />;
            });
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    }

    return (
        <div className="m-5 mb-10">
            <h3 className="flex justify-start text-xl font-bold pl-5">Your Active Vouchers</h3>
            <table className="w-full p-5 border-spacing-y-1 border-separate">
                <thead>
                    <tr className="text-sm text-slate-500">
                        <th className="font-medium">Name</th>
                        <th className="font-medium">Expires in</th>
                    </tr>
                </thead>
                <tbody>{populateTable(data)}</tbody>
            </table>
        </div>
    );
}

export default ActiveVouchers;