import React, { useEffect, useState } from "react";

import { TextField } from "@/components";
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

      <TextField
        id="success-input"
        defaultValue={successValue.toString()}
        onChange={value => setSuccessValue(parseInt(value))}
      />

      <label htmlFor="dice-size-input">Dice Size</label>

      <TextField
        id="dice-size-input"
        defaultValue={diceSize.toString()}
        onChange={value => setDiceSize(parseInt(value))}
      />
    </div>
  );
};
