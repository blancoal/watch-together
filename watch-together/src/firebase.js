import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export async function initializeAuth() {
  try {
    const response = await
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/token`)
    const data = await response.json();
    const { token } = data;
    await signInWithCustomToken(auth, token);
    console.log('Authenticated with custom token');
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}
