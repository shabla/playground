import React, { useState, useEffect } from "react";

import { DigitalNumber } from "./DigitalNumber";

export const DigitalClock: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now
        .getHours()
        .toString()
        .padStart(2, "0")
        .split("")
        .map((nbStr) => parseInt(nbStr));
      const minutes = now
        .getMinutes()
        .toString()
        .padStart(2, "0")
        .split("")
        .map((nbStr) => parseInt(nbStr));
      const seconds = now
        .getSeconds()
        .toString()
        .padStart(2, "0")
        .split("")
        .map((nbStr) => parseInt(nbStr));

      setNumbers([...hours, ...minutes, ...seconds]);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-row">
      {numbers.map((nb, nbIndex) => <DigitalNumber number={nb} key={nbIndex} />)}
    </div>
  );
};
