import React from 'react';
import { FaBicycle, FaRunning, FaWalking, FaLeaf, FaPiggyBank, FaStar } from 'react-icons/fa';

const activities = [
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'running',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'walking',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  },
  {
    id: 1,
    date: 'today',
    gps: ['coordinates'],
    activity_time: '3h',
    distance: '3 miles',
    type: 'cycling',
    user_id: 1,
    joined_friends: [1],
    co2_saving: '3kg',
    cost_saving: '3gbp',
    points_earned: 234,
  }
];


const activityIcons = {
  cycling: <FaBicycle className="text-blue-500" />,
  running: <FaRunning className="text-red-500" />,
  walking: <FaWalking className="text-green-500" />,
};
const ActivityFeed = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Activity Feed</h1>
      <div className="space-y-6 h-full overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {activityIcons[activity.type] || <FaStar className="text-yellow-500" />}
                <h2 className="text-xl font-semibold ml-3 capitalize">{activity.type}</h2>
              </div>
              <div className="text-right">
                <p className="text-gray-500">{activity.date}</p>
                <p className="text-gray-700 font-medium">{activity.activity_time}</p>
                <p className="text-gray-700 font-medium">{activity.distance}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="flex items-center text-gray-600">
                <FaLeaf className="mr-2 text-green-500" />
                CO2 Saving: <span className="ml-1 font-medium text-gray-800">{activity.co2_saving}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <FaPiggyBank className="mr-2 text-yellow-500" />
                Cost Saving: <span className="ml-1 font-medium text-gray-800">{activity.cost_saving}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <FaStar className="mr-2 text-yellow-500" />
                Points Earned: <span className="ml-1 font-medium text-gray-800">{activity.points_earned}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;