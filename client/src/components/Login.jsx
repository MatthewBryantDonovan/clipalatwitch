import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import API from '../utils/API.js'

function Login() {

      const [username, setUsername] = useState({});
      const [password, setPassword] = useState({});

      function updateUsername(e) {
            const newVal = e.target.value;
            setUsername(newVal)
      }

      function updatePassword(e) {
            const newVal = e.target.value;
            setPassword(newVal)
      }

      const submit = e => {
            e.preventDefault();
            const object = {
                  username,
                  password
            }
            API.createUser(object)
            console.log(object)
      }

      return (
            <React.Fragment>
                  <div className="container">
                        <form action="submit" onSubmit={submit} >
                              <h1>Login!</h1>
                              <label htmlFor="username">Username</label>
                              <input type="text" id="username" onChange={updateUsername} required  />
                              <label htmlFor="password">Password</label>
                              <input type="password" id="password" onChange={updatePassword} required  />
                              <button type="submit" className="btn" >Login</button>
                        </form>
                        <p>Don't have an account? creat one <Link className="linkText" to="/register">here!</Link> </p>
                  </div>
            </React.Fragment>
      )
}

export default Login
