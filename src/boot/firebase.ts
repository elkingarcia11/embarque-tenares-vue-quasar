// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { boot } from 'quasar/wrappers';

// Firebase configuration object
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
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

const auth = getAuth();
const firestore: Firestore = getFirestore(app);

// Set up authentication persistence
const email = process.env.FIREBASE_USERNAME || '';
const password = process.env.FIREBASE_PASSWORD || '';

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Check if user is already signed in
    onAuthStateChanged(auth, (user) => {
      if (!user && email && password) {
        // Only sign in if no user is currently signed in and we have credentials
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

// Export the boot function for Quasar
export default boot(({ app }) => {
  // Optionally make Firestore available as a global property
  app.config.globalProperties.$db = firestore;
});

// Export the Firestore instance directly
export const db = firestore;
