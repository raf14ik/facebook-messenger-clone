import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyArJvKWoiPDeg2lUR01himrrp8C63H3B4w",
        authDomain: "fb-messenger-clone-bfc72.firebaseapp.com",
        databaseURL: "https://fb-messenger-clone-bfc72.firebaseio.com",
        projectId: "fb-messenger-clone-bfc72",
        storageBucket: "fb-messenger-clone-bfc72.appspot.com",
        messagingSenderId: "34269160288",
        appId: "1:34269160288:web:5c78052c25a5af1131f405",
        measurementId: "G-DBBT4NDJN3"

});
    
const db = firebaseApp.firestore();

export default db;