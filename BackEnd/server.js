// Imports
//import { firebaseConfig } from './config.js'
import '@firebase/firestore';
express = require('express');
const firebaseConfig = require('./config.js');

const firebase = require("firebase/app");
 require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const app = express();

// Create a Firestore reference
const db = firebase.firestore();

// GET request to retrieve a specific document
app.get("/Voters/:id", (req, res) => {
  const docId = req.params.id;
  db.collection("Voters")
    .doc(docId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        res.status(200).send(data);
      } else {
        res.status(404).send("Document not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving document: " + error);
    });
});

// GET request to retrieve all documents in a collection
app.get("/Voters", (req, res) => {
  db.collection("Voters")
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        data.push(docData);
      });
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send("Error retrieving documents: " + error);
    });
});

// POST request to add a new document to the collection
app.post("/Voters", (req, res) => {
  const data = req.body;
  db.collection("collectionName")
    .add(data)
    .then((docRef) => {
      res.status(201).send("Document added with ID: " + docRef.id);
    })
    .catch((error) => {
      res.status(500).send("Error adding document: " + error);
    });
});

// PUT request to update an existing document
app.put("/collection/:id", (req, res) => {
  const docId = req.params.id;
  const data = req.body;
  db.collection("collectionName")
    .doc(docId)
    .update(data)
    .then(() => {
      res.status(200).send("Document updated successfully");
    })
    .catch((error) => {
      res.status(500).send("Error updating document: " + error);
    });
});

// DELETE request to delete a document
app.delete("/collection/:id", (req, res) => {
  const docId = req.params.id;
  db.collection("collectionName")
    .doc(docId)
    .delete()
    .then(() => {
      res.status(200).send("Document deleted successfully");
    })
    .catch((error) => {
      res.status(500).send("Error deleting document: " + error);
    });
});