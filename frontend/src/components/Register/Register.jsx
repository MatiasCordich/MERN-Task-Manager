import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { host } from '../../utils/APIRoutes'
import '../Login/AuthForm.css'
import { toast } from 'react-hot-toast'

const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const register = async (e) => {

    e.preventDefault()

    const { name, email, password } = values

    const user = {
      name, email, password
    }

    try {

      await axios.post(`${host}/api/auth/register`, user)

      toast.success("Register successfully!!!", {
        style: {
          border: '2px dotted #346751',
          padding: '16px',
          color: "#C84B31"
        },
        iconTheme:{
          primary: '#346751',
          secondary: '#EDEDED'
        }
      })

      navigate('/auth')

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
    }

  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <form className='form-box' onSubmit={register}>
        <label className='label-box' htmlFor="name">
          Full Name
          <input
            className='input-box'
            onChange={(e) => handleChange(e)}
            value={values.name}
            type="text"
            name='name'
            placeholder='Name'
            required />
        </label>
        <label className='label-box' htmlFor="email">
          Email:
          <input
            className='input-box'
            onChange={(e) => handleChange(e)}
            value={values.email}
            type="email"
            name='email'
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
        <button className='btn-auth' type='submit'>Register</button>
        <p>Registered? <Link to='/auth'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register