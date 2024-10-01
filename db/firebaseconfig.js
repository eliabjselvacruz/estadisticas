
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBdRnDhOW8Bkfjg6dmPBhWk2ovRxOoAK0s",
  authDomain: "proyecto-estadisticas-763cd.firebaseapp.com",
  projectId: "proyecto-estadisticas-763cd",
  storageBucket: "proyecto-estadisticas-763cd.appspot.com",
  messagingSenderId: "427368046259",
  appId: "1:427368046259:web:fad847f86231cfaf7f9ac6",
  measurementId: "G-DMNSQTXQ3K"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;