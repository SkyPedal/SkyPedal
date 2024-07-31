import { useState } from "react";

const RecordActivity = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <div className="h-full p-4 px-36 relative">
      <h1 className="text-3xl text-left pt-5 pl-5">Record Activity</h1>

      {/* <div className="flex flex-col h-full justify-between"> */}
      <div className="">
        <form className="">
          <div className="flex flex-col p-5">
            <label htmlFor="activityName" className="text-left text-lg">
              Title
            </label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              className="border-2 border-solid border-gray-300 rounded-lg p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="activityDate" className="text-left text-lg pt-5">
              Date
            </label>
            <input
              type="date"
              id="activityDate"
              name="activityDate"
              className="border-2 border-solid border-gray-300 rounded-lg p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="activityStart"
                  className="text-left text-lg pt-5"
                >
                  Start Location
                </label>
                <input
                  type="text"
                  id="activityStart"
                  name="activityStart"
                  className="border-2 border-solid border-gray-300 rounded-lg p-2"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="activityEnd" className="text-left text-lg pt-5">
                  End Location
                </label>
                <input
                  type="text"
                  id="activityEnd"
                  name="activityEnd"
                  className="border-2 border-solid border-gray-300 rounded-lg p-2"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <p
              className="w-full text-center border-b-2 mt-8 mb-2"
              style={{ lineHeight: "0.1em" }}
            >
              <span className="bg-white pl-2 pr-2">OR</span>
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="activityDistance"
                  className="text-left text-lg pt-5"
                >
                  Distance
                </label>
                <input
                  type="number"
                  id="activityDistance"
                  name="activityDistance"
                  className="border-2 border-solid border-gray-300 rounded-lg p-2"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="activityTime"
                  className="text-left text-lg pt-5"
                >
                  Time
                </label>
                <input
                  type="number"
                  id="activityTime"
                  name="activityTime"
                  className="border-2 border-solid border-gray-300 rounded-lg p-2"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Buttons  */}
          <div className="flex flex-row justify-end p-5 absolute bottom-12 right-36">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 mx-2 max-h-10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 max-h-10"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordActivity;
