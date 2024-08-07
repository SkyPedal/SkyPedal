import { useEffect, useState } from "react";
import ActivityForm from "./record/ActivityForm";
import { useNavigate } from "react-router-dom";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";
import useFormData from "./record/FormData";

const RecordActivity = () => {
  const [locations, setLocations] = useState([]);

  const [error, setError] = useState("");
  const formData = useFormData();

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
      ...formData.data,
    };
    setError("");
    const success = await api.saveActivity(activity);
    console.log("Submit: ", success, error);
    navigate("/");
  };

  useEffect(() => {
    const { start, end } = formData.data;
    console.log("Update Route Info");
    console.log(start, end);
    const startEndSet =
      start !== "Add New" &&
      start !== "none" &&
      end !== "Add New" &&
      end !== "none";
    if (startEndSet) {
      console.log("hm");
      setError("");
      api.getRoute(start, end).then((res) => {
        if (res.error) {
          setError(res.error);
          return;
        }
        if (
          res.data.distance !== formData.data.distance ||
          res.data.duration !== formData.data.duration
        ) {
          formData.setField("distance", res.data.distance);
          formData.setField("duration", res.data.duration);
        }
      });
    }
  }, [formData, api]);

  return (
    <div className="relative mx-auto h-full max-w-xl p-4">
      <h1 className="pt-5 text-left text-3xl">Record Activity</h1>
      {error != "" && <span className="text-red-500">{error}</span>}
      <ActivityForm
        handleSave={handleSave}
        locations={locations}
        formData={formData}
      />
    </div>
  );
};

export default RecordActivity;
