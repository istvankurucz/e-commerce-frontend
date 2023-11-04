import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDO682qJ-xhFElsDTzk0iNyjR4YyNgUVC8",
	authDomain: "e-commerce-1209d.firebaseapp.com",
	projectId: "e-commerce-1209d",
	storageBucket: "e-commerce-1209d.appspot.com",
	messagingSenderId: "22424535274",
	appId: "1:22424535274:web:9b98bbfd83d33c22f3d793",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
