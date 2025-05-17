import React from "react";

function TimerDisplay({ timer, getTimeColor }) {
  return (
    <p className={`text-5xl sm:text-6xl text-${getTimeColor()}`}>{timer}s</p>
  );
}

export default TimerDisplay;
