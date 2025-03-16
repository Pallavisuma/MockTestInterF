import { useState, useEffect } from "react";

const Timer = ({ minutes, onTimeUp }) => {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  return (
    <div className="text-xl font-bold">
      Time Left: {Math.floor(time / 60)}:{time % 60}
    </div>
  );
};

export default Timer;
