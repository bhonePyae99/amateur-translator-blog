import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCxLYKkj5-DCUaLMnGaFgOU2mkMmw_tGoY",
  authDomain: "myapp-8391f.firebaseapp.com",
  projectId: "myapp-8391f",
  storageBucket: "myapp-8391f.appspot.com",
  messagingSenderId: "47734479108",
  appId: "1:47734479108:web:ccf60cfafc6f8aa0745851",
  measurementId: "G-VK10FC48XK",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
