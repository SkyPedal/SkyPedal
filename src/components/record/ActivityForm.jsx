import { useEffect, useState } from "react";
import DistanceDuration from "./DistanceDuration";
import PropTypes from "prop-types";
import StartEnd from "./StartEnd";
import TabSelector from "./TabSelector";
import DragDrop from "./DragDrop";

const ActivityForm = ({ handleSave, locations, formData }) => {
  const [tab, setTab] = useState("startEnd");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      formData.reset();
      setReset(false);
    }
  }, [reset, formData]);

  const changeTab = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    if (
      formData.data.title === "Commute to Work" &&
      formData.data.start !== "none" &&
      formData.data.start !== "Add New" &&
      formData.data.end !== "none" &&
      formData.data.end !== "Add New"
    ) {
      console.log(
        `Setting title with ${formData.data.start} and ${formData.data.end}`,
      );
      const start_title = locations.find(
        (loc) => loc.id.toString() === formData.data.start,
      ).name;
      const end_title = locations.find(
        (loc) => loc.id.toString() === formData.data.end,
      ).name;
      formData.setField("title", `${start_title} to ${end_title}`);
    }
  }, [formData, locations]);

  const handleAddLocation = (location, start = true) => {
    // TODO: Do callback to fetch locations
    if (start) formData.setField("start", locations[locations.length - 1]);
    else formData.setField("end", locations[locations.length - 1]);
  };

  const canTabChange =
    (tab === "startEnd" &&
      formData.data.start === "none" &&
      formData.data.end === "none") ||
    (tab === "distanceDuration" &&
      formData.data.distance === 0 &&
      formData.data.duration === 0) ||
    (tab === "dragDrop" && formData.data.geoJson === null);

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
          value={formData.data.title}
          onChange={(e) => formData.setField("title", e.target.value)}
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
              value={formData.data.date}
              onChange={(e) => formData.setField("date", e.target.value)}
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
              value={formData.data.time}
              onChange={(e) => formData.setField("time", e.target.value)}
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
                formData={formData}
                handleAddLocation={handleAddLocation}
              />
            )}
            {tab === "distanceDuration" && (
              <DistanceDuration formData={formData} reset={reset} />
            )}
            {tab === "dragDrop" && (
              <DragDrop reset={reset} formData={formData} />
            )}
          </div>

          <div className="left-4 flex flex-row justify-start pb-2">
            <p
              data-testid="distance-text"
              className="mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2"
            >
              {(formData.data.distance / 1000).toFixed(2)} km
            </p>
            <p
              data-testid="duration-text"
              className="mx-2 mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2"
            >
              {Math.round(formData.data.duration / 60)} mins
            </p>
            {formData.data.geoJson ? (
              <p className="mx-2 mt-5 rounded-lg border-2 border-solid border-gray-300 bg-green-100 px-4 py-2">
                GPS
              </p>
            ) : (
              <p className="mx-2 mt-5 rounded-lg border-2 border-solid border-gray-300 bg-gray-100 px-4 py-2">
                No GPS
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons  */}
      <div className="absolute bottom-12 right-4 flex w-full flex-row justify-end">
        <button
          type="button"
          className="mx-8 mt-5 max-h-10 w-24 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => setReset(true)}
        >
          Clear
        </button>
        <button
          type="submit"
          className="mt-5 max-h-10 w-24 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
          disabled={
            formData.data.distance === 0 || formData.data.duration === 0
              ? true
              : false
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
  formData: {
    data: PropTypes.object.isRequired,
    setField: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  },
  setFormData: PropTypes.func.isRequired,
};

export default ActivityForm;
