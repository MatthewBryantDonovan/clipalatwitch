import React, { useState } from 'react'
import API from '../utils/API.js'

function Register() {

      const [username, setUsername] = useState({});
      const [pic, setPic] = useState({});
      const [password, setPassword] = useState({});
      const [confirmPassword, setConfirmPassword] = useState({});

      function updateUsername(e) {
            const newVal = e.target.value;
            setUsername(newVal)
      }
     
      function updatePic(e) {
            const newVal = e.target.value;
            setPic(newVal)
      }

      function updatePassword(e) {
            const newVal = e.target.value;
            setPassword(newVal)
      }
     
      function updateConfirmPassword(e) {
            const newVal = e.target.value;
            setConfirmPassword(newVal)
      }

      const submit = e => {
            e.preventDefault();
            const object = {
                  username,
                  pic,
                  password,
                  confirmPassword,
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
                              <input type="text" id="username" onChange={updateUsername} required />
                              <label htmlFor="username">Image URL for profile pic</label>
                              <input type="text" id="username" onChange={updatePic} required  />
                              <label htmlFor="password">Password</label>
                              <input type="password" id="password" onChange={updatePassword} required  />
                              <label htmlFor="password">Confirm Password</label>
                              <input type="password" id="password" onChange={updateConfirmPassword} required  />
                              <button type="submit" className="btn" >Register</button>
                        </form>
                  </div>
            </React.Fragment>
      )
}

export default Register
