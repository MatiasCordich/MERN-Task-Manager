import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import baseUrl, { host } from '../../utils/APIRoutes'
import useAuth from '../../hooks/useAuth'
import './AuthForm.css'
import { toast } from 'react-hot-toast'


const Login = () => {

  const messages = {
    emailRequired: "Email es obligatorio",
    passwordRequired: "Contraseña obligatoria",
  }

  const { verifyAuth, auth } = useAuth()

  const navigate = useNavigate()

  const [values, setValues] = useState(
    {
      email: "",
      password: ""
    }
  )

  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const login = async (e) => {

    e.preventDefault()

    if (validateEmail() && validatePassword()) {

      try {
        const { email, password } = values

        const { res } = await baseUrl.post(`/api/auth/login`, {
          email,
          password
        })

        await verifyAuth()
        navigate('/')
      } catch (error) {

        toast.error("Email o contraseña invalidos", {
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

  const validateEmail = () => {

    let validate = false
    if (!values.email) return setErrorEmail(messages.emailRequired)

    setErrorEmail('')
    validate = true

    return validate
  }

  const validatePassword = () => {

    let validate = false
    if (!values.password) return setErrorPassword(messages.passwordRequired)

    setErrorPassword('')
    validate = true

    return validate
  }

  const style = {
    color: "#C84B31",
    fontSize: '1.5rem'
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
        <button className='btn-auth' type='submit'>Login</button>
        <p>New? <Link to='/register'>Register</Link></p>

      </form>
    </div>
  )
}

export default Login