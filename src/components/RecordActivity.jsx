import { useEffect, useState } from "react";
import ActivityForm from "./record/ActivityForm";
import { useNavigate } from "react-router-dom";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";

const RecordActivity = () => {
  const [locations, setLocations] = useState([]);

  const [error, setError] = useState("");

  const auth = useAuth();
  const api = useApi(auth);

  const navigate = useNavigate();

  useEffect(() => {
    api.getLocations().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLocations(data.data);
      }
    });
  }, [api]);

  const handleSave = async ({
    title,
    date,
    time,
    distance,
    duration,
    geoJson,
  }) => {
    const activity = { title, date, time, distance, duration, geoJson };
    setError("");
    const success = await api.saveActivity(activity);
    console.log("Submit: ", success, error);
    navigate("/");
  };

  return (
    <div className="relative mx-auto h-full max-w-xl p-4">
      <h1 className="pt-5 text-left text-3xl">Record Activity</h1>
      {error != "" && <span className="text-red-500">{error}</span>}
      <ActivityForm
        handleSave={handleSave}
        locations={locations}
        setError={setError}
        api={api}
      />
    </div>
  );
};

export default RecordActivity;
