import React from "react";
import { useState, useEffect } from "react";
import { DATABASE_URL } from "../config.json";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaBicycle,
  FaRunning,
  FaWalking,
  FaClock,
  FaMapMarkerAlt,
  FaLeaf,
  FaPiggyBank,
  FaMap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [names, setNames] = useState([]);

  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const activityIcons = {
    cycling: <FaBicycle className="text-4xl text-blue-500" />,
    running: <FaRunning className="text-4xl text-red-500" />,
    walking: <FaWalking className="text-4xl text-green-500" />,
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `${DATABASE_URL}/activities/getById?id=${id}`,
          { headers: { Authorization: `Bearer ${auth.token}` } },
        );
        if (response.status != 200) {
          throw new Error("Network response was not ok");
        }
        setActivity(response.data);

        const listOfFriends = [];
        for (const friendId of response.data.joined_friends) {
          try {
            const friend = await axios.get(
              `${DATABASE_URL}/users/${friendId}`,
              { headers: { Authorization: `Bearer ${auth.token}` } },
            );
            if (friend.status != 200) {
              throw new Error("Network response was not ok");
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
        throw new Error("Network response was not ok");
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    navigate("/");
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl p-4">Loading...</div>;
  }

  if (error) {
    return <div className="mx-auto max-w-4xl p-4">Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 p-[5%] shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          {activityIcons[activity.type]}
          <h1 className="ml-4 text-3xl font-bold capitalize text-gray-800">
            {activity.type} Activity
          </h1>
        </div>
        <div className="text-gray-600">
          <p className="text-lg">
            <FaClock className="mr-2 inline-block" />
            {activity.date}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col rounded-lg bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Details</h2>
          <p className="text-gray-600">
            <FaClock className="mr-2 inline-block text-gray-500" />
            Time:{" "}
            <span className="font-medium text-gray-800">
              {activity.activity_time}
            </span>
          </p>
          <p className="text-gray-600">
            <FaMapMarkerAlt className="mr-2 inline-block text-gray-500" />
            Distance:{" "}
            <span className="font-medium text-gray-800">
              {activity.distance} km
            </span>
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Savings & Points
          </h2>
          <p className="text-gray-600">
            <FaLeaf className="mr-2 inline-block text-green-500" />
            CO2 Saving:{" "}
            <span className="font-medium text-gray-800">
              {activity.co2_saving} kg
            </span>
          </p>
          <p className="text-gray-600">
            <FaPiggyBank className="mr-2 inline-block text-yellow-500" />
            Cost Saving:{" "}
            <span className="font-medium text-gray-800">
              £{activity.cost_saving}
            </span>
          </p>
          <p className="text-gray-600">
            <FaClock className="mr-2 inline-block text-yellow-500" />
            Points Earned:{" "}
            <span className="font-medium text-gray-800">
              {activity.points_earned}
            </span>
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Activity Route
        </h2>
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
          <FaMap className="text-6xl text-gray-500" />
          <p className="ml-4 text-gray-500">Map Placeholder</p>
        </div>
      </div>

      {/* Joined friends */}
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Joined Friends
        </h2>
        <div className="rounded-lg bg-gray-100 p-4">
          <div className="h-[90%] space-y-6 overflow-y-auto">
            {names.map((name) => (
              <p key={"activity-" + name}>{name}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="p-[5%] text-right">
        <button
          type="button"
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-red-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:shadow-lg dark:focus:ring-red-800"
          onClick={deletePressed}
        >
          Delete Activity
        </button>
      </div>
    </div>
  );
};

export default Activity;
