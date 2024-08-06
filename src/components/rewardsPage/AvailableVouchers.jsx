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
        <div className="m-5">
            <h3 className="flex justify-start text-xl font-bold pl-5">Available Vouchers</h3>
            <table className="w-full p-5 border-spacing-y-1 border-separate">
                <thead>
                    <tr className="text-sm text-slate-500">
                        <th className="font-medium">Description</th>
                        <th className="font-medium">Remaining</th>
                        <th className="font-medium">Cost</th>
                    </tr>
                </thead>
                <tbody>{populateTable(data)}</tbody>
            </table>
        </div>
    );
}

export default AvailableVouchers;