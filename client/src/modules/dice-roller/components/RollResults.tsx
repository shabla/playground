import React from "react";

import { RollOutput } from "../models";
import { DiceResult } from "./DiceResult";

export interface RollResultsProps {
    data: RollOutput;
}

export const RollResults: React.FC<RollResultsProps> = ({ data }) => {
    return (
        <>
            {data.results.map((result, resultIndex) => {
                return (
                    <DiceResult key={resultIndex} result={result} minSuccess={data.successValue} />
                );
            })}
        </>
    );
};