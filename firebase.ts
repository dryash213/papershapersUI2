// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrEWBkg3tbh1J25EDkA8XhXHCN-DF9aYI",
  authDomain: "papershapers-72950.firebaseapp.com",
  projectId: "papershapers-72950",
  storageBucket: "papershapers-72950.firebasestorage.app",
  messagingSenderId: "409486195769",
  appId: "1:409486195769:web:2a7abdb827ef1da2b2a1e8",
};

let app: ReturnType<typeof initializeApp> | null = null;

export function initFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export async function getFirebaseServices() {
  const app = initFirebase();
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, analytics, auth, firestore };
}

