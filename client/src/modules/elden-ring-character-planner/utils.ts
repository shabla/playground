export const getTargetLevel = (baseLevel: number, baseStats: Record<string, number>, targetStats: Record<string, number>): number => {
  const baseTotal = Object.keys(baseStats).reduce((acc, statId) => {
    return acc + baseStats[statId];
  }, 0);

  const desiredTotal = Object.keys(baseStats).reduce((acc, statId) => {
    return acc + (targetStats[statId] || baseStats[statId]);
  }, 0);

  return baseLevel + desiredTotal - baseTotal;
};
