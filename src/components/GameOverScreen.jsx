import React from "react";

function GameOverScreen({
  doublesCount,
  gameModeAtEnd,
  correctAnswer,
  highScore,
  answers,
  formatNumber,
  startNewGame,
  handleShareScore,
  setIsDetailsOpen,
  detailsRef,
}) {
  return (
    <div className='text-center'>
      <p className='text-red-500 text-lg sm:text-xl lg:text-2xl mb-14'>
        Game Over! You doubled <span className='font-bold'>{doublesCount}</span>{" "}
        times on <span className='font-bold'>{gameModeAtEnd}</span>
      </p>
      <p className='text-lg sm:text-xl'>
        The correct answer was:
        <br />
        <span className='font-bold'>{formatNumber(correctAnswer)}</span>
      </p>
      <p className='text-lg sm:text-xl mb-2'>Your highest score: {highScore}</p>
      <details
        className='mb-20'
        onToggle={(e) => setIsDetailsOpen(e.target.open)}
        ref={detailsRef}
      >
        <summary className='hover:cursor-pointer'>Your Replay</summary>
        <small className='text-stone-400 dark:text-stone-600'>
          you can toggle this dropdown with the space bar
        </small>
        <div className='border rounded bg-gray-100 dark:bg-stone-700 dark:border-transparent text-black dark:text-white'>
          <div className='grid grid-rows-6 grid-flow-col gap-y-4'>
            {answers.map((answer, index) => (
              <div
                key={index}
                className='p-4 border-b border-gray-300 dark:border-gray-500'
              >
                {answer.isCorrect
                  ? `✅ ${formatNumber(answer.value)}`
                  : `❌ ${formatNumber(answer.value)}`}
              </div>
            ))}
          </div>
        </div>
      </details>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded mr-4 mt-4 sm:mt-0'
        onClick={startNewGame}
      >
        Start New Game
      </button>
      <button
        className='bg-green-500 text-white px-4 py-2 rounded mt-4 sm:mt-0'
        onClick={handleShareScore}
      >
        Share Your Score
      </button>
      <p className='text-left pl-20 w-fit text-stone-400 hidden md:block'>
        Or Press Enter &#8629;
      </p>
    </div>
  );
}

export default GameOverScreen;
