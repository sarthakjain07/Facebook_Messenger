import firebase from "firebase";
const firebaseApp=firebase.initializeApp({
        apiKey: "AIzaSyAdD8AxOYoYDBXS9nOavUKu3OZ4QGGmbPY",
        authDomain: "facebook-messenger-1d419.firebaseapp.com",
        projectId: "facebook-messenger-1d419",
        storageBucket: "facebook-messenger-1d419.appspot.com",
        messagingSenderId: "419836976583",
        appId: "1:419836976583:web:e6ea0be56a51d318248de2",
        measurementId: "G-HMMR814HK7"
       
})

const db = firebaseApp.firestore()

export {db};