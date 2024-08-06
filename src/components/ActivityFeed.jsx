import React from 'react';
import { useState, useEffect } from 'react';
import { FaBicycle, FaRunning, FaWalking, FaLeaf, FaPiggyBank, FaStar } from 'react-icons/fa';
import {DATABASE_URL} from '../config.json';
import axios from 'axios';


const activityIcons = {
  cycling: <FaBicycle className="text-blue-500" />,
  running: <FaRunning className="text-red-500" />,
  walking: <FaWalking className="text-green-500" />,
};
const ActivityFeed = () => {
  console.log(DATABASE_URL);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${DATABASE_URL}/activities`,
        );
        console.log(response);
        if (response.status != 200) {
          throw new Error('Network response was not ok');
        }
        setActivities(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-4">Error: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 h-screen">
      <div className="h-[10%]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Activity Feed</h1>
      </div>
      <div className="space-y-6 h-[90%] overflow-y-auto">
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