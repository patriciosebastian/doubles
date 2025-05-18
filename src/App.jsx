import { useState, useEffect, useRef } from 'react';

function App() {
  const [number, setNumber] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [doublesCount, setDoublesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(6);
  const [timerStarted, setTimerStarted] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [mode, setMode] = useState(null);
  const [gameModeAtEnd, setGameModeAtEnd] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const settingsRef = useRef(null);
  const inputRef = useRef(null);
  const gearIconRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    const storedMode = localStorage.getItem('mode');

    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }

    if (storedMode) {
      setMode(storedMode);
      applyMode(storedMode);
    } else {
      setMode('hard');
      applyMode('hard');
    }

    startNewGame();
    // eslint-disable-next-line
  }, []);

  const applyMode = (mode) => {
    if (mode === 'easy') {
      setTimer(10);
      getTimeColor();
    } else if (mode === 'medium') {
      setTimer(8);
      getTimeColor();
    } else if (mode === 'hard') {
      setTimer(6);
      getTimeColor();
    } else if (mode === 'legendary') {
      setTimer(4);
      getTimeColor();
    }
  };

  // Timer logic
  useEffect(() => {
    if (timerStarted && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setCorrectAnswer(number * 2);
            setGameModeAtEnd(mode);
            setGameOver(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameOver, timerStarted, number, mode]);

  // Toggle settings menu visibility
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target) && !gearIconRef.current.contains(e.target)) {
        setSettingsVisible(false);
      }
    };

    if (settingsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [settingsVisible]);

  // Start new game on 'Enter' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver && e.key === 'Enter') {
        startNewGame();
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [gameOver]);

  // Toggle Replay dropdown on space bar key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver && e.key === ' ') {
        e.preventDefault();

        if (detailsRef.current) {
          if (detailsRef.current.open) {
            detailsRef.current.removeAttribute('open');
          } else {
            detailsRef.current.setAttribute('open', true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameOver]);

  const startNewGame = () => {
    // Reset state and figure out starting number
    const startingNumber = customStart ? parseInt(customStart) : getRandomStartingNumber();
    setNumber(startingNumber);
    setDoublesCount(0);
    setInputValue('');
    setGameOver(false);
    applyMode(mode);
    setTimerStarted(false);
    setCorrectAnswer(null);
    setGameModeAtEnd(null);
    setAnswers([]);
    setIsDetailsOpen(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const getRandomStartingNumber = () => {
    return Math.floor(Math.random() * 99) + 2; // Random number between 2 and 100
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (!timerStarted) {
      setTimerStarted(true); // Start the timer when the user starts typing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doubledValue = number * 2;

    if (parseInt(inputValue) === doubledValue) {
      setNumber(doubledValue);
      setDoublesCount(doublesCount + 1);
      setInputValue('');
      applyMode(mode);
      setTimerStarted(true); // Timer restarts after correct answer
      setAnswers([...answers, { value: doubledValue, isCorrect: true }]);
    } else {
      setCorrectAnswer(doubledValue);
      setGameModeAtEnd(mode);
      setGameOver(true);
      setAnswers([...answers, { value: parseInt(inputValue), isCorrect: false }]);
      if (doublesCount > highScore) {
        setHighScore(doublesCount);
        localStorage.setItem('highScore', doublesCount);
      }
    }
  };

  const handleModeChange = (mode) => {
    setMode(mode);
    applyMode(mode);
    localStorage.setItem('mode', mode);
  };

  const handleShareScore = () => {
    const successEmoji = "✅";
    const streakEmoji = "🧠";
    const failureEmoji = "❌";
    const easyModeEmoji = "⏱️⏱️⏱️";
    const mediumModeEmoji = "⏱️⏱️";
    const hardModeEmoji = "⏱️";
    const legendaryEmoji = "🤯";

    let timerModeEmoji;

    // Set the emoji based on the selected mode
    if (gameModeAtEnd === 'easy') {
      timerModeEmoji = easyModeEmoji;
    } else if (gameModeAtEnd === 'medium') {
      timerModeEmoji = mediumModeEmoji;
    } else if (gameModeAtEnd === 'hard') {
      timerModeEmoji = hardModeEmoji;
    } else if (gameModeAtEnd === 'legendary') {
      timerModeEmoji = legendaryEmoji;
    }

    let shareMessage = `I doubled numbers ${doublesCount} times in Doubles!\n`;
    shareMessage += `${timerModeEmoji}\n`;

    for (let i = 0; i < doublesCount; i++) {
      shareMessage += successEmoji;
      if ((i + 1) % 5 === 0) {
        shareMessage += streakEmoji;
      }
    }

    if (gameOver) {
      shareMessage += ` ${failureEmoji}`;
    }

    const gameUrl = 'https://playdoubles.org';
    shareMessage += `\n\nPlay here: ${gameUrl}`;

    navigator.clipboard.writeText(shareMessage)
      .then(() => alert('Results copied to clipboard!'))
      .catch((err) => console.error('Error copying text: ', err));
  };

  const handleCustomStartChange = (e) => {
    setCustomStart(e.target.value);
  };

  const handleCustomStartSubmit = (e) => {
    e.preventDefault();
    const customNumber = parseInt(customStart);
    setNumber(customNumber);
  };

  const clearCustomStart = () => {
    setCustomStart('');
    setNumber(getRandomStartingNumber());
  };

  // Timer color based on mode and time left
  const getTimeColor = () => {
    if (mode === 'easy') {
      if (timer > 5) return 'green-500';
      if (timer > 2) return 'yellow-500';
      return 'red-500';
    }

    if (mode === 'medium') {
      if (timer > 5) return 'green-500';
      if (timer > 2) return 'yellow-500';
      return 'red-500';
    }

    if (mode === 'hard') {
      if (timer > 3) return 'green-500';
      if (timer > 1) return 'yellow-500';
      return 'red-500';
    }

    if (mode === 'legendary') {
      if (timer > 2) return 'green-500';
      if (timer > 0) return 'yellow-500';
      return 'red-500';
    }
  }

  // Toggle settings visibility
  const toggleSettingsVisibility = () => {
    setSettingsVisible(!settingsVisible);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <>
      <div className='relative mb-28'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mt-8 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500 drop-shadow-lg'>
          Doubles
        </h1>
        <div className='ml-auto absolute right-0 top-1/2 transform -translate-y-1/2 z-30'>
          <button
            onClick={toggleSettingsVisibility}
            className='text-gray-100 bg-transparent focus:outline-none focus:ring-0'
            ref={gearIconRef}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
          </button>

          {settingsVisible && (
            <div
              className='mt-5 bg-gray-900 p-6 rounded absolute right-0 shadow-lg w-64 z-20 lg:w-[23rem] text-blue-100'
              ref={settingsRef}
            >
              <label className='block text-lg md:text-xl text-blue-300'>
                Choose a fixed starting number:
              </label>
              <input
                type='number'
                value={customStart}
                onChange={handleCustomStartChange}
                className='border border-blue-400 p-2 rounded mt-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter a starting number'
              />
              <button
                onClick={handleCustomStartSubmit}
                className='bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700 transition-colors duration-200 shadow-md'
              >
                Update Number
              </button>
              <button
                onClick={clearCustomStart}
                className='bg-gray-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-gray-700 transition-colors duration-200 shadow-md'
              >
                Clear Starting Number
              </button>
              <div className='timer-modes mt-4'>
                <label className='block text-lg md:text-xl text-blue-300'>
                  Timer Mode:
                </label>
                <div className='text-blue-100'>
                  <label className='block'>
                    <input
                      type='radio'
                      value='easy'
                      checked={mode === "easy"}
                      onChange={() => handleModeChange("easy")}
                      className='mr-2 text-blue-500 focus:ring-blue-500'
                    />
                    Easy (10s ⏱️⏱️⏱️)
                  </label>
                  <label className='block'>
                    <input
                      type='radio'
                      value='medium'
                      checked={mode === "medium"}
                      onChange={() => handleModeChange("medium")}
                      className='mr-2 text-blue-500 focus:ring-blue-500'
                    />
                    Medium (8s ⏱️⏱️)
                  </label>
                  <label className='block'>
                    <input
                      type='radio'
                      value='hard'
                      checked={mode === "hard"}
                      onChange={() => handleModeChange("hard")}
                      className='mr-2 text-blue-500 focus:ring-blue-500'
                    />
                    Hard (6s ⏱️- Default)
                  </label>
                  <label className='block'>
                    <input
                      type='radio'
                      value='legendary'
                      checked={mode === "legendary"}
                      onChange={() => handleModeChange("legendary")}
                      className='mr-2 text-blue-500 focus:ring-blue-500'
                    />
                    Legendary (4s 🤯)
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='container mx-auto p-4 text-center'>
        <p
          className={`text-6xl sm:text-7xl font-bold text-${getTimeColor()} drop-shadow-lg`}
        >
          {timer}s
        </p>
        <p className='mb-24 text-blue-200 text-base sm:text-lg'>Start typing</p>

        {gameOver ? (
          <div className='text-center p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl'>
            <p className='text-red-400 text-xl sm:text-2xl lg:text-3xl font-bold mb-8'>
              Game Over! You doubled{" "}
              <span className='font-extrabold'>{doublesCount}</span> times on{" "}
              <span className='font-extrabold'>{gameModeAtEnd}</span>
            </p>
            <p className='text-blue-200 text-lg sm:text-xl'>
              The correct answer was:
              <br />
              <span className='font-bold text-blue-100'>
                {formatNumber(correctAnswer)}
              </span>
            </p>
            <p className='text-blue-200 text-lg sm:text-xl mb-6'>
              Your highest score:{" "}
              <span className='font-bold text-blue-100'>{highScore}</span>
            </p>
            <details
              className='mb-8 text-blue-300'
              onToggle={(e) => setIsDetailsOpen(e.target.open)}
              ref={detailsRef}
            >
              <summary className='hover:cursor-pointer font-semibold'>
                Your Replay
              </summary>
              <small className='text-blue-400 dark:text-stone-600 block mb-4'>
                you can toggle this dropdown with the space bar
              </small>
              <div className='border rounded bg-gray-700 dark:bg-stone-700 dark:border-transparent text-black dark:text-white'>
                <div className='grid grid-rows-6 grid-flow-col gap-y-2'>
                  {answers.map((answer, index) => (
                    <div
                      key={index}
                      className={`p-2 border-b border-gray-600 dark:border-gray-500 text-sm ${
                        answer.isCorrect ? "text-green-400" : "text-red-400"
                      }`}
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
              className='bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 mt-4 sm:mt-0 hover:bg-blue-700 transition-colors duration-200 shadow-md'
              onClick={startNewGame}
            >
              Start New Game
            </button>
            <button
              className='bg-green-600 text-white px-6 py-3 rounded-lg mt-4 sm:mt-0 hover:bg-green-700 transition-colors duration-200 shadow-md'
              onClick={handleShareScore}
            >
              Share Your Score
            </button>
            <p className='hidden w-fit text-center text-blue-400 text-sm mt-4 lg:block lg:ml-44'>
              Or Press Enter &#8629;
            </p>
          </div>
        ) : (
          <div className='text-center space-y-6'>
            <p className='text-xl sm:text-2xl inline mr-4 text-blue-300 align-middle'>
              Current Number:{" "}
              <span className='font-bold text-blue-100'>
                {formatNumber(number)}
              </span>
            </p>
            <button
              className='mb-4 text-sm border bg-[#1a1a1a] border-gray-400 dark:border-blue-400 text-gray-100 rounded px-2 py-1 transition-colors duration-200 !mt-0 align-middle focus:outline-none focus:ring-0'
              onClick={startNewGame}
            >
              New Number
            </button>
            <form onSubmit={handleSubmit} className='mt-6'>
              <input
                type='number'
                value={inputValue}
                onChange={handleInputChange}
                className={`border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-4 rounded text-xl sm:text-3xl w-full bg-gray-800 text-white placeholder-gray-400`}
                placeholder='Enter your answer'
                ref={inputRef}
              />
            </form>
            <p className='mt-4 text-lg sm:text-xl text-blue-200'>
              Streak: {doublesCount}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`text-center text-white ${!gameOver ? 'mt-48' : ''} ${isDetailsOpen ? '' : 'mt-16'}`}
      >
        <small className="block">
          Comments or questions? <a href="mailto:psalazardev@gmail.com" className="text-inherit underline hover:text-inherit" target="_blank">Email here</a>
        </small>
        <small>
          copyright 2024-present Doubles by{" "}
          <a
            href='https://patriciosalazar.dev'
            target='_blank'
            className='underline text-white hover:text-white'
          >
            Patricio Salazar
          </a>
        </small>
      </footer>
    </>
  );
}

export default App;