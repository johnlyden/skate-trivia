import initializeClient from "./client";
import { CONTENT_REQUEST, CONTENT_RECEIVED } from "store/actions";

const CONTENT_TYPE = "round";

function fetchContent(dispatch) {
  dispatch({ type: CONTENT_REQUEST });

  const client = initializeClient();

  client
    .getEntries({ content_type: CONTENT_TYPE, order: "-sys.createdAt" })
    .then(response => {
      const [round, ...others] = response.items;
      const quizContent = formatContent(round);
      const archivedRounds = [...others, round].reduce((acc, round, i) => {
        acc[round.sys.id] = formatContent(round);
        return acc;
      }, {});

      dispatch({
        type: CONTENT_RECEIVED,
        payload: {
          quizContent,
          archivedRounds
        }
      });
    });
}

function formatContent(round) {
  const roundName = round.fields.name;
  const roundId = round.sys.id;

  const roundQuestions = round.fields.questions.map(question => {
    const { body, answer, choices, pointValue, timeLimit } = question.fields;
    return {
      body,
      choices,
      answer,
      pointValue,
      timeLimit
    };
  });

  return {
    roundName,
    roundQuestions,
    roundId
  };
}

export default fetchContent;
