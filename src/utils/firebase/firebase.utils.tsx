import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

import { firebaseConfigObj } from './config'

//Firebase configuration
const firebaseConfig = firebaseConfigObj
  
  // Initialize Firebase
  initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

const auth = getAuth()
const signInWithGooglePopup = () => signInWithPopup(auth, provider)
const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

const db = getFirestore()

const createUserDocumentFromAuth = async (userAuth:any, additionalInformation:any) => {
  if (!userAuth) return
  
  const userDocRef = doc(db, 'users', userAuth?.uid)
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })

    } catch (error) {
      console.log('error', error)
    }
  }

  return userDocRef
}

const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return

  return await  createUserWithEmailAndPassword(auth, email, password)
}

const signInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export { 
  auth, 
  signInWithGooglePopup, 
  signInWithGoogleRedirect, 
  db, 
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword
}
