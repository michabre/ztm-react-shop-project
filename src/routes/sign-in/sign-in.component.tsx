import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {

    useEffect(() => {
        // const call = async () => {
        //     const response = await getRedirectResult(auth)
        //     if(response) {
        //       await createUserDocumentFromAuth(response.user)
        //     }
        // }
        // call()
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
            <SignUpForm />
        </div>
    )
}

export default SignIn