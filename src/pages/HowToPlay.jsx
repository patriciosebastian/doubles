import BreadCrumbs from "../components/BreadCrumbs"

export default function HowToPlay() {
  const paths = [
    { name: "Home", url: '/' },
    { name: "How to Play", url: '' },
  ];

  return (
    <div className="w-4/5 mx-auto mb-12">
      <BreadCrumbs
        paths={paths}
        className="mt-28 mb-12"
      />

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">How to play Doubles</h2>
        <p className="mb-2">
          Doubles is a fast-paced mental-math challenge: you&apos;ll see a number on your screen and your goal is to type its double as quickly and accurately as you can. Each correct answer immediately doubles the current number, and the clock resets according to your chosen game mode. The more correct doubles you enter in one streak before time runs out, the higher your score will be!
        </p>
        <p>
          To start, click the “New Number” button or press <strong>↵ Enter</strong> after a game over. A random number between 2 and 100 will appear. Then, simply type the doubled result into the input box and hit <strong>↵ Enter</strong> (or wait for automatic submission on blur). If you nail the answer, your streak increases by one and the next challenge begins instantly. One mistake or time-out ends the game, showing your final streak and allowing you to replay.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Game Modes & Timers</h2>
        <p className="mb-2">
          Doubles offers four distinct modes to suit your skill level:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li><strong>Easy</strong>: 10 seconds to answer</li>
          <li><strong>Medium</strong>: 8 seconds to answer</li>
          <li><strong>Hard</strong>: 6 seconds to answer (default)</li>
          <li><strong>Legendary</strong>: 4 seconds to answer</li>
        </ul>
        <p>
          Select your mode by clicking the gear icon ⚙️ in the top right. Changing modes will immediately apply the new timer and save your preference in <code>localStorage</code> so your next session starts at the same difficulty.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Keyboard Shortcuts</h2>
        <p className="mb-2">Speed is everything in Doubles, so mastering these keys will help you keep your hands on the keyboard:</p>
        <ul className="list-inside list-disc mb-4">
          <li><strong>Enter ↵</strong>: Submit your answer or start a new game after a game over.</li>
          <li><strong>Space ␣</strong>: Toggle the “Your Replay” dropdown to review your past answers.</li>
          <li><strong>G</strong>: (While settings are visible) Jump focus to the starting number input.</li>
        </ul>
        <p>
          Pro tip: Keep your eyes on the number display and train your muscle memory for the most common doubles (e.g., 2x2=4, 2x5=10, 2x10=20) to build speed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Scoring & Sharing</h2>
        <p className="mb-2">
          Your score is the count of consecutive correct doubles before time runs out or you make a mistake. The game automatically tracks your personal best (“High Score”) and shows it on every game-over screen. To share your results with friends or on social media, click “Share Your Score” or press the clipboard icon. Your share message will include:
        </p>
        <ul className="list-inside list-disc">
          <li>Your streak count</li>
          <li>An emoji bar representing each correct answer and streaks of five</li>
          <li>A timer-mode emoji badge</li>
          <li>A link to play at <a href="https://playdoubles.org" className="text-blue-600 hover:underline">playdoubles.org</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Custom Starting Number</h2>
        <p>
          Want a specific challenge? Open settings (gear icon) and enter any whole number as your “fixed starting number.” Click “Update Number” to lock in your choice, or “Clear Starting Number” to go back to randomized starts. This feature is perfect for practicing doubling of especially tricky numbers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Tips & Best Practices</h2>
        <ul className="list-inside list-disc mb-4">
          <li>Warm up in Easy mode before ramping up the difficulty.</li>
          <li>Use the “Your Replay” review to identify which numbers slow you down or cause mistakes.</li>
          <li>Practice mental shortcuts for doubling large numbers (e.g., double 47 by doubling 50 and subtracting 6).</li>
          <li>Stay relaxed: a calm mind processes numbers more efficiently.</li>
        </ul>
        <p>With practice, you&apos;ll see your high score climb—good luck and happy doubling!</p>
      </section>
    </div>
  );
};
