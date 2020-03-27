import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API.js';

function Register(props) {
      
      // Hooks
      const [username, setUsername] = useState({});
      const [redirect, setRedirect] = useState(false);
      const [userImage, setUserImage] = useState({});
      const [password, setPassword] = useState({});

      // Username form field
      function updateUsername(e) {
            const newVal = e.target.value;
            setUsername(newVal);
      }

      // UserImage form field
      function updateUserImage(e) {
            const newVal = e.target.value;
            setUserImage(newVal);
      }

      // Password form field
      function updatePassword(e) {
            const newVal = e.target.value;
            setPassword(newVal);
      }

      // Form submit
      const submit = e => {
            e.preventDefault();
            const object = {
                  username,
                  userImage,
                  password
            };

            API.createUser(object)
            .then(function(data){
                  const loginObj = {username, password};
                  API.loginUser(loginObj)
                  .then(function(data){
                        setRedirect(true);
                  })
                  .catch(function(err){
                  });
            })
            .catch(function(err){
            });
      }

      // Use effect to get userData
      useEffect(()=> {
            API.userSavedInfo()
            .then(function (data) {
                  setRedirect(true);
            })
            .catch(function (err) {
            });

            if(redirect === true) {
                  props.loginRoutes();
            }
      }, [redirect]);

      return (
      <React.Fragment>
            {redirect && <Redirect to='/home' />}
            <div className="container">
                  <h1>Creat an account!</h1>
                  <form action="submit" onSubmit={submit} >
                        <label htmlFor="username" style={{color: 'rgb(30, 136, 229)'}}>Username</label>
                        <input type="text" id="username" onChange={updateUsername} required />
                        <label htmlFor="image" style={{color: 'rgb(30, 136, 229)'}}>Image URL for profile pic</label>
                        <input type="text" id="image" onChange={updateUserImage} required />
                        <label htmlFor="password" style={{color: 'rgb(30, 136, 229)'}}>Password</label>
                        <input type="password" id="password" onChange={updatePassword} required  />
                        <button type="submit" className="btn" >Register</button>
                  </form>
            </div>
      </React.Fragment>
      );
}

export default Register;
