import '../auth.form.scss'

 const Register = () => {

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input type="text" id="email" name="email" placeholder="Enter your email address" />
          </div>
          <button type="submit" className="button primary-button">Register</button>
        </form>
      </div>
    </main>
  )
}


export default Register
