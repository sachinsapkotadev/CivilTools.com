import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChbE2RVco3Tn8siwvqo3wBHkDWtOxUAu4",
  authDomain: "civil-tool-112e6.firebaseapp.com",
  projectId: "civil-tool-112e6",
  storageBucket: "civil-tool-112e6.firebasestorage.app",
  messagingSenderId: "737822886169",
  appId: "1:737822886169:web:caaf375b0c0327e66cdd88",
  measurementId: "G-GN1DHWPVV2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
