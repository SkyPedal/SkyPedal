import { useCallback, useEffect, useState } from "react";
import { DATABASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ActivityForm from "./record/ActivityForm";
import today from "../utils/today";
import { useNavigate } from "react-router-dom";

const RecordActivity = () => {
  const [locations, setLocations] = useState([]);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "Commute to Work",
    date: today(),
    time: "08:00",
    start: "none",
    end: "none",
    distance: 0,
    duration: 0,
  });
  const { user_id } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${DATABASE_URL}/locations?user_id=${user_id}`,
        );
        setLocations(response.data);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };

    fetchLocations();
  }, [user_id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const activity = {
      ...formData,
    };
    const success = await saveActivity(activity);
    console.log("Submit: ", success, error);
  };

  const saveActivity = async (activity) => {
    setError("");
    try {
      console.log("Posting: ", activity);
      activity = { ...activity, user_id };
      await axios.post(`${DATABASE_URL}/activities`, activity);
      console.log("Posted: ", activity);
    } catch (error) {
      setError(`Error posting data: ${error}`);
      return false;
    }

    navigate("/");
    return true;
  };

  const getRoute = useCallback(async (start, end) => {
    setError("");
    try {
      const response = await axios.get(
        `${DATABASE_URL}/routes?start_id=${start}&end_id=${end}`,
      );
      const route = response.data[0];
      console.log("Route: ", route);
      if (!route) {
        console.log("No route found");
        setError("No route found");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        distance: route.distance,
        duration: route.duration,
      }));
    } catch (error) {
      setError(`Error fetching data: ${error}`);
    }
    console.log("Route: ", start, end);
  }, []);

  useEffect(() => {
    if (
      formData.start !== "Add New" &&
      formData.start !== "none" &&
      formData.end !== "Add New" &&
      formData.end !== "none"
    ) {
      getRoute(formData.start, formData.end);
    }
  }, [formData.start, formData.end, getRoute]);

  return (
    <div className="relative mx-auto h-full max-w-xl p-4">
      <h1 className="pt-5 text-left text-3xl">Record Activity</h1>
      {error != "" && <span className="text-red-500">{error}</span>}
      <ActivityForm
        handleSave={handleSave}
        locations={locations}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default RecordActivity;
