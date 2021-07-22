import { RollOutput } from "./models";

export interface RollStats {
    successes: number;
    minRolls: number;
    maxRolls: number;
}

export const getRollStats = (item: RollOutput): RollStats => {
    return [item, ...(item.rerolls || [])].reduce(
        (acc, item) => {
            item.results.forEach((res) => {
                if (res >= item.successValue) {
                    acc.successes++;
                }

                if (res === item.diceSize) {
                    acc.maxRolls++;
                }

                if (res === 1) {
                    acc.minRolls++;
                }
            });

            return acc;
        },
        {
            successes: 0,
            minRolls: 0,
            maxRolls: 0,
        } as RollStats
    );
};
