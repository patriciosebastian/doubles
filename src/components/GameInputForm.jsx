import PropTypes from "prop-types";

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
  // Determine the correct focus outline classes based on timer color
  const timerColor = getTimeColor();
  const focusOutlineClass = timerColor
    ? `focus:outline-solid focus:outline-2 focus:outline-${timerColor}`
    : ""; // Default or no outline class

  // console.log(getTimeColor()); // Remove this console log after debugging

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
          className={`border border-black p-4 rounded text-xl sm:text-3xl w-full focus:ring-0 focus:shadow-none ${focusOutlineClass}`}
          placeholder='Enter your answer'
          ref={inputRef}
        />
      </form>
      <p className='mt-4 text-lg sm:text-xl'>Streak: {doublesCount}</p>
    </div>
  );
}

GameInputForm.propTypes = {
  number: PropTypes.number,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  formatNumber: PropTypes.func.isRequired,
  doublesCount: PropTypes.number.isRequired,
  startNewGame: PropTypes.func.isRequired,
  getTimeColor: PropTypes.func.isRequired,
};

export default GameInputForm;
