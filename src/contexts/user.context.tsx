import { createContext, useState, useEffect} from  'react'
import { onAuthStateChangedListener, signOutUser } from '../utils/firebase/firebase.utils'

//
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

  signOutUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user:any) =>{
      console.log(user)
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

