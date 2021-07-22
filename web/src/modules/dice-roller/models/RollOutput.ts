export interface RollOutput {
    timestamp: Date;
    name?: string;
    nbDices: number;
    diceSize: number;
    successValue: number;
    results: number[];
    rerolls?: RollOutput[];
}