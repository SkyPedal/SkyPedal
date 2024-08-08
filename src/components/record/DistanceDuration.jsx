import { useEffect, useState } from "react";

const DistanceDuration = ({ formData, disabled, reset }) => {
  useEffect(() => {
    if (reset) {
      setKm(0);
      setMins(0);
    }
  }, [reset]);

  const [km, setKm] = useState(0);
  const [mins, setMins] = useState(0);

  useEffect(() => {
    const { distance, duration } = formData.data;
    const meters = isNaN(km) ? 0 : km * 1000;
    const seconds = isNaN(mins) ? 0 : Math.round(mins * 60);

    if (distance !== meters || duration !== seconds) {
      formData.setField("distance", meters);
      formData.setField("duration", seconds);
    }
  }, [km, mins, formData]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <label htmlFor="activityDistance" className="pt-5 text-left text-lg">
          Distance (km)
        </label>
        <input
          type="number"
          step="0.01"
          id="activityDistance"
          name="activityDistance"
          className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
          value={km}
          onChange={(e) => setKm(e.target.valueAsNumber)}
          min="1"
          disabled={disabled}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="activityDuration" className="pt-5 text-left text-lg">
          Duration (mins)
        </label>
        <input
          type="number"
          id="activityDuration"
          name="activityDuration"
          className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
          value={mins}
          onChange={(e) => setMins(e.target.valueAsNumber)}
          min="1"
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
};

export default DistanceDuration;
