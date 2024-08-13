import React from "react";
import { useState, useEffect } from "react";
import { STATIC_DATABASE_URL } from "../config.json";
import axios from "axios";
import ActivityOverview from "./info/ActivityOverview";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${STATIC_DATABASE_URL}/activities`);
        if (response.status != 200) {
          throw new Error("Network response was not ok");
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
    return <div className="mx-auto max-w-4xl p-4">Loading...</div>;
  }

  if (error) {
    return <div className="mx-auto max-w-4xl p-4">Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto h-screen max-w-4xl bg-gray-100 p-6">
      <div className="h-[10%]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Activity Feed</h1>
        <div className='h-[10%] text-right'>
          <label class="inline-flex items-center cursor-pointer">
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-500">Only you</span>
            <input type="checkbox" value="" class="sr-only peer"></input>
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <div className="h-[90%] space-y-6 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityOverview activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
