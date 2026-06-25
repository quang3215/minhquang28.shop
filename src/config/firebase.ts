import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Replace the following with your app's Firebase project configuration
// Note: In a real project, use environment variables (e.g. import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: "AIzaSyA--tTCNO97Rbuh9rBQHRcmBFNeUqlWVNw",
  authDomain: "minhquang28.firebaseapp.com",
  projectId: "minhquang28",
  storageBucket: "minhquang28.firebasestorage.app",
  messagingSenderId: "289100536600",
  appId: "1:289100536600:web:abd1fa9e00a2678146dc6d",
  measurementId: "G-RLVTQ4FMX2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, storage, auth, googleProvider, analytics };
