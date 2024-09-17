import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false)
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:4000/auth", { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        if (result.data.STATUS === 'OK' && result.data.data) {
          setUsername(result.data.data.username);
          setLoginState(true)
          setRole(result.data.data.role)
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [loginState, role])
  return (
    <AuthContext.Provider value={{ loginState, role, username, setRole, setLoginState, setUsername, }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider