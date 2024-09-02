// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-8170a.firebaseapp.com",
  projectId: "car-marketplace-8170a",
  storageBucket: "car-marketplace-8170a.appspot.com",
  messagingSenderId: "746512091900",
  appId: "1:746512091900:web:07be91dae29949643e6579",
  measurementId: "G-BL0YQDK71C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const storage=getStorage(app)





