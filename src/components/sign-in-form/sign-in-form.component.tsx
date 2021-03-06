import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { 
  signInWithGooglePopup,  
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import "./sign-in-form.styles.scss"

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {  email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
    //await createUserDocumentFromAuth(user, {})
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)

      resetFormFields()
    } catch(error:any) {
      switch (error.code) {
        case 'auth/wrong-password':
          console.log('incorrect password for email')
          break
        case 'auth/user-not-found':
          console.log('no user associated with this email')
          break
        case 'auth/popup-closed-by-user':
          console.log('user cancelled sign in')
          break
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event:any) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Email" 
          inputOptions = {{
            type: "email", 
            onChange: handleChange, 
            name: 'email', 
            value: email,
            required: true
          }}

        />

        <FormInput 
          label="Password" 
          inputOptions = {{
            type:"password", 
            onChange: handleChange, 
            name: 'password', 
            value: password,
            required: true
          }}
        />

        <div className="buttons-container">
        <Button 
          buttonType=''
          inputOptions = {{
            type:"submit"
          }}>Sign In</Button>
        <Button 
          buttonType='google'
          inputOptions = {{
            type:"button",
            onClick: signInWithGoogle
          }}>Google Sign In</Button>
          
        </div>
       
      </form>
    </div>

  )
}

export default SignInForm