const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');


admin.initializeApp(functions.config().firebase);

const app = express()

app.use(cors({ origin: true }));


exports.widgets = functions.https.onRequest(app);