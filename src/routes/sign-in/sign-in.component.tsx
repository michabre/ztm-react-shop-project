import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {

    useEffect(() => {
        const call = async () => {
            const response = await getRedirectResult(auth)
            if(response) {
              await createUserDocumentFromAuth(response.user)
            }
        }
        call()
    }, [])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
            </button>
            <button onClick={async () => await signInWithGoogleRedirect()}>
                Sign In With Google Redirect
            </button>
        </div>
    )
}

export default SignIn