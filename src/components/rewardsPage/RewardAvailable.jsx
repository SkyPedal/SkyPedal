import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RewardAvailable = ({ reward }) => {
    const { rewardName, rewardDescription, rewardAmountRemaining, rewardPointCost, rewardImage, isRewardActive, _id } = reward;
  
    return (
        <tr>
            <td className='bg-slate-200 rounded-l-lg hover:bg-red-100 hover:underline'><Link to={`/rewards/${_id}/redeem/null`}>{rewardName}</Link></td>
            <td className='bg-slate-200 py-1'>{rewardAmountRemaining}</td>
            <td className='bg-slate-200 rounded-r-lg'>{rewardPointCost}</td>
        </tr>
    );
};

export default RewardAvailable;