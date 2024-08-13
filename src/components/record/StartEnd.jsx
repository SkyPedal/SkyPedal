import { useEffect, useState } from "react";
import AddLocation from "./AddLocation";

const fetchRoutes = (formData, api, setError, locations) => {
  const { start, end } = formData.data;
  if (
    locations.some((loc) => loc.id.toString() === start) &&
    locations.some((loc) => loc.id.toString() === end) &&
    start !== end
  ) {
    console.log("Update Route Info");
    console.log(start, end);
    setError("");
    api.getRoute(start, end).then((res) => {
      if (res.error) {
        setError(res.error);
        return;
      }
      if (
        res.data.distanceM !== formData.data.distance ||
        res.data.durationS !== formData.data.duration
      ) {
        console.log("Setting new data", res.data);
        formData.setField("distance", res.data.distanceM);
        formData.setField("duration", res.data.durationS);
        formData.setField("geoJson", res.data.geoJson);
      }
    });
  }
};

const fetchLocations = (api, setLocations, setError, callback = () => null) => {
  api.getLocations().then((res) => {
    if (res.error) {
      setError(res.error);
      return;
    }
    setLocations(res.data);
    callback(res.data);
  });
};

const updateTitle = (formData, locations) => {
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
};

const StartEnd = ({ formData, setError, api }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations(api, setLocations, setError);
  }, [api, setError]);

  useEffect(() => {
    fetchRoutes(formData, api, setError, locations);
  }, [formData, api, setError, locations]);

  useEffect(() => {
    updateTitle(formData, locations);
  }, [formData, locations]);

  const handleAddLocation = (locationId, isStart) => {
    fetchLocations(api, setLocations, setError, (newLocations) => {
      if (isStart)
        formData.setField(
          "start",
          newLocations.find((loc) => loc.id === locationId).id.toString(),
        );
      else
        formData.setField(
          "end",
          newLocations.find((loc) => loc.id === locationId).id.toString(),
        );
    });
  };

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label htmlFor="activityStart" className="pt-5 text-left text-lg">
              Start Location
            </label>

            <select
              id="activityStart"
              name="activityStart"
              className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
              value={formData.data.start}
              onChange={(e) => formData.setField("start", e.target.value)}
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
              value={formData.data.end}
              onChange={(e) => formData.setField("end", e.target.value)}
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
      {formData.data.start === "Add New" && (
        <AddLocation
          handleAdd={(location) => handleAddLocation(location, true)}
        />
      )}
      {formData.data.start !== "Add New" && formData.data.end === "Add New" && (
        <AddLocation
          handleAdd={(location) => handleAddLocation(location, false)}
        />
      )}
    </>
  );
};

export default StartEnd;
