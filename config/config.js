import { initializeApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "houser-1f38b.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;

// Initialize Firebase
// initializeApp(firebaseConfig);

// export const db = getFirestore();
