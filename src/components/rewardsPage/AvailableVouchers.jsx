import { useEffect, useState } from "react";
import AvailableRewardModel from "./AvailableReward.model";
import RewardAvailable from "./RewardAvailable";


const AvailableVouchers = ({ data }) => {
    // console.log(data);

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

    const populateTable = (data) => {
        console.log("Populate table");
        console.log(data);
        if (data?.rewards?.length > 0) {
            return data.rewards.map(currentReward => {
                const { id, name, description, point_cost, number_available, image_link, active } = currentReward;
                // const reward = new RewardModel( rewardName={rewardName}, rewardAmountRemaining={rewardAmountRemaining}, rewardPointCost={rewardPointCost}, _id={_id});
                const reward = new AvailableRewardModel( name, null, number_available, point_cost, null, null, id );
                console.log(reward);
                return <RewardAvailable reward={reward} key={reward.id} />;
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