import { useEffect, useState } from "react";
import RewardModel from "./Reward.model";
import RewardAvailable from "./RewardAvailable";


const AvailableVouchers = ({ data }) => {
    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    useEffect(() => {
        if (data?.error) {
            setDataStatus({ name: `error`, message: data.error });
        }
        else if (data?.rewards) {
            const ds = data.rewards.length > 0 ? { name: `data`, message: null } : { name: `nodata`, message: `There were no rewards previously saved` };
            setDataStatus(ds);
        }
        else {
            setDataStatus({ name: `loading`, message: `Data is loading...` });
        }
    }, [data]);

    const populateTable = ({ data }) => {
        console.log(data);
        if (data?.rewards?.length > 0) {
            return data.rewards.map(currentReward => {
                const { rewardName, rewardAmountRemaining, rewardPointCost, _id } = currentReward;
                const reward = new RewardModel( rewardName={rewardName}, rewardAmountRemaining={rewardAmountRemaining}, rewardPointCost={rewardPointCost}, _id={_id});
                // const reward = new RewardModel( rewardName, null, rewardAmountRemaining, rewardPointCost, null, null, _id );
                return <RewardAvailable reward={reward} key={reward._id} />;
            });
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    }

    return (
        <div className="">
            <h3>Available Vouchers</h3>
            <table className="">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Remaining</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>{populateTable(data)}</tbody>
            </table>
        </div>
    );
}

export default AvailableVouchers;