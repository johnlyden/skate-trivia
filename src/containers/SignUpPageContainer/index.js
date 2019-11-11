import React, { useContext } from 'react';
import Layout from 'components/Layout';
import SignUpForm from 'containers/SignUpContainer';
import { Context } from 'store';
function SignUpPageContainer() {
  const { store } = useContext(Context);
  const { totalScore, quizContent } = store;
  let roundId = '';

  if (quizContent) {
    roundId = quizContent.roundId;
  }

  return (
    <div>
      <Layout>
        {totalScore && (
          <p>you scored {totalScore} points - sign up to save ur progress</p>
        )}
        <h1>SignUp</h1>
        <SignUpForm initialData={{ totalScore, roundId }} />
      </Layout>
    </div>
  );
}

export default SignUpPageContainer;
