import React, { useState } from 'react'
import API from '../utils/API.js'

function Register() {

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
                  username: username,
                  password: password
            }
            API.createUser(object)
            console.log(object)
      }

      return (
            <React.Fragment>
                  <div className="container">
                        <h1>Register!</h1>
                        <form action="submit" onSubmit={submit} >
                              <label htmlFor="username">Username</label>
                              <input type="text" id="username" onChange={updateUsername} />
                              <label htmlFor="password">Password</label>
                              <input type="password" id="password" onChange={updatePassword} />
                              <button type="submit" className="btn" >Register</button>
                        </form>
                  </div>
            </React.Fragment>
      )
}

export default Register
