// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuinVfVll1FGNtMtRdf2q4r-0-cr9V64Y",
    authDomain: "openai-image-generator-c7068.firebaseapp.com",
    projectId: "openai-image-generator-c7068",
    storageBucket: "openai-image-generator-c7068.appspot.com",
    messagingSenderId: "1026128141772",
    appId: "1:1026128141772:web:0f9bfb20af6adbdfbad169",
    measurementId: "G-GDLGL18YRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);