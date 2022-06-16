export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min); // inclusive
    max = Math.floor(max) + 1; // inclusive

    return Math.floor(Math.random() * (max - min) + min);
};