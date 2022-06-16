import { FC, useState, useEffect } from "react";
import classNames from "classnames";

import "./DigitalNumber.scss"

const numbers: Record<number, number[][]> = {
  0: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  1: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  2: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  3: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  4: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  5: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  6: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  7: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  8: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  9: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
};

const EMPTY_NUMBER = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const DigitalNumber: FC<{ number: number }> = ({ number }) => {
  const [pixels, setPixels] = useState<number[][]>(EMPTY_NUMBER);

  useEffect(() => {
    setPixels(numbers[number] || EMPTY_NUMBER);
  }, [number]);

  return (
    <div className="DigitalNumber">
      {pixels.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={classNames("cell", {
              "on": col,
              "off": !col,
            })}
          >
            &nbsp;
          </div>
        ))
      )}
    </div>
  );
};