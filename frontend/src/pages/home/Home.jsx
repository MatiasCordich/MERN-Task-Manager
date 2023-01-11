import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TaskList from '../../components/Task/TaskList'
import useAuth from '../../hooks/useAuth'
import { host } from '../../utils/APIRoutes'

const Home = () => {

  const [ userData, setUserData ] = useState()
  const { verifyAuth } = useAuth()
  
  const getUserInfo = async () => {
    
    try {
      const { data } = await axios.get(`${host}/api/users/me/info`)
      console.log(data)
      setUserData(data)
    } catch (error) {
      if(error.status === 401) {
        verifyAuth()
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  if(!userData || !userData._id){
    return null
  }
  return (
    <>
      <Navbar />
      <TaskList/>
    </>



  )
}

export default Home