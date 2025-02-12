// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ib-application---calandertt.firebaseapp.com",
  projectId: "ib-application---calandertt",
  storageBucket: "ib-application---calandertt.firebasestorage.app",
  messagingSenderId: "912408896558",
  appId: "1:912408896558:web:ddb5286aa8d5e641576bbf",
  measurementId: "G-4HB25SF2ER"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
