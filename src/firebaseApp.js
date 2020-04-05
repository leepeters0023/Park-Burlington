import firebase from 'firebase/app'  
import 'firebase/database'  //database applications
import 'firebase/auth'   //authentication applications


const credentials = {
    apiKey: "AIzaSyCJ_q627N1dryTYbcSjE4d-4jfsJJg5VcY",
    authDomain: "park-burlington.firebaseapp.com",
    databaseURL: "https://park-burlington.firebaseio.com",
    projectId: "park-burlington",
    storageBucket: "park-burlington.appspot.com",
    messagingSenderId: "474825299090",
    appId: "1:474825299090:web:d06b7eb22ba0309571c24b",
    measurementId: "G-HDKTL5YR29"
  };

  const firebaseApp = !firebase.apps.length ? firebase.initializeApp(credentials) : firebase.app()
  

  const auth = firebase.auth()
  const database = firebaseApp.database()
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  export { firebaseApp, database, auth, googleProvider }
