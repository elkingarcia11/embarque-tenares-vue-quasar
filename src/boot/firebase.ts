// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import process from 'process';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const email = process.env.FIREBASE_USERNAME || '';
const password = process.env.FIREBASE_PASSWORD || '';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Set up authentication persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Check if user is already signed in
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Only sign in if no user is currently signed in
        return signInWithEmailAndPassword(auth, email, password)
          .catch((error) => {
            console.error('Authentication error:', error);
          });
      }
    });
  })
  .catch((error) => {
    console.error('Persistence error:', error);
  });

export default db;
