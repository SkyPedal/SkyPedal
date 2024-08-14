import { Link } from 'react-router-dom';

const RewardAvailable = ({ reward, statusSetter }) => {
    const { rewardName, rewardDescription, rewardAmountRemaining, rewardPointCost, rewardImage, isRewardActive, _id } = reward;
    statusSetter("redeem");
  
    return (
        <tr>
            <td className='bg-slate-200 rounded-l-lg hover:bg-red-100 hover:underline'><Link to={`/rewards/${_id}`}>{rewardName}</Link></td>
            <td className='bg-slate-200 py-1'>{rewardAmountRemaining}</td>
            <td className='bg-slate-200 rounded-r-lg'>{rewardPointCost}</td>
        </tr>
    );
};

export default RewardAvailable;