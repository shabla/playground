import React, { useState, useEffect } from "react";
import classnames from "classnames";

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

const DigitalNumber: React.FC<{ number: number }> = ({ number }) => {
    const [pixels, setPixels] = useState<number[][]>(EMPTY_NUMBER);

    useEffect(() => {
        setPixels(numbers[number] || EMPTY_NUMBER);
    }, [number]);

    return (
        <div className="grid grid-cols-3 mr-2 even:mr-7">
            {pixels.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={classnames("h-4 w-4 select-none border border-white transition duration-300 ease-out", {
                            "bg-gray-700 opacity-100": col,
                            "opacity-0 transform-gpu scale-50": !col,
                        })}
                    >
                        &nbsp;
                    </div>
                ))
            )}
        </div>
    );
};

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
            {numbers.map((nb, nbIndex) => (
                <DigitalNumber number={nb} key={nbIndex} />
            ))}
        </div>
    );
};
