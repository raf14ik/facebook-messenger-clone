import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

//import api firebase

});
    
const db = firebaseApp.firestore();

export default db;