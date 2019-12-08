import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import localStorage from 'services/localStorage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Leaderboard API ***
  leaderboard = () => this.db.ref('leaderboard');

  updateUserProgress = (payload, next) => {
    // the authUser object is the authUser merged with the user data in realtime database
    const { authUser, roundId, finalScore, hasNewHighScore } = payload;
    const newScore = authUser.score + finalScore;

    // TODO this is not updating - its messing up
    if (hasNewHighScore) {
      this.leaderboard().update({
        [newScore]: authUser.username,
      });
    }

    this.user(authUser.uid)
      .update({
        ...authUser,
        roundsPlayed: {
          ...authUser.roundsPlayed,
          [roundId]: finalScore,
        },
        score: newScore,
      })
      .then(() => {
        localStorage.update('authUser', 'score', newScore);
        next();
      });
  };

  updateLeaderboard = (next, fallback) =>
    this.leaderboard()
      .set({
        leader: 'johnny',
      })
      .then(() => {});

  // when score updates
  onAuthUserScoreUpdateListener = (userId, next, fallback) =>
    this.user(userId).on('child_changed', function(data) {
      console.log('------------------', data);
    });

  // Merge Auth and DB User API
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      console.log('authstatechanged');
      if (authUser) {
        console.log('ur auth');
        this.user(authUser.uid)
          .once('value')
          // TODO: A READ FROM THE DB - look up the authUser's data from real time database
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
