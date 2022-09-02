const AUTH_SCOPES = ['email', 'profile', 'calendar'];

/***************************************************************************
 * Initialize Firebase
 */
// OVERWRITE ME
// /*
//   {
//     apiKey: "AIzaSyCjwwUfOFR95aTaf_Zch-TlEEyS-pTRYxM",
//     authDomain: "easily-app.firebaseapp.com",
//     databaseURL: "https://easily-app.firebaseio.com",
//     projectId: "easily-app",
//     storageBucket: "easily-app.appspot.com",
//     messagingSenderId: "650975721235"
//   }
//   */
const FIREBASE_CONFIG = {};
const fb = firebase.initializeApp(FIREBASE_CONFIG);

// OVERWRITE ME
// ....apps.googleusercontent.com
const CLIENT_ID = 'AIzaSyCjwwUfOFR95aTaf_Zch-TlEEyS-pTRYxM';

function handleIsSignedIn(isSignedIn) {
  if (isSignedIn) {
    const auth2 = gapi.auth2.getAuthInstance();
    const currentUser = auth2.currentUser.get();
    const profile = currentUser.getBasicProfile();
    console.log('gapi: user signed in!', {
      name: profile.getName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail(),
    });
    const authResponse = currentUser.getAuthResponse(true);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      authResponse.id_token,
      authResponse.access_token
    );
    fb.auth()
      .signInWithCredential(credential)
      .then(({ user }) => {
        console.log('firebase: user signed in!', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      });
  } else {
    console.log('gapi: user is not signed in');
  }
}

new Promise((resolve, reject) => {
  gapi.load('client:auth2', () => {
    resolve();
  });
})
  .then(() => {
    console.log('gapi: client:auth2 loaded', gapi.client);
  })
  .then(() => {
    return gapi.client.init({
      apiKey: FIREBASE_CONFIG.apiKey,
      clientId: CLIENT_ID,
      scope: AUTH_SCOPES.join(' '),
    });
  })
  .then(() => {
    console.log('gapi: client initialized');
  })
  .then(() => {
    return gapi.client.load('analytics', 'v3');
  })
  .then(() => {
    console.log('gapi: analytics v3 loaded', gapi.client.analytics);
  })
  .then(() => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.listen(handleIsSignedIn);
    handleIsSignedIn(auth2.isSignedIn.get());
    document
      .querySelector('#sign_in')
      .addEventListener('click', function handleSignIn() {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2.isSignedIn.get()) {
          alert('already signed in');
          return;
        }

        auth2.signIn().catch((error) => {
          alert(`sign in error: ${error}`);
        });
      });
    document
      .querySelector('#sign_out')
      .addEventListener('click', function handleSignOut() {
        console.log('signing out...');
        const auth2 = gapi.auth2.getAuthInstance();
        if (!auth2.isSignedIn.get()) {
          alert('Not signed in!');
          return;
        }

        auth2
          .signOut()
          .then(() => {
            console.log('gapi: sign out complete');
          })
          .then(() => {
            return fb.auth().signOut();
          })
          .then(() => {
            console.log('firebase: sign out complete');
          });
      });
  });
