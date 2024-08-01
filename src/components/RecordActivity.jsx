import { useEffect, useState } from "react";
import { DATABASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddLocation from "./AddLocation";

function today() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const RecordActivity = () => {
  const [title, setTitle] = useState("Commute to Work");
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("08:00");
  const [start, setStart] = useState("none");
  const [end, setEnd] = useState("none");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [locations, setLocations] = useState([]);

  const [error, setError] = useState("");
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
      title,
      date,
      time,
      start,
      end,
      distance,
      duration,
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
    setDistance(0);
    setDuration(0);
    navigate("/");
    return true;
  };

  useEffect(() => {
    const getRoute = async () => {
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
        setDistance(route.distance);
        setDuration(route.duration);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };
    if (start !== "none" && end !== "none") {
      getRoute();
    }
  }, [start, end]);

  const handleAddLocation = (location, start = true) => {
    // TODO: Do callback to fetch locations
    if (start) setStart(locations[locations.length - 1]);
    else setEnd(locations[locations.length - 1]);
  };

  useEffect(() => {
    if (title === "Commute to Work" && start !== "none" && end !== "none") {
      const start_title = locations.find((loc) => loc.id === start).name;
      const end_title = locations.find((loc) => loc.id === end).name;
      setTitle(`${start_title} to ${end_title}`);
    }
  }, [title, start, end, locations]);

  return (
    <div className="relative mx-auto h-full max-w-xl p-4">
      <h1 className="pt-5 text-left text-3xl">Record Activity</h1>
      {error != "" && <span className="text-red-500">{error}</span>}

      <form onSubmit={handleSave}>
        <div className="flex flex-col pt-12">
          <label htmlFor="activityName" className="text-left text-lg">
            Title
          </label>
          <input
            type="text"
            id="activityName"
            name="activityName"
            className="rounded-lg border-2 border-solid border-gray-300 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <label htmlFor="activityDate" className="pt-5 text-left text-lg">
                Date
              </label>
              <input
                type="date"
                id="activityDate"
                name="activityDate"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="activityTime" className="pt-5 text-left text-lg">
                Time
              </label>
              <input
                type="time"
                id="activityTime"
                name="activityTime"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-12">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="activityStart"
                  className="pt-5 text-left text-lg"
                >
                  Start Location
                </label>

                <select
                  id="activityStart"
                  name="activityStart"
                  className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                >
                  <option value="none">-- Pick --</option>
                  {locations.map((location) => (
                    <option
                      key={`location-start-${location.id}`}
                      value={location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                  <option value="Add New">Add New</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="activityEnd" className="pt-5 text-left text-lg">
                  End Location
                </label>
                <select
                  id="activityEnd"
                  name="activityEnd"
                  className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                >
                  <option value="none">-- Pick --</option>
                  {locations.map((location) => (
                    <option
                      key={`location-start-${location.id}`}
                      value={location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                  <option value="Add New">Add New</option>
                </select>
              </div>
            </div>
          </div>
          {start === "Add New" && <AddLocation handleAdd={handleAddLocation} />}
          <p
            className="mb-2 mt-8 w-full border-b-2 text-center"
            style={{ lineHeight: "0.1em" }}
          >
            <span className="bg-white pl-2 pr-2">OR</span>
          </p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <label
                htmlFor="activityDistance"
                className="pt-5 text-left text-lg"
              >
                Distance (miles)
              </label>
              <input
                type="number"
                id="activityDistance"
                name="activityDistance"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={distance === 0 ? "" : distance}
                onChange={(e) =>
                  setDistance(
                    e.target.value === "" ? 0 : e.target.valueAsNumber,
                  )
                }
                min="1"
                disabled={start === "none" && end === "none" ? false : true}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="activityDuration"
                className="pt-5 text-left text-lg"
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                id="activityDuration"
                name="activityDuration"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={duration === 0 ? "" : duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value === "" ? 0 : e.target.valueAsNumber,
                  )
                }
                min="1"
                disabled={start === "none" && end === "none" ? false : true}
                required
              />
            </div>
          </div>
        </div>
        {/* Buttons  */}
        <div className="absolute bottom-12 right-4 flex w-full flex-row justify-end">
          <button
            type="button"
            className="mx-8 mt-5 max-h-10 w-24 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-5 max-h-10 w-24 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
            disabled={distance === 0 || duration === 0 ? true : false}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordActivity;
