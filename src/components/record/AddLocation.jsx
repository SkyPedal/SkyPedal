import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../repos/api";

const AddLocation = ({ handleAdd }) => {
  const auth = useAuth();
  const api = useApi(auth);

  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [savedName, setSavedName] = useState("");

  const handleSearch = () => {
    if (locations.length > 0) {
      setLocations([]);
      setQuery("");
      return;
    }
    api.queryLocation(query).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setLocations(data.data);
      }
    });
  };

  const handleSave = ({ chosenLocation, savedName }) => {
    api
      .saveLocation(savedName, chosenLocation.lat, chosenLocation.lng)
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          handleAdd(data.data.id);
          setLocations([]);
          setChosenLocation(null);
          setSavedName("");
          setQuery("");
        }
      });
  };

  const handleChoose = (location) => {
    setChosenLocation(location);
    setSavedName(location.name);
  };
  return (
    <div className="mt-5 flex flex-col rounded-xl border-4 border-gray-100 p-4">
      <div className="flex items-center justify-between text-center">
        <label htmlFor="activityLocation" className="mr-3 text-left text-lg">
          Add Location
        </label>
        <input
          type="text"
          id="activityLocation"
          name="activityLocation"
          className="w-52 flex-grow rounded-lg border-2 border-solid border-gray-300 p-2"
          value={query}
          disabled={locations.length > 0}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="button"
          className="ml-3 w-20 rounded-lg bg-blue-500 p-2 text-white"
          onClick={() => handleSearch()}
        >
          {locations.length == 0 ? "Search" : "Clear"}
        </button>
      </div>
      {locations.length > 0 &&
        locations.map((location) => (
          <button
            key={`location-${location.lat}-${location.lng}`}
            type="button"
            className={
              "mt-2 rounded-lg p-2 text-white" +
              (chosenLocation === location ? " bg-blue-700" : " bg-blue-500")
            }
            onClick={() => handleChoose(location)}
          >
            {location.name}
            <span className="ml-2 text-sm text-gray-300">
              {location.lat}, {location.lng}
            </span>
          </button>
        ))}

      {chosenLocation && (
        <div className="mt-2 flex flex-col">
          <label htmlFor="locationName" className="text-left text-lg">
            Name
          </label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
            value={savedName}
            onChange={(e) => setSavedName(e.target.value)}
          />
          <button
            type="button"
            className={
              "mt-2 w-20 rounded-lg bg-blue-500 p-2 text-white" +
              (savedName ? "" : " bg-gray-300")
            }
            disabled={!savedName}
            onClick={() => handleSave({ chosenLocation, savedName })}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

AddLocation.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export default AddLocation;
