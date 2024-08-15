import React from 'react';
import { useState, useEffect } from 'react';
import {DATABASE_URL} from '../config.json';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBicycle, FaRunning, FaWalking, FaClock, FaMapMarkerAlt, FaLeaf, FaPiggyBank, FaMap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [names, setNames] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const activityIcons = {
        cycling: <FaBicycle className="text-blue-500 text-4xl" />,
        running: <FaRunning className="text-red-500 text-4xl" />,
        walking: <FaWalking className="text-green-500 text-4xl" />,
    };
  
    useEffect(() => {
      const fetchActivity = async () => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/activities/getById?id=${id}`,
          );
          if (response.status != 200) {
            throw new Error('Network response was not ok');
          }
          setActivity(response.data); 
        
          const listOfFriends = [];
          for(const friendId of response.data.joined_friends){
            try {
                const friend = await axios.get(
                  `${DATABASE_URL}/users/${friendId}`,
                );
                if (friend.status != 200) {
                  throw new Error('Network response was not ok');
                }

                listOfFriends.push(friend.data.name);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
          }
          setNames(listOfFriends);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchActivity();
    }, []);

    async function deletePressed() {
        try {
            const response = await axios.delete(
                `${DATABASE_URL}/activities/delete?id=${id}`,
            );
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
       navigate('/');
    }

    if (loading) {
        return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
    }

    if (error) {
        return <div className="max-w-4xl mx-auto p-4">Error: {error.message}</div>;
    }

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

            {/* Map Placeholder */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Activity Route</h2>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FaMap className="text-gray-500 text-6xl" />
                    <p className="text-gray-500 ml-4">Map Placeholder</p>
                </div>
            </div>

            {/* Joined friends */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Joined Friends</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                <div className="h-[90%] space-y-6 overflow-y-auto">
                {names.map((name) => (<p>{name}</p>))}
                </div>
                </div>
            </div>

            <div className='text-right p-[5%]'>
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={deletePressed}>Delete Activity</button>
            </div>
        </div>
    );
}

export default Activity;
