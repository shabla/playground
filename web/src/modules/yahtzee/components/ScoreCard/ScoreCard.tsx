import React from "react";

import { ScoreSheet, UpperScoreKey, RollResult } from "../../pages/YahtzeePage";

import "./ScoreCard.scss";

export interface ScoreCardProps {
  scores: ScoreSheet
}

type UpperMove = { name: string, key: UpperScoreKey, points: number }

const UpperScoreMove: Record<string, UpperMove> = {
  1: {
    key: 1,
    name: 'Aces',
    points: 1
  },
  2: {
    key: 2,
    name: 'Twos',
    points: 2
  },
  3: {
    key: 3,
    name: 'Threes',
    points: 3
  },
  4: {
    key: 4,
    name: 'Fours',
    points: 4
  },
  5: {
    key: 5,
    name: 'Fives',
    points: 5
  },
  6: {
    key: 6,
    name: 'Sixes',
    points: 6
  },
} as const;

const UpperMoves = Object.keys(UpperScoreMove).map(key => UpperScoreMove[key]);

export const ScoreCard: React.FC<ScoreCardProps> = ({ scores }) => {

  const selectRoll = (roll: UpperMove) => {
    console.log(roll)
  }

  const getMovePoints = (dices: RollResult | undefined, move: UpperMove): number | undefined => {
    if (!dices) {
      return;
    }

    const nbMatchingDices = dices?.filter(val => val === move.key).length || 0;

    return nbMatchingDices * move.points;
  }

  const getUpperTotal = (): number => {
    return UpperMoves.reduce((total, move) => {
      return total + (getMovePoints(scores[move.key], move) || 0);
    }, 0)
  }

  return (
    <table className="score-card">
      <thead>
        <tr className="section">
          <td>Upper Section</td>
          <td>Score</td>
        </tr>
      </thead>
      <tbody>
        {UpperMoves.map(move => (
          <tr key={move.key}>
            <td className="name">
              {move.name}
            </td>
            <td className="score" onClick={() => selectRoll(move)}>
              {getMovePoints(scores[move.key], move)}
            </td>
          </tr>
        ))}

        <tr>
          <td>BONUS</td>
          <td className="score">
            { }
          </td>
        </tr>
        <tr>
          <td>TOTAL</td>
          <td className="score">{getUpperTotal()}</td>
        </tr>

        <tr className="section">
          <td>Lower Section</td>
          <td>Score</td>
        </tr>

      </tbody>
    </table>
  )
}