import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDhT314nwCXLRtzg6R-46oYUs_yvyGDhBI',
  authDomain: 'crwn-chaos-db.firebaseapp.com',
  databaseURL: 'https://crwn-chaos-db.firebaseio.com',
  projectId: 'crwn-chaos-db',
  storageBucket: 'crwn-chaos-db.appspot.com',
  messagingSenderId: '795227844397',
  appId: '1:795227844397:web:5340478d3136126835eda4',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
