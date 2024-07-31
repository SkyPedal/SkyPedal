import { useState } from "react";

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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="relative mx-auto h-full max-w-xl p-4">
      <h1 className="pt-5 text-left text-3xl">Record Activity</h1>

      <form className="">
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
                <input
                  type="text"
                  id="activityStart"
                  name="activityStart"
                  className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="activityEnd" className="pt-5 text-left text-lg">
                  End Location
                </label>
                <input
                  type="text"
                  id="activityEnd"
                  name="activityEnd"
                  className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
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
                Distance
              </label>
              <input
                type="number"
                id="activityDistance"
                name="activityDistance"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="activityTime" className="pt-5 text-left text-lg">
                Time
              </label>
              <input
                type="number"
                id="activityTime"
                name="activityTime"
                className="w-52 rounded-lg border-2 border-solid border-gray-300 p-2"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Buttons  */}
        <div className="absolute bottom-12 right-4 flex w-full flex-row justify-end">
          <button
            type="button"
            className="mx-8 mt-5 max-h-10 w-24 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-5 max-h-10 w-24 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordActivity;
