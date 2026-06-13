import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/auth.context'
import {login, register, logout, getMe} from '../services/auth.api'


export const useAuth = () =>{
  const context = useContext(AuthContext)
  const {user, setUser, loading, setLoading} = context 


  const handleLogin = async ({username, password}) =>{
    setLoading(true)
    try{
      const data = await login({username, password})
      if (!data) {
      return
    } 
    setUser(data.user)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }


   const handleRegister = async ({username, password, email}) =>{
    setLoading(true)
    try{
      const data = await register({username, password, email})
      if (!data) {
      return
    }
    setUser(data.user)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

   const handleLogout = async () =>{
    setLoading(true)
    try{
      await logout()
      setUser(null)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    const getAndSetUser = async() =>{
      try{
        const data = await getMe()
        setUser(data.user)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }

    getAndSetUser()
  }, [setUser, setLoading])

  return {user, loading, handleRegister, handleLogin, handleLogout}

}