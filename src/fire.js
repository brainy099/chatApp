import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBMoKZbTM3HBgK60nwabdi2Xf_QyvsnF7k",
  authDomain: "react-554aa.firebaseapp.com",
  databaseURL: "https://react-554aa.firebaseio.com",
  projectId: "react-554aa",
  storageBucket: "react-554aa.appspot.com",
  messagingSenderId: "537485477274",
  appId: "1:537485477274:web:5e24b6c6bd21d5d6abe623",
  measurementId: "G-ZEQNZQ9SF1"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
