import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3gTLyJw7xeLYCxE5OuvBFytJyDdGR5-E",
  authDomain: "renteasee-29.firebaseapp.com",
  projectId: "renteasee-29",
  storageBucket: "renteasee-29.appspot.com",
  messagingSenderId: "528020869677",
  appId: "1:528020869677:web:3fc79f8f6f2ac9ac119ea4",
  measurementId: "G-PKPWT6PM9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
export { storage };
