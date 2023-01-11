import axios from 'axios'
import {useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { host } from '../../utils/APIRoutes'
import Logout from '../Logout/Logout'
import './navbar.css'

const Navbar = () => {

    const [ user, setUser ] = useState(null)

    const getUser = async () => {
        try {
            const data = await axios.get(`${host}/api/users/me`)
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getUser()
    }, [])


    return (
        <nav className='navbar'>
            <div className='user-info'>
                <img src="https://img.icons8.com/dotty/40/346751/gender-neutral-user.png" />
                <p>Bienvenido/a: {user?.data.data.name} </p>
            </div>
            <div className='navbar-btns'>
                <Link to='/edit-profile'>Editar Perfil</Link>
                <Logout />
            </div>
            
        </nav>
    )
}

export default Navbar