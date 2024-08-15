import React from "react";
import { useState, useEffect } from "react";
import { STATIC_DATABASE_URL } from "../config.json";
import axios from "axios";
import ActivityOverview from "./info/ActivityOverview";

const ActivityFeed = ( {statusSetter} ) => {
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
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Activity Feed
        </h1>
      </div>
      <div className="h-[90%] space-y-6 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityOverview activity={activity} key={activity.id} statusSetter={statusSetter} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
