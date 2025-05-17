import React from "react";

function SettingsMenu({
  settingsVisible,
  settingsRef,
  customStart,
  handleCustomStartChange,
  handleCustomStartSubmit,
  clearCustomStart,
  mode,
  handleModeChange,
}) {
  if (!settingsVisible) return null;

  return (
    <div
      className='mt-5 bg-gray-200 p-6 rounded absolute right-0 shadow-lg w-64 lg:w-[23rem]'
      ref={settingsRef}
    >
      <label className='block text-lg md:text-xl dark:text-[#242424]'>
        Choose a fixed starting number:
      </label>
      <input
        type='number'
        value={customStart}
        onChange={handleCustomStartChange}
        className='border border-black p-2 rounded mt-2 w-full'
        placeholder='Enter a starting number'
      />
      <button
        onClick={handleCustomStartSubmit}
        className='bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full'
      >
        Update Number
      </button>
      <button
        onClick={clearCustomStart}
        className='bg-gray-500 text-white px-4 py-2 rounded mt-2 w-full'
      >
        Clear Starting Number
      </button>
      <div className='timer-modes mt-4'>
        <label className='block text-lg md:text-xl dark:text-[#242424]'>
          Timer Mode:
        </label>
        <div className='dark:text-[#242424]'>
          <label className='block'>
            <input
              type='radio'
              value='easy'
              checked={mode === "easy"}
              onChange={() => handleModeChange("easy")}
              className='mr-2'
            />
            Easy (10s ⏱️⏱️⏱️)
          </label>
          <label className='block'>
            <input
              type='radio'
              value='medium'
              checked={mode === "medium"}
              onChange={() => handleModeChange("medium")}
              className='mr-2'
            />
            Medium (8s ⏱️⏱️)
          </label>
          <label className='block'>
            <input
              type='radio'
              value='hard'
              checked={mode === "hard"}
              onChange={() => handleModeChange("hard")}
              className='mr-2'
            />
            Hard (6s ⏱️- Default)
          </label>
          <label className='block'>
            <input
              type='radio'
              value='evil'
              checked={mode === "evil"}
              onChange={() => handleModeChange("evil")}
              className='mr-2'
            />
            Evil (4s 👿)
          </label>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
