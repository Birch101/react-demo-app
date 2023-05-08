import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// included for demo purposes, but should not normally be checked in - account limits have been set
const firebaseConfig = {
  apiKey: "AIzaSyBlFzugN5PUIc8xK2YZuOptMnoGqqcOD60",
  authDomain: "react-demo-c5653.firebaseapp.com",
  projectId: "react-demo-c5653",
  storageBucket: "react-demo-c5653.appspot.com",
  messagingSenderId: "798146450723",
  appId: "1:798146450723:web:b1a6c633e2a2daaa1e2896",
  measurementId: "G-X8FJFW76JF",
};

admin.initializeApp(firebaseConfig);

exports.eventUpdateAudit = functions.firestore
  .document("events/{eventId}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();

    const previousValue = change.before.data();

    await admin.firestore().collection("audits").add({
      auditType: "UPDATE",
      recordDate: new Date(),
      oldValueObject: previousValue,
      newValueObject: newValue,
    });
  });

exports.eventCreatedAudit = functions.firestore
  .document("events/{eventId}")
  .onCreate(async (change, context) => {
    const newValue = change.data();

    await admin.firestore().collection("audits").add({
      auditType: "ADD",
      recordDate: new Date(),
      oldValueObject: null,
      newValueObject: newValue,
    });
  });

exports.eventDeletedAudit = functions.firestore
  .document("events/{eventId}")
  .onDelete(async (change, context) => {
    const previousValue = change.data();

    await admin.firestore().collection("audits").add({
      auditType: "DELETE",
      recordDate: new Date(),
      oldValueObject: previousValue,
      newValueObject: null,
    });
  });
