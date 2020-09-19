import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "xxxxx",
    authDomain: "xxxxxx",
    databaseURL: "xxxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxxx",
    messagingSenderId: "xxxx",
    appId: "xxxxxx",
    measurementId: "xxxxxx"
  }

const app = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.database()
