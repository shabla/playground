import React, { useEffect, useState } from "react";

import { InputText } from "components";
import { GameSettings } from "../models";

export interface HostSettingsProps {
    onChange: (settings: Partial<GameSettings>) => void;
}

export const HostSettings: React.FC<HostSettingsProps> = ({ onChange }) => {
    const [diceSize, setDiceSize] = useState<number>(10);
    const [successValue, setSuccessValue] = useState<number>(8);

    /**
     * TODO:
     * - toggle for reroll on min roll
     * - toggle for reroll on max roll
     */

    useEffect(() => {
        onChange({
            diceSize,
            successValue,
        });
    }, [onChange, diceSize, successValue]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <label htmlFor="success-input">Minimum Success Value</label>

            <InputText
                id="success-input"
                defaultValue={successValue.toString()}
                onChange={(e) => setSuccessValue(parseInt(e.currentTarget.value))}
            />

            <label htmlFor="dice-size-input">Dice Size</label>

            <InputText
                id="dice-size-input"
                defaultValue={diceSize.toString()}
                onChange={(e) => setDiceSize(parseInt(e.currentTarget.value))}
            />
        </div>
    );
};
