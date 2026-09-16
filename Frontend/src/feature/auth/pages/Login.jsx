import React from 'react'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>LogIn</h1>

            <form>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder='Enter Email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" id='password' placeholder='Enter Password' />
                </div>

                <button>LogIN</button>
                <h5>Create a new account <span>Register</span></h5>
            </form>
        </div>
    </main>
  )
}

export default Login