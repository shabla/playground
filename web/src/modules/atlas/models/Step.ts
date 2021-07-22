export interface Step {
    desc: string;
    watchstones?: Record<string, number>;
    totalWatchstones: number;
}