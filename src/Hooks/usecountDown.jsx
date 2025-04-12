import { useState, useEffect } from "react";

function useCountDown(match) {
  const [timeLeft, setTimeLeft] = useState(0);

  const matchTime = match[0] && `${match[0].event_date}T${match[0].event_time}`;
  const now = new Date().getTime();
  const matchTimeInMillis = new Date(matchTime).getTime();
  const difference = matchTimeInMillis - now;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const matchTimeInMillis = new Date(matchTime).getTime();
      const difference = matchTimeInMillis - now;

      if (difference > 0 && difference < 14400000) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(0);
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [match]);

  const formatTimeLeft = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  const countDown = formatTimeLeft(timeLeft).split(':').map((time) => time < 10 ? `0${time}` : time).join(':');

  return {difference, countDown };
}

export default useCountDown;
