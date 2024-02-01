import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtzubOFJAjDhLuRfjIq0gFw8HGB7mF6gs",
  authDomain: "netflixgpt-492fd.firebaseapp.com",
  projectId: "netflixgpt-492fd",
  storageBucket: "netflixgpt-492fd.appspot.com",
  messagingSenderId: "427113838791",
  appId: "1:427113838791:web:fd224bdd678bb2f61866e2",
  measurementId: "G-FZMKZC8BQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
