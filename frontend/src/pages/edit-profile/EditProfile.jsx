import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { host } from '../../utils/APIRoutes'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import '../../components/Login/AuthForm.css'
import './editprofile.css'
const EditProfile = () => {

  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  const getUser = async () => {
    try {
      const data = await axios.get(`${host}/api/users/me`)
      setUser(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const editProfile = async (e) => {

    e.preventDefault()

    try {
      const res = await axios.put(`${host}/api/users/me`, user)
      
      toast.success("Pefil editado", {
        style: {
            background: '#346751',
            padding: '16px',
            color: '#ECDBBA',
        },
        iconTheme: {
            primary: '#EDEDED',
            secondary: '#346751',
        }
    })
      setUser(res.data)
    } catch (error) {
      toast.error('HUBO UN ERROR')
    }

    
  }


  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <div className='btn-box'>
        <Link className='link' to='/'>Home</Link>
      </div>
      <div className='register edit-box'>
        <h1 className='ty-4'>Editar perfil</h1>
        <form className='form-box' onSubmit={editProfile}>
          <label className='label-box' htmlFor='name'>
            Nombre completo:
            <input
              className='input-box'
              type="text"
              name='name'
              placeholder='Nombre completo'
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label className='label-box' htmlFor='email'>
            Email:
            <input
              className='input-box'
              type="email"
              name='email'
              placeholder='Email'
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button className='btn-auth' type='submit'>Guardar</button>
        </form>
      </div>
    </>



  )
}

export default EditProfile