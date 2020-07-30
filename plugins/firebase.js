import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC7eZpornIHq37d4nynsIFxSpd3uiXp-p0",
    authDomain: "santa-spices.firebaseapp.com",
    databaseURL: "https://santa-spices.firebaseio.com",
    projectId: "santa-spices",
    storageBucket: "santa-spices.appspot.com",
    messagingSenderId: "305714224867",
    appId: "1:305714224867:web:2e583e6fb31aeb7bc8efd6",
    measurementId: "G-5B3GJZNQTY"
  }

const app = firebase.initializeApp(firebaseConfig)

export const db = app.database()
