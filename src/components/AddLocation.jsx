import { useState } from "react";
import PropTypes from "prop-types";

const AddLocation = ({ handleAdd }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    handleAdd(location);
    setLocation("");
  };
  return (
    <div className="mt-5 flex flex-col rounded-xl border-4 border-gray-100 p-4">
      <label htmlFor="activityLocation" className="pt-5 text-left text-lg">
        Location
      </label>
      <input
        type="text"
        id="activityLocation"
        name="activityLocation"
        className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        type="button"
        className="mt-2 rounded-lg bg-blue-500 p-2 text-white"
        onClick={() => handleSubmit()}
      >
        Add Location
      </button>
    </div>
  );
};

AddLocation.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export default AddLocation;
