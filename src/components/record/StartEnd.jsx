import AddLocation from "./AddLocation";

const StartEnd = ({ formData, locations, handleAddLocation }) => {
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
