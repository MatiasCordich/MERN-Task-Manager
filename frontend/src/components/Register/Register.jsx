import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { host } from '../../utils/APIRoutes'
import '../Login/AuthForm.css'
import { toast } from 'react-hot-toast'

const Register = () => {

  const messages = {
    nameRequired: "Nombre obligatorio",
    emailRequired: "Email obligatorio",
    passwordRequired: "Contraña obligatoria",
    emailValid: "Ingrese un email valido",
    passwordLength: "Minimo 8 caracteres"
  }

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const register = async (e) => {

    e.preventDefault()

    if (
      validateName() &&
      validateEmail() &&
      validatePassword()
    ) {

      try {

        const { name, email, password } = values

        const user = {
          name, email, password
        }

        await axios.post(`${host}/api/auth/register`, user)

        navigate('/auth')

      } catch (error) {
        toast.error("Hubo un error", {
          style: {
            border: '2px dotted #346751',
            background: 'transparent',
            padding: '16px',
            color: "#C84B31"
          },
          iconTheme: {
            primary: '#C84B31',
            secondary: '#EDEDED'
          }
        })
      }

    }

  }

  const validateName = () => {

    let validate = false;

    if (!values.name) {
      setErrorName(messages.nameRequired)
      return
    } else if (values.name && values.name.length >= 1 && values.name.length <= 3) {
      setErrorName(messages.nameLength)
    } else {
      setErrorName('')
      validate = true
    }

    return validate
  }


  const validateEmail = () => {

    let validate = false;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    if (!values.email) {
      setErrorEmail(messages.emailRequired)
    } else if (values.email && !regex.test(values.email)) {
      setErrorEmail(messages.emailValid)
    } else {
      setErrorEmail('')
      validate = true
    }

    return validate

  }

  const validatePassword = () => {

    let validate = false;

    if (!values.password) {
      setErrorPassword(messages.passwordRequired)
    } else if (values.password && values.password.length >= 1 && values.password.length <= 7) {
      setErrorPassword(messages.passwordLength)
    } else {
      setErrorPassword('')
      validate = true
    }

    return validate
  }

  const style = {
    color: "#C84B31",
    fontSize: '1.5rem'
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
            />
            <p style={style}>{errorName}</p>
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
            />
            <p style={style}>{errorEmail}</p>
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
            />
            <p style={style}>{errorPassword}</p>
        </label>
        <button className='btn-auth' type='submit'>Register</button>
        <p>Registered? <Link to='/auth'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register