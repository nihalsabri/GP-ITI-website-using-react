import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB7PSnQphwZ73NhvKl460VW7AfDP70J4Jk",
    authDomain: "gp-iti-1c920.firebaseapp.com",
    databaseURL: "https://gp-iti-1c920-default-rtdb.firebaseio.com",
    projectId: "gp-iti-1c920",
    storageBucket: "gp-iti-1c920.firebasestorage.app",
    messagingSenderId: "752793572883",
    appId: "1:752793572883:web:1fa9b3ec35cc8919f0d1e6",
    measurementId: "G-33RXSCD5QB",
  },
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
