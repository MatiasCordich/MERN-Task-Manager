import axios from 'axios'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { host } from '../../utils/APIRoutes'
import './logout.css'

const Logout = () => {

    const { verifyAuth } = useAuth()

    const logout = async () => {
      await axios.get(`${host}/api/auth/logout`)
      verifyAuth()
    }
  return (

    <button className='logout-btn' onClick={logout}>Logout</button>
  )
}

export default Logout