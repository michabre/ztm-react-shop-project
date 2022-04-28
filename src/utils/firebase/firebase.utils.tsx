import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

const addCollectionAndDocuments = async (collectionKey:any, objectsToAdd:any) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object:any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap =  querySnapshot.docs.reduce((acc:any, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    let t = title.toString().toLowerCase()
    acc[t] = items
    return acc
  }, {})

  return categoryMap
}

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

const signOutUser = async () => await signOut(auth)

const onAuthStateChangedListener = (callback:(user:any) => void) => onAuthStateChanged(auth, callback)

export { 
  auth, 
  signInWithGooglePopup, 
  signInWithGoogleRedirect, 
  db,
  addCollectionAndDocuments,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  getCategoriesAndDocuments
}
