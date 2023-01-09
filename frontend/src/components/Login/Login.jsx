import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { host } from '../../utils/APIRoutes'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import './AuthForm.css'


const Login = () => {

  const { verifyAuth, auth } = useAuth()

  const navigate = useNavigate()

  const [ values, setValues ] = useState(
    {
      email: "",
      password: ""
    }
  )

  useEffect(() => {
    if(auth){
      navigate('/')
    }
  }, [auth])

  const handleChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
  }

  const login = async (e) => {

    try {

      e.preventDefault()

      const { email, password } = values
  
      await axios.post(`${host}/api/auth/login`, {
        email,
        password
      })
  
      await verifyAuth()
      navigate('/')
      
    } catch (error) {
      console.log(error)
      verifyAuth();
    }
  }


  return (
    <div className='register'>
      <h1>
        Login
      </h1>
      <form onSubmit={login}>
        <label htmlFor="">
          Email
          <input
            onChange={(e) => handleChange(e)} 
            value={values.email} 
            type="email" name='email' 
            placeholder='email' 
            required />
        </label>
        <label htmlFor="">
          Password
          <input
            onChange={(e) => handleChange(e)}  
            value={values.password} 
            type="password" 
            name='password' 
            placeholder='password' 
            required />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login