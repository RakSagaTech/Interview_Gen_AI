import {Link} from 'react-router'
import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import '../auth.form.scss'

 const Register = () => {

  const {loading, handleRegister} = useAuth 

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await handleRegister({username, email, password})
  }

  if(loading){
    return <main><h1>Loading...</h1></main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" 
              onChange={(e) => {setUsername(e.target.value)}}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" 
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input type="text" id="email" name="email" placeholder="Enter your email address" 
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <button type="submit" className="button primary-button">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}


export default Register
