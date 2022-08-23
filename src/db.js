import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg5wLpMmJLO2rePrbyGIqIhF4rdmLNPSk",
  authDomain: "todo-ninja-a64e4.firebaseapp.com",
  projectId: "todo-ninja-a64e4",
  storageBucket: "todo-ninja-a64e4.appspot.com",
  messagingSenderId: "286867728756",
  appId: "1:286867728756:web:d982a0d222afe7a0646421",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
