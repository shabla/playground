export const sleep = (msDuration: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, msDuration));
};
