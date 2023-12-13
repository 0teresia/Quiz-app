import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMEDYwsdvJ1fyHILsfYlFRuESRbSOkFhI",
  authDomain: "quiz-app-52de4.firebaseapp.com",
  projectId: "quiz-app-52de4",
  storageBucket: "quiz-app-52de4.appspot.com",
  messagingSenderId: "242612306490",
  appId: "1:242612306490:web:4fe8741a34ddf9f7956b03",
  measurementId: "G-50XGQTHQKP"
};


const app = initializeApp(firebaseConfig);
export default app
