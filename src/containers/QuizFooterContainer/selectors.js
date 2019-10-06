export const getTimeLimit = (state, index) => {
  const newLimit = state.quizContent.roundQuestions[index].timeLimit;
  return newLimit;
};
