// frontend/src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC465UPQIsNeE5AAVkiDb5CGefHtOK2rxY",
  authDomain: "ms-ecom.firebaseapp.com",
  projectId: "ms-ecom",
  storageBucket: "ms-ecom.firebasestorage.app",
  messagingSenderId: "1074596731900",
  appId: "1:1074596731900:web:8d7f426eedccdb3107f079",
  measurementId: "G-HK5YR9WDVD"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

