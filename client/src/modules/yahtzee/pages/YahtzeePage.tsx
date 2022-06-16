import React, { useState } from "react";
import classNames from "classnames";

import { Page, Row, Column, Button } from "@/components";
import { ScoreCard } from "../components/ScoreCard/ScoreCard";

import "./YahtzeePage.scss";

export type RollResult = number[];

export type UpperScoreKey = 1 | 2 | 3 | 4 | 5 | 6;
export type LowerScoreKey =
  'triple' |
  'quad' |
  'fullHouse' |
  'smallStraight' |
  'bigStraight' |
  'yahtzee' |
  'chance'
export type ScoreKey = UpperScoreKey | LowerScoreKey;

export type UpperScoreSheet = Partial<Record<UpperScoreKey, RollResult>>
export type LowerScoreSheet = Partial<Record<LowerScoreKey, RollResult>>
export type ScoreSheet = UpperScoreSheet & LowerScoreSheet;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const YahtzeePage: React.FC = () => {
  const [dices, setDices] = useState<RollResult>([0, 0, 0, 0, 0])
  const [hold, setHold] = useState<RollResult>([])
  const [scores, setScores] = useState<ScoreSheet>({
    1: [1, 2, 3, 1, 1],
    4: [4, 4, 4, 4, 1],
    6: [1, 2, 3, 6, 6],
  });

  const roll = () => {
    const rolls = new Array(5);
    for (let i = 0; i < 5; i++) {
      rolls[i] = randomInt(1, 6)
    }
    setDices(rolls)
  }

  const holdDice = (index: number) => {
    setHold(val => [...val, index])
  }

  const removeHold = (index: number) => {
    setHold(val => [
      ...val.slice(0, index),
      ...val.slice(index + 1)
    ])
  }

  return (
    <Page title="Yahtzee" className="yahtzee-page">
      <h1>Yahtzee</h1>

      <Row gap={20}>
        <Column>
          <ScoreCard scores={scores} />
        </Column>

        <Column gap={20}>
          <Row align="center center" gap={20}>
            {dices.map((dice, index) => {
              return (
                <Column
                  key={index}
                  align="center center"
                  className={classNames("dice",)}
                  onClick={() => holdDice(index)}
                >
                  {dice === 0 ? '/' : dice}
                </Column>
              )
            })}
          </Row>

          <Button size="xl" onClick={() => roll()}>
            Roll Dice
          </Button>

          <Row align="center center" className="hold" gap={20}>
            {hold.map((holdIndex, index) => {
              return (
                <Column
                  key={index}
                  align="center center"
                  className="dice"
                  onClick={() => removeHold(index)}
                >
                  {dices[holdIndex]}
                </Column>
              )
            })}
          </Row>
        </Column>
      </Row >
    </Page >
  );
};