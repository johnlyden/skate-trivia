function formatScores(objectOfScores) {
  return Object.keys(objectOfScores)
    .map(s => [parseInt(objectOfScores[s], 10), s.toString()])
    .sort((a, b) => b[0] - a[0]);
}

export { formatScores };
