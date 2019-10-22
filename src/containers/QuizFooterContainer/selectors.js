export const getTimeLimit = (state, index) => {
  return state.quizContent.roundQuestions[index].timeLimit;
};

export const getQuizLength = state => {
  return state.quizContent.roundQuestions.length;
};
