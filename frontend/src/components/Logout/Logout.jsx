import axios from 'axios'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { host } from '../../utils/APIRoutes'

const Logout = () => {

    const { verifyAuth } = useAuth()

    const logout = async () => {
      await axios.get(`${host}/api/auth/logout`)
      verifyAuth()
    }
  return (

    <button onClick={logout}>Logout</button>
  )
}

export default Logout