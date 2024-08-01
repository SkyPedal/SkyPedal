import { Link } from 'react-router-dom';

const RewardAvailable = ({ reward }) => {
    const { rewardName, rewardDescription, rewardAmountRemaining, rewardPointCost, rewardImage, isRewardActive, _id } = reward;
  
    return (
        <tr>
            <td ><Link to={`/reward/${_id}`}>{rewardName}</Link></td>
            <td >{rewardAmountRemaining}</td>
            <td>{rewardPointCost}</td>
        </tr>
    );
};

export default RewardAvailable;