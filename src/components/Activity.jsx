import React from 'react';
import { useState, useEffect } from 'react';
import {DATABASE_URL} from '../config.json';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBicycle, FaRunning, FaWalking, FaClock, FaMapMarkerAlt, FaLeaf, FaPiggyBank } from 'react-icons/fa';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const activityIcons = {
        cycling: <FaBicycle className="text-blue-500 text-4xl" />,
        running: <FaRunning className="text-red-500 text-4xl" />,
        walking: <FaWalking className="text-green-500 text-4xl" />,
    };
  
    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/activities`,
          );
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

    const { id } = useParams();
    const activity = activities.find(act => act.id === parseInt(id));

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg p-[5%]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    {activityIcons[activity.type]}
                    <h1 className="text-3xl font-bold ml-4 capitalize text-gray-800">{activity.type} Activity</h1>
                </div>
                <div className="text-gray-600">
                    <p className="text-lg"><FaClock className="inline-block mr-2" />{activity.date}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Details</h2>
                    <p className="text-gray-600"><FaClock className="inline-block mr-2 text-gray-500" />Time: <span className="font-medium text-gray-800">{activity.activity_time}</span></p>
                    <p className="text-gray-600"><FaMapMarkerAlt className="inline-block mr-2 text-gray-500" />Distance: <span className="font-medium text-gray-800">{activity.distance} km</span></p>
                </div>

                <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Savings & Points</h2>
                    <p className="text-gray-600"><FaLeaf className="inline-block mr-2 text-green-500" />CO2 Saving: <span className="font-medium text-gray-800">{activity.co2_saving} kg</span></p>
                    <p className="text-gray-600"><FaPiggyBank className="inline-block mr-2 text-yellow-500" />Cost Saving: <span className="font-medium text-gray-800">£{activity.cost_saving}</span></p>
                    <p className="text-gray-600"><FaClock className="inline-block mr-2 text-yellow-500" />Points Earned: <span className="font-medium text-gray-800">{activity.points_earned}</span></p>
                </div>
            </div>

            {/* <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Joined Friends</h2>
                <ul className="list-disc list-inside text-gray-600">

                </ul>
            </div> */}
        </div>
    );
}

export default Activity;
