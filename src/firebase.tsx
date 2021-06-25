import firebase from "firebase";

import "firebase/auth";
import "firebase/database";

require("dotenv/config");

console.log("teste", process.env);

const firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
