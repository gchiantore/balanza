import firebase from "firebase/compat/app"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDEdIVeoy_cPoDYpRTSKds3B7WD1bl1LUc",
    authDomain: "balanza-server.firebaseapp.com",
    projectId: "balanza-server",
    storageBucket: "balanza-server.appspot.com",
    messagingSenderId: "698165521262",
    appId: "1:698165521262:web:fd98565c327360e8436f7f",
    measurementId: "G-5JGT6RWKSV"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
export const db=firebaseApp.firestore();
