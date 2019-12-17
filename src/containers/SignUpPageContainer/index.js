import React, { useContext } from 'react';
import Layout from 'components/Layout';
import Button from 'components/Button';
import SignUpHeader from 'components/SignUpHeader';
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
    <Layout>
      <SignUpHeader score={totalScore} />
      <SignUpForm initialData={{ totalScore, roundId }} />
      <p style={{ textAlign: 'center' }}>already a player?</p>
      <Button to='/signin'>Sign In</Button>
    </Layout>
  );
}

export default SignUpPageContainer;
