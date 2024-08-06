import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DistanceDuration from "./DistanceDuration";
import PropTypes from "prop-types";
import StartEnd from "./StartEnd";
import TabSelector from "./TabSelector";

const ActivityForm = ({ handleSave, locations, formData, setFormData }) => {
  const [tab, setTab] = useState("startEnd");
  const setTitle = useCallback(
    (title) => setFormData({ ...formData, title }),
    [formData, setFormData],
  );
  const setDate = (date) => setFormData({ ...formData, date });
  const setTime = (time) => setFormData({ ...formData, time });
  const setStart = (start) => setFormData({ ...formData, start });
  const setEnd = (end) => setFormData({ ...formData, end });
  const setDistance = (distance) => setFormData({ ...formData, distance });
  const setDuration = (duration) => setFormData({ ...formData, duration });

  const navigate = useNavigate();

  const changeTab = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    if (
      formData.title === "Commute to Work" &&
      formData.start !== "none" &&
      formData.start !== "Add New" &&
      formData.end !== "none" &&
      formData.end !== "Add New"
    ) {
      console.log(`Setting title with ${formData.start} and ${formData.end}`);
      const start_title = locations.find(
        (loc) => loc.id.toString() === formData.start,
      ).name;
      const end_title = locations.find(
        (loc) => loc.id.toString() === formData.end,
      ).name;
      setTitle(`${start_title} to ${end_title}`);
    }
  }, [formData, locations, setTitle]);

  const handleAddLocation = (location, start = true) => {
    // TODO: Do callback to fetch locations
    if (start) setStart(locations[locations.length - 1]);
    else setEnd(locations[locations.length - 1]);
  };

  const canTabChange =
    (tab === "startEnd" &&
      formData.start === "none" &&
      formData.end === "none") ||
    (tab === "distanceDuration" &&
      formData.distance === 0 &&
      formData.duration === 0) ||
    (tab === "dragDrop" && true);

  return (
    <form onSubmit={handleSave} className="h-[90%]">
      <div className="flex h-full flex-col pt-12">
        <label htmlFor="activityName" className="text-left text-lg">
          Title
        </label>
        <input
          type="text"
          id="activityName"
          name="activityName"
          className="rounded-lg border-2 border-solid border-gray-300 p-2"
          value={formData.title}
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
              value={formData.date}
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
              value={formData.time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-5 flex h-[65%] flex-col justify-between border-y-2 py-2">
          <div className="pt-2">
            <TabSelector
              currentTab={tab}
              changeTab={changeTab}
              lock={!canTabChange}
            />
            {tab === "startEnd" && (
              <StartEnd
                locations={locations}
                start={formData.start}
                end={formData.end}
                setStart={setStart}
                setEnd={setEnd}
                handleAddLocation={handleAddLocation}
              />
            )}
            {tab === "distanceDuration" && (
              <DistanceDuration
                distance={formData.distance}
                duration={formData.duration}
                setDistance={setDistance}
                setDuration={setDuration}
                disabled={formData.start !== "none" || formData.end !== "none"}
              />
            )}
          </div>

          <div className="left-4 flex flex-row justify-start pb-2">
            <p className="mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2">
              {formData.distance} miles
            </p>
            <p className="mx-2 mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2">
              {formData.duration} mins
            </p>
            <p className="mx-2 mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2">
              No GPS
            </p>
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
          disabled={
            formData.distance === 0 || formData.duration === 0 ? true : false
          }
        >
          Add
        </button>
      </div>
    </form>
  );
};

PropTypes.ActivityForm = {
  handleSave: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ActivityForm;
