import React from "react";
import { useState, useEffect } from "react";
import { DATABASE_URL } from "../config.json";
import axios from "axios";
import ActivityOverview from "./info/ActivityOverview";
import logo from "../assets/icons/skypedal.png";
import { useAuth } from "../context/AuthContext";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlyYou, setOnlyYou] = useState(false);
  const auth = useAuth();

  async function getData(urlEnding) {
    try {
      const response = await axios.get(
        `${DATABASE_URL}/activities/${urlEnding}`,
        { headers: { Authorization: `Bearer ${auth.token}` } },
      );
      if (response.status != 200) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      setActivities(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchActivities = async () => {
      getData("getAll");
    };

    fetchActivities();
  }, []);

  const changeOnlyYou = async () => {
    if (onlyYou) {
      setOnlyYou(false);
      getData("getAll");
    } else {
      setOnlyYou(true);
      //Will change this to which user is signed in, or even better the backend will know which user is logged in so no need to pass in userId
      getData("getUserActivities?userId=1");
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-4xl p-4">Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div className="mx-auto max-w-4xl p-4">Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto h-screen p-6">
      <div className="flex h-12 items-center md:p-4">
        <img src={logo} alt="Home" className="w-8" />
        <p
          className="hidden pl-4 md:block"
          style={{ color: "var(--sky-indigo)" }}
        >
          Pedal Pushers
        </p>
      </div>
      <div className="h-[10%]">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Activity Feed
        </h1>
        <div className="h-[10%] text-right">
          <label className="inline-flex cursor-pointer items-center">
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-500">
              Only you
            </span>
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              onChange={changeOnlyYou}
            ></input>
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          </label>
        </div>
      </div>
      <div className="h-[85%] space-y-6 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityOverview activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
