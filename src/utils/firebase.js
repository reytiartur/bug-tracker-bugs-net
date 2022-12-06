import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArnTLI_mPDh4-t3DAgIZf18m1RjY3UVBk",
  authDomain: "bug-tracker-bugs-net.firebaseapp.com",
  projectId: "bug-tracker-bugs-net",
  storageBucket: "bug-tracker-bugs-net.appspot.com",
  messagingSenderId: "172008556506",
  appId: "1:172008556506:web:65f7cdc22d56248a1822e3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createUserData = async (user, additionalInfo = {}) => {
    if(!user) return;

    const userRef = await doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userRef);

    if(!userSnapshot.exists()) {
        const { email } = user;
        const { userName } = additionalInfo;
        const createdAt = new Date();

        try {
            await setDoc(userRef, { email, userName, createdAt, ...additionalInfo })
        } catch (error) {
            console.log('User was not created!', error.message)
        }
    }

    return userSnapshot;
}

export const createUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        return await createUserWithEmailAndPassword(auth, email, password)   
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Email already in use.')
        } else {
            console.log('User creation error', error.message); 
        }
    }
}

export const logInWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user;
    } catch(error) {
        console.log('Log in error!', error.message)
    }
}

export const logOut = async () => {
    await signOut(auth)
}

export const userStateChange = async (setCurrentUser) => {
    await onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    })
}