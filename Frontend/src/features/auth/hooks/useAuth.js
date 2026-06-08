import {useContext} from 'react'
import {AuthContext} from '../context/auth.context'
import {login, register, logout, getMe} from '../services/auth.api'


export const useAuth = () =>{
  const context = useContext(AuthContext)
  const {user, setUser, loading, setLoading} = context 


  const handleLogin = async ({username, password}) =>{
    setLoading(true)
    const data = await login({username, password})
    setUser(data.user)
    setLoading(false)
  }


   const handleRegister = async ({username, password, email}) =>{
    setLoading(true)
    const data = await register({username, password, email})
    setUser(data.user)
    setLoading(false)
  }

   const handleLogout = async () =>{
    setLoading(true)
    const data = await logout()
    setUser(null)
    setLoading(false)
  }

  return {user, loading, handleRegister, handleLogin, handleLogout}

}