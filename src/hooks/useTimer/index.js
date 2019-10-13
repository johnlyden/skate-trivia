import React, { useEffect, useState } from 'react';

function useTimer(time, cb) {
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeIsUp(true);
      cb();
    }, time + 500);

    return () => {
      console.log('fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
      clearTimeout(timer);
    };
  });
}

export { useTimer };
