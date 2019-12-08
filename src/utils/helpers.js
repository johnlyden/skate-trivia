function formatScores(objectOfScores) {
  return Object.keys(objectOfScores)
    .map(s => [parseInt(s, 10), objectOfScores[s]])
    .sort()
    .reverse();
}

export { formatScores };
