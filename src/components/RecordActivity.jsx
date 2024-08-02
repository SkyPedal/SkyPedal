import { useEffect, useState } from "react";
import ActivityForm from "./record/ActivityForm";
import today from "../utils/today";
import { useNavigate } from "react-router-dom";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";

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

  const handleSave = async (e) => {
    e.preventDefault();
    const activity = {
      ...formData,
    };
    setError("");
    const success = await api.saveActivity(activity);
    console.log("Submit: ", success, error);
    navigate("/");
  };

  useEffect(() => {
    if (
      formData.start !== "Add New" &&
      formData.start !== "none" &&
      formData.end !== "Add New" &&
      formData.end !== "none"
    ) {
      setError("");
      api.getRoute(formData.start, formData.end).then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setFormData((prevData) => ({
          ...prevData,
          distance: data.data.distance,
          duration: data.data.duration,
        }));
      });
    }
  }, [api, formData.start, formData.end]);

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
