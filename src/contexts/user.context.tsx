import { createContext, useState} from  'react'

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

