import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { host } from "../utils/APIRoutes";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  
    const [ auth, setAuth ] = useState('')

    const verifyAuth = async () => {
      const isLoggedIn = await axios.get(`${host}/api/auth/is_logged_in`)
      setAuth(isLoggedIn.data)
      return isLoggedIn.data
    }

    useEffect(() => {
      verifyAuth()
    }, [])

    return(
        <AuthContext.Provider value={{auth, verifyAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext