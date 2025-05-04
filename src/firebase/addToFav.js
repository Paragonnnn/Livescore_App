import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc,updateDoc } from "firebase/firestore";


const user = auth.currentUser;
