import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

import { firebaseConfigObj } from './config'

// Your web app's Firebase configuration
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

const createUserDocumentFromAuth = async (userAuth:any) => {
  const userDocRef = doc(db, 'users', userAuth?.uid)
  // console.log('userDocRef: ', userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  // console.log('userSnapshot: ', userSnapshot)
  // console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })

    } catch (error) {
      console.log('error', error)
    }
  }

  return userDocRef
}

export { auth, signInWithGooglePopup, signInWithGoogleRedirect , db, createUserDocumentFromAuth }
