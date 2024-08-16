import {
  FaBicycle,
  FaRunning,
  FaWalking,
  FaLeaf,
  FaPiggyBank,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const activityIcons = {
  cycling: <FaBicycle className="text-blue-500" />,
  running: <FaRunning className="text-red-500" />,
  walking: <FaWalking className="text-green-500" />,
};

const ActivityOverview = ({ activity }, key) => {
  return (
    <div key={key} className="mr-2 rounded-lg border-2 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          {activityIcons[activity.type] || (
            <FaStar className="text-yellow-500" />
          )}
          <h2 className="ml-3 text-xl font-semibold capitalize">
            {activity.type}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-gray-500">{activity.date}</p>
          <p className="font-medium text-gray-700">{activity.activity_time}</p>
          <p className="font-medium text-gray-700">
            {activity.distance > 1000
              ? (activity.distance / 1000).toFixed(2) + " km"
              : activity.distance + " metres"}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p className="flex items-center text-gray-600">
          <FaLeaf className="mr-2 text-green-500" />
          CO2 Saving:{" "}
          <span className="ml-1 font-medium text-gray-800">
            {activity.co2_saving} g
          </span>
        </p>
        <p className="flex items-center text-gray-600">
          <FaPiggyBank className="mr-2 text-yellow-500" />
          Cost Saving:{" "}
          <span className="ml-1 font-medium text-gray-800">
            £{(activity.cost_saving / 100.0).toFixed(2)}
          </span>
        </p>
        <p className="flex items-center text-gray-600">
          <FaStar className="mr-2 text-yellow-500" />
          Points Earned:{" "}
          <span className="ml-1 font-medium text-gray-800">
            {activity.points_earned}
          </span>
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          to={`/activity/${activity.id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ActivityOverview;
