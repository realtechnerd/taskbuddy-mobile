import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey:
    process.env.NODE_ENV === "production"
      ? "AIzaSyAgsvwYpTjDVbxDW_skrARl_Zdzk2ozeNA"
      : "AIzaSyDiDVdSJ0mxczsl8LttQD6Bg4W0ftGq4Jw",
  authDomain:
    process.env.NODE_ENV === "production"
      ? "taskbuddy-to-do-list.firebaseapp.com"
      : "taskbuddy-6ea6c.firebaseapp.com",
  projectId:
    process.env.NODE_ENV === "production"
      ? "taskbuddy-to-do-list"
      : "taskbuddy-6ea6c",
  storageBucket:
    process.env.NODE_ENV === "production"
      ? "taskbuddy-to-do-list.appspot.com"
      : "taskbuddy-6ea6c.appspot.com",
  messagingSenderId:
    process.env.NODE_ENV === "production" ? "952718830548" : "251114666211",
  appId:
    process.env.NODE_ENV === "production"
      ? "1:952718830548:web:c5f413d8e0557bbb89c441"
      : "1:251114666211:web:2edef5de1221695b89edd6",
});

export const auth = app.auth();
export const firestoreApp = app.firestore();
export default app;
