import { createContext, useState, useEffect} from  'react'
import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth
 } from '../utils/firebase/firebase.utils'


const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (u:any) => null
})

type CurrentUserType = {
  currentUser:any,
  setCurrentUser: any
}

const UserProvider = ({ children }:{ children:JSX.Element } ) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value:CurrentUserType = { currentUser, setCurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user:any) => {
      if (user) {
        createUserDocumentFromAuth(user, {})
      }
      console.log(user)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserProvider
}

