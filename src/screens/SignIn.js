import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { logInWithEmail, signInWithGooglePopup, signInWithGoogleRedirect, userStateChange } from '../utils/firebase'
import { UserContext } from '../context/userContext'


const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const defaultInputFields = {
    email: '',
    password: '',
  }

  const [inputFields, setInputFields] = useState(defaultInputFields)
  const { email, password } = inputFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({...inputFields, [name]: value})
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    await signInWithGoogleRedirect();
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const { user } = await logInWithEmail(email, password)
      await userStateChange(setCurrentUser)
    } catch (error) {
      console.log(error)
      setInputFields(defaultInputFields)
    }

  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="flex flex-col items-center justify-center lg:basis-1/2">
        <p className='text-xl font-semibold tracking-wider mb-3'>Welcome Back</p>
        <form className=''>
          <Input type='email' label='Email' name='email' onChange={handleChange} />
          <Input type='password' label='Password' name='password' onChange={handleChange} />
          <div className="flex flex-col my-4 gap-3 w-full">
            <Button btnStyle='colored' btnSize='full' type='button' onClick={handleSignIn}>Sign In</Button>
            <Button btnStyle='google' btnSize='full' type='button' onClick={handleGoogleLogin}>Sign In with Google</Button>
          </div>
        </form>
        <div className='flex'>
          <p className="">Or &nbsp;</p>
          <p className="underline hover:text-primaryDark hover:decoration-primary cursor-pointer" onClick={() => navigate('/signup')}>sign up.</p>
        </div>
      </div>
      <div className="hidden lg:block lg:basis-1/2">

      </div>
    </div>
  )
}

export default SignIn