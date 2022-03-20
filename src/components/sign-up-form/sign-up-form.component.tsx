import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

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

      await createUserDocumentFromAuth(user, { displayName: displayName})
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
    <div>
      <h3>Sign Up with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" onChange={handleChange} name="displayName" value={displayName} required />

        <label>Email</label>
        <input type="email" onChange={handleChange} name='email' value={email} required />

        <label>Password</label>
        <input type="password" onChange={handleChange} name='password' value={password} required />

        <label>Confirm Password</label>
        <input type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required />

        <button type="submit">Submit</button>
      </form>
    </div>

  )
}

export default SignUpForm