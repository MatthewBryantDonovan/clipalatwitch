import React, { useState } from 'react'
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
                  username: username,
                  password: password
            }
            API.loginUser(object).then(function(data){
            console.log(data);
            }).catch(function(err){
            console.log(err);
            });

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
                  </div>
            </React.Fragment>
      )
}

export default Login
