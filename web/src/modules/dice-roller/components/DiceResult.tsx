import React from "react";
import classnames from "classnames";

interface DiceResultProps {
    result: number;
    minSuccess: number;
}

export const DiceResult: React.FC<DiceResultProps> = ({ result, minSuccess }) => {
    return (
        <div
            className={classnames("border w-8 leading-8 text-center font-bold bg-white rounded", {
                "text-red-500 border-red-500 bg-red-100": result === 1,
                "text-green-500 border-green-500 bg-green-100": result >= minSuccess,
            })}
        >
            {result}
        </div>
    );
};

export default DiceResult;
