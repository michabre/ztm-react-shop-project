import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import "./sign-up-form.styles.scss"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword} = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      console.log("passwords do not match")
      return
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      const user = response?.user
      await createUserDocumentFromAuth(user, user?.displayName)
      resetFormFields()
    } catch(error:any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Cannot create user. Email already in use')
      } else {
        console.log('user creation encountered an error', error)
      }
    }
  }

  const handleChange = (event:any) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Display Name" 
          inputOptions = {{
            type:"text", 
            onChange: handleChange,
            name: "displayName", 
            value: displayName, 
            required: true
          }}
          
        />

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

        <FormInput 
          label="Confirm Password" 
          inputOptions = {{
            type:"password", 
            onChange: handleChange, 
            name: 'confirmPassword', 
            value: confirmPassword,
            required: true
          }}
        />

        <Button 
          buttonType=''
          inputOptions = {{
            type:"submit"
          }}>Submit</Button>
      </form>
    </div>

  )
}

export default SignUpForm