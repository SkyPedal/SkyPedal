import React from 'react';
import { useState, useEffect } from 'react';
import {DATABASE_URL} from '../config.json';
import axios from 'axios';
import ActivityOverview from './info/ActivityOverview';


const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 h-screen">
      <div className="h-[10%]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Activity Feed</h1>
      </div>
      <div className="space-y-6 h-[90%] overflow-y-auto">
        {activities.map((activity) => (
          <ActivityOverview activity={activity} key={activity.id}/>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;