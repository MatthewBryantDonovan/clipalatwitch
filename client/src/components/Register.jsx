import React, { useState, useEffect } from 'react'
import API from '../utils/API.js'
import { Redirect } from 'react-router-dom';

function Register(props) {
      
      const [username, setUsername] = useState({});
      const [redirect, setRedirect] = useState(false);
      const [userImage, setUserImage] = useState({});
      const [password, setPassword] = useState({});

      function updateUsername(e) {
            const newVal = e.target.value;
            setUsername(newVal)
      }

      function updateUserImage(e) {
            const newVal = e.target.value;
            setUserImage(newVal)
      }

      function updatePassword(e) {
            const newVal = e.target.value;
            setPassword(newVal)
      }

      const submit = e => {
            e.preventDefault();
            const object = {
                  username,
                  userImage,
                  password
            }

                  setRedirect(true)
            API.createUser(object).then(function(data){
            console.log(data);
            }).catch(function(err){
            console.log(err);
            });
      }


      useEffect(()=> {
            if(redirect === true) {
                  props.loginRoutes()
            }
      }, [redirect])

      return (
            <React.Fragment>
                  {redirect && <Redirect to='/home' />}
                  <div className="container">
                        <h1>Creat an account!</h1>
                        <h1>{props.boogers}</h1>
                        <form action="submit" onSubmit={submit} >
                              <label htmlFor="username">Username</label>
                              <input type="text" id="username" onChange={updateUsername} required />
                              <label htmlFor="username">Image URL for profile pic</label>
                              <input type="text" id="username" onChange={updateUserImage} required />
                              <label htmlFor="password">Password</label>
                              <input type="password" id="password" onChange={updatePassword} required  />
                              <button type="submit" className="btn" >Register</button>
                        </form>
                  </div>
            </React.Fragment>
      )
}

export default Register
