// Import the functions you need from the SDKs you need
import {getFirestore} from 'firebase/firestore'

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSvZqUV7aD5YI1vPiPY5DpGHuKDxnXrao",
  authDomain: "house-marketplace-app-7f46b.firebaseapp.com",
  projectId: "house-marketplace-app-7f46b",
  storageBucket: "house-marketplace-app-7f46b.appspot.com",
  messagingSenderId: "432601107313",
  appId: "1:432601107313:web:6e908b99c3b558afaa44d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()