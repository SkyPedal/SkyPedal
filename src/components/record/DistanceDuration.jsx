const DistanceDuration = ({
  distance,
  setDistance,
  duration,
  setDuration,
  disabled,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <label htmlFor="activityDistance" className="pt-5 text-left text-lg">
          Distance (m)
        </label>
        <input
          type="number"
          id="activityDistance"
          name="activityDistance"
          className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
          value={distance === 0 ? "" : distance}
          onChange={(e) =>
            setDistance(e.target.value === "" ? 0 : e.target.valueAsNumber)
          }
          min="1"
          disabled={disabled}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="activityDuration" className="pt-5 text-left text-lg">
          Duration (s)
        </label>
        <input
          type="number"
          id="activityDuration"
          name="activityDuration"
          className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
          value={duration === 0 ? "" : duration}
          onChange={(e) =>
            setDuration(e.target.value === "" ? 0 : e.target.valueAsNumber)
          }
          min="1"
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
};

export default DistanceDuration;
