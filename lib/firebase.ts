import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDX941USjNqGQLiK48QZswQx75pLp83yo4",

  authDomain: "bingo-to-the-beats-v1.firebaseapp.com",

  projectId: "bingo-to-the-beats-v1",

  storageBucket: "bingo-to-the-beats-v1.firebasestorage.app",

  messagingSenderId: "540363906252",

  appId: "1:540363906252:web:f86dc1cb5b8dcf5659b669",

 

};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);