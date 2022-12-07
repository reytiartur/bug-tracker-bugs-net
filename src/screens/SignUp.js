import Input from '../components/Input'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import { createUserWithEmail, createUserData, signInWithGoogleRedirect, signInWithGooglePopup, userStateChange } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const defaultInputFields = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [inputFields, setInputFields] = useState(defaultInputFields)
  const { userName, email, password, confirmPassword } = inputFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({...inputFields, [name]: value})
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      alert('passwords do not match');
      return;
    };

    try {
      const { user } = await createUserWithEmail(email, password)
      await createUserData(user, { userName })
      await userStateChange(setCurrentUser)
      navigate('/')
    } catch (error) {
      console.log(error)
      setInputFields(defaultInputFields)
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    await signInWithGoogleRedirect();
  }
    

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center lg:basis-1/2">
        <p className='text-xl font-semibold tracking-wider mb-3'>Create Account</p>
        <form className='flex flex-col items-center'>
          <Input type='text' label='User Name' name='userName' onChange={handleChange} />
          <Input type='email' label='Email' name='email' onChange={handleChange} />
          <Input type='password' label='Password' name='password' onChange={handleChange} />
          <Input type='password' label='Confirm Password' name='confirmPassword' onChange={handleChange} />
          <div className="flex flex-col my-4 gap-3 w-full">
            <Button btnStyle='colored' btnSize='full' type='button' onClick={handleSignUp}>Create Account</Button>
            <Button btnStyle='google' btnSize='full' type='button' onClick={handleGoogleLogin}>Sign Up with Google</Button>
          </div>
          
        </form>
        <div className='flex'>
          <p className="">Or &nbsp;</p>
          <p className="underline hover:text-primaryDark hover:decoration-primary cursor-pointer" onClick={() => navigate('/signin')} >sign in.</p>
        </div>
      </div>
      <div className='hidden lg:block lg:basis-1/2'>
        
      </div>
    </div>
  )
}

export default SignUp