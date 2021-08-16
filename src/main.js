import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import firebase from 'firebase'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP__API_KEY,
  authDomain: "rock-paper-scissor-564f0.firebaseapp.com",
  databaseURL: "https://rock-paper-scissor-564f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rock-paper-scissor-564f0",
  storageBucket: "rock-paper-scissor-564f0.appspot.com",
  messagingSenderId: "949175584254",
  appId: "1:949175584254:web:4c2be19db95ed7c836acaf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const DB = firebase.firestore();

createApp(App).use(store).mount('#app')

