import React from "react";

function GameInputForm({
  number,
  inputValue,
  handleInputChange,
  handleSubmit,
  inputRef,
  formatNumber,
  doublesCount,
  startNewGame,
  getTimeColor,
}) {
  return (
    <div className='text-center'>
      <p className='text-lg sm:text-2xl inline mr-4'>
        Current Number:{" "}
        <span className='font-semibold underline'>{formatNumber(number)}</span>
      </p>
      <button className='mb-4 text-sm' onClick={startNewGame}>
        New Number
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          value={inputValue}
          onChange={handleInputChange}
          className={`border border-black outline-${getTimeColor()} focus:outline-${getTimeColor()} p-4 rounded text-xl sm:text-3xl w-full`}
          placeholder='Enter your answer'
          ref={inputRef}
        />
      </form>
      <p className='mt-4 text-lg sm:text-xl'>Streak: {doublesCount}</p>
    </div>
  );
}

export default GameInputForm;
