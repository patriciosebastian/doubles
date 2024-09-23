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
  const settingsRef = useRef(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    startNewGame();

    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timerStarted && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setCorrectAnswer(number * 2);
            setGameOver(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameOver, timerStarted, number]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsVisible(false);
      }
    };

    if (settingsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [settingsVisible]);

  const startNewGame = () => {
    // Reset state and figure out starting number
    const startingNumber = customStart ? parseInt(customStart) : getRandomStartingNumber();
    setNumber(startingNumber);
    setDoublesCount(0);
    setInputValue('');
    setGameOver(false);
    setTimer(6); // Reset timer
    setTimerStarted(false);
    setCorrectAnswer(null);
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
      setTimer(6); // Reset timer after correct answer
      setTimerStarted(true); // Timer restarts after correct answer
    } else {
      setCorrectAnswer(doubledValue);
      setGameOver(true);
      if (doublesCount > highScore) {
        setHighScore(doublesCount);
        localStorage.setItem('highScore', doublesCount);
      }
    }
  };

  const handleShareScore = () => {
    const successEmoji = "✅";
    const streakEmoji = "🧠";
    const failureEmoji = "💥";

    let shareMessage = `I doubled numbers ${doublesCount} times in Doubles!\n`;

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

  // Timer color based on time left
  const getTimeColor = () => {
    if (timer > 4) return 'text-green-500';
    if (timer > 2) return 'text-yellow-500';
    return 'text-red-500';
  }

  // Toggle settings visibility
  const toggleSettingsVisibility = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <>
      <div className="relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-4 mb-6">Doubles</h1>
        <div className="ml-auto absolute right-0 top-[0.85rem] md:top-6">
          <button onClick={toggleSettingsVisibility} className="text-gray-600 hover:text-gray-900 bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </button>
    
          {settingsVisible && (
            <div className="mt-5 bg-gray-200 p-6 rounded absolute right-0 shadow-lg w-48 sm:w-56 md:w-64" ref={settingsRef}>
              <label className="block text-base">Choose a fixed starting number:</label>
              <input
                type="number"
                value={customStart}
                onChange={handleCustomStartChange}
                className="border border-black p-2 rounded mt-2 w-full"
                placeholder="Enter a starting number"
              />
              <button
                onClick={handleCustomStartSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Update Number
              </button>
              <button
                onClick={clearCustomStart}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Clear Starting Number
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto p-4 text-center">
        <p className={`text-5xl sm:text-6xl ${getTimeColor()}`}>{timer}s</p>
        <p className="mb-24 text-gray-400 text-base sm:text-lg">Start typing</p>

        {gameOver ? (
          <div className="text-center">
            <p className="text-red-500 text-lg sm:text-xl mb-4">Game Over! You doubled <span className="font-bold">{doublesCount}</span> times.</p>
            <p className="text-lg sm:text-xl">The correct answer was:<br />
              <span className="font-bold">{correctAnswer}</span>
            </p>
            <p className="text-lg sm:text-xl mb-4">Your highest score: {highScore}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4 mt-4 sm:mt-0" onClick={startNewGame}>
              Start New Game
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 sm:mt-0" onClick={handleShareScore}>
              Share Your Score
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg sm:text-2xl inline mr-4">Current Number: {number}</p>
            <button className="bg-transparent mb-4 text-sm" onClick={startNewGame}>New Number</button>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-black p-4 rounded text-xl sm:text-3xl w-full"
                placeholder="Enter your answer"
              />
            </form>
            <p className="mt-4 text-lg sm:text-xl">Streak: {doublesCount}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
