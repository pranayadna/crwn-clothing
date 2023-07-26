import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyCsz1BrI9Cbph3qlMSH5zNe9hqW8Po2x-A",
  authDomain: "crwn-clothing-db-3f080.firebaseapp.com",
  projectId: "crwn-clothing-db-3f080",
  storageBucket: "crwn-clothing-db-3f080.appspot.com",
  messagingSenderId: "26149750026",
  appId: "1:26149750026:web:251557f443152e3df9e6f3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.getCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore()


export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) {
    return
  }
  
  const userDocRef = doc(db, 'users', userAuth.uid)
  // console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());
  
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth
    const createdAt = new Date()
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  
  return userDocRef
} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)