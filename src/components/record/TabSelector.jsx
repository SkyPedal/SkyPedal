const TabSelector = ({ currentTab, changeTab, lock }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex rounded-xl bg-gray-300">
        {/* Tab selector */}
        <button
          name="startEnd"
          type="button"
          className={
            "m-2 w-20 rounded-lg p-1 text-sm" +
            (currentTab === "startEnd"
              ? " bg-[var(--sky-blue)] font-semibold text-white"
              : " disabled:text-gray-400")
          }
          disabled={lock}
          onClick={() => changeTab("startEnd")}
        >
          Location
        </button>
        <button
          name="distanceDuration"
          type="button"
          className={
            "m-2 w-20 rounded-lg p-1 text-sm" +
            (currentTab === "distanceDuration"
              ? " bg-[var(--sky-blue)] font-semibold text-white"
              : " disabled:text-gray-400")
          }
          onClick={() => changeTab("distanceDuration")}
          disabled={lock}
        >
          Manual
        </button>
        <button
          name="dragDrop"
          type="button"
          className={
            "m-2 w-20 rounded-lg p-1 text-sm" +
            (currentTab === "dragDrop"
              ? " bg-[var(--sky-blue)] font-semibold text-white"
              : " disabled:text-gray-400")
          }
          onClick={() => changeTab("dragDrop")}
          disabled={lock}
        >
          File
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
