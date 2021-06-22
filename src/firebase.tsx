import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3SCoXMMxPxEuuwi747Z93kb8dAVmnth4",
  authDomain: "nlwt-263c0.firebaseapp.com",
  projectId: "nlwt-263c0",
  storageBucket: "nlwt-263c0.appspot.com",
  messagingSenderId: "934627214578",
  appId: "1:934627214578:web:923e47f1f71ef62ba83c6b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
