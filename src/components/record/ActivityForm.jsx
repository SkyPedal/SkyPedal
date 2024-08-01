import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddLocation from "./AddLocation";
import PropTypes from "prop-types";

const ActivityForm = ({ handleSave, locations, formData, setFormData }) => {
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

  useEffect(() => {
    if (
      formData.title === "Commute to Work" &&
      formData.start !== "none" &&
      formData.start !== "Add New" &&
      formData.end !== "none" &&
      formData.end !== "Add New"
    ) {
      const start_title = locations.find(
        (loc) => loc.id === formData.start,
      ).name;
      const end_title = locations.find((loc) => loc.id === formData.end).name;
      setTitle(`${start_title} to ${end_title}`);
    }
  }, [formData, locations, setTitle]);

  const handleAddLocation = (location, start = true) => {
    // TODO: Do callback to fetch locations
    if (start) setStart(locations[locations.length - 1]);
    else setEnd(locations[locations.length - 1]);
  };

  return (
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
        <div className="mt-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <label htmlFor="activityStart" className="pt-5 text-left text-lg">
                Start Location
              </label>

              <select
                id="activityStart"
                name="activityStart"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={formData.start}
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
                value={formData.end}
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
        {formData.start === "Add New" && (
          <AddLocation
            handleAdd={(location) => handleAddLocation(location, true)}
          />
        )}
        {formData.start !== "Add New" && formData.end === "Add New" && (
          <AddLocation
            handleAdd={(location) => handleAddLocation(location, false)}
          />
        )}
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
              value={formData.distance === 0 ? "" : formData.distance}
              onChange={(e) =>
                setDistance(e.target.value === "" ? 0 : e.target.valueAsNumber)
              }
              min="1"
              disabled={
                formData.start === "none" && formData.end === "none"
                  ? false
                  : true
              }
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
              value={formData.duration === 0 ? "" : formData.duration}
              onChange={(e) =>
                setDuration(e.target.value === "" ? 0 : e.target.valueAsNumber)
              }
              min="1"
              disabled={
                formData.start === "none" && formData.end === "none"
                  ? false
                  : true
              }
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

// const ActivityForm = ({ handleSave, locations, formData, setFormData }) => {
PropTypes.ActivityForm = {
  handleSave: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ActivityForm;
