import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { host } from '../../utils/APIRoutes'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import './AuthForm.css'
import { toast } from 'react-hot-toast'


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

      toast.error("There was an error", {
        style: {
          border: '2px dotted #346751',
          background: 'transparent',
          padding: '16px',
          color: "#C84B31"
        },
        iconTheme:{
          primary: '#C84B31',
          secondary: '#EDEDED'
        }
      })
      
      verifyAuth();


    }
  }


  return (
    <div className='register'>
      <h1>
        Login
      </h1>
      <form className='form-box' onSubmit={login}>
        <label className='label-box' htmlFor="email">
          Email
          <input
            className='input-box'
            onChange={(e) => handleChange(e)} 
            value={values.email} 
            type="email" name='email' 
            placeholder='Email' 
            required />
        </label>
        <label className='label-box' htmlFor="password">
          Password
          <input
            className='input-box'
            onChange={(e) => handleChange(e)}  
            value={values.password} 
            type="password" 
            name='password' 
            placeholder='Password' 
            required />
        </label>
        <button className='btn-auth' type='submit'>Login</button>
        <p>New? <Link to='/register'>Register</Link></p>
        
      </form>
    </div>
  )
}

export default Login