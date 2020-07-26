import * as firebase from 'firebase';

const fireBaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAnXERqAWRrng5Ia_l7699MtXJt9Tep304",
    authDomain: "messengerclone-d4e9f.firebaseapp.com",
    databaseURL: "https://messengerclone-d4e9f.firebaseio.com",
    projectId: "messengerclone-d4e9f",
    storageBucket: "messengerclone-d4e9f.appspot.com",
    messagingSenderId: "350461159227",
    appId: "1:350461159227:web:f42ff575b2e01bf6bb391e",
    measurementId: "G-XWYSNPT7YT"
});

const db = fireBaseApp.firestore();

export default db;