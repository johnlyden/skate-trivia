export const getQuestion = (state, index) => {
  // console.log({ state });
  console.log({ state });
  return state.quizContent.roundQuestions[index];
};
