import * as firebase from 'firebase';

const fireBaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

const db = fireBaseApp.firestore();

export default db;
