# React Demo

## Overview
This is a simple project to allow events to be created, read, updated and deleted. It consists of the following parts:

- Firestore NoSQL database.
- React web application connecting to a Firestore NoSQL database.
- GCP event driven functions firing on create, update and delete events to record audit data to Firestore to show a before and after snapshot of the data.

## Running
To run the React application first run the 'npm install' command following by 'npm start'.

## Deployment

The React application is automatically deployed to this URL via yaml script included in this repository:

- https://react-demo-app-cb.azurewebsites.net