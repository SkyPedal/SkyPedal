import { FaBicycle, FaRunning, FaWalking, FaLeaf, FaPiggyBank, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const activityIcons = {
    cycling: <FaBicycle className="text-blue-500" />,
    running: <FaRunning className="text-red-500" />,
    walking: <FaWalking className="text-green-500" />,
  };

const ActivityOverview = ({activity}, key) => {
    return (
        <div key={key} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                {activityIcons[activity.type] || <FaStar className="text-yellow-500" />}
                <h2 className="text-xl font-semibold ml-3 capitalize">{activity.type}</h2>
                </div>
                <div className="text-right">
                <p className="text-gray-500">{activity.date}</p>
                <p className="text-gray-700 font-medium">{activity.activity_time}</p>
                <p className="text-gray-700 font-medium">{activity.distance} km</p>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <p className="flex items-center text-gray-600">
                <FaLeaf className="mr-2 text-green-500" />
                CO2 Saving: <span className="ml-1 font-medium text-gray-800">{activity.co2_saving} kg</span>
                </p>
                <p className="flex items-center text-gray-600">
                <FaPiggyBank className="mr-2 text-yellow-500" />
                Cost Saving: <span className="ml-1 font-medium text-gray-800">£{activity.cost_saving}</span>
                </p>
                <p className="flex items-center text-gray-600">
                <FaStar className="mr-2 text-yellow-500" />
                Points Earned: <span className="ml-1 font-medium text-gray-800">{activity.points_earned}</span>
                </p>
            </div>
            <div className='flex justify-end mt-4'>
                <Link to={`/activity/${activity.id}`} className='text-blue-500 hover:underline'>
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ActivityOverview;