import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API.js';
import { Link } from 'react-router-dom';

function Login(props) {

      const [username, setUsername] = useState({});
      const [redirect, setRedirect] = useState(false);
      const [password, setPassword] = useState({});
      const [loginFail, setLoginFail] = useState(false);


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

            API.loginUser(object).then(function(data){
                  console.log(data);
                  
                  API.userSavedInfo().then(function (data) {
                        setRedirect(true);
                  }).catch(function (err) {
                        console.log("failed login");
                        setLoginFail("Username or Password was incorrect.");
                  });
            }).catch(function(err){
                  console.log(err);
            });

      }
      
      useEffect(()=> {
            API.userSavedInfo().then(function (data) {
                  setRedirect(true);
            }).catch(function (err) {
            });
            if(redirect === true) {
                  props.loginRoutes();
            }
      }, [redirect])

      return (
            <React.Fragment>
                  {redirect && <Redirect to='/home' />}
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
                        { (loginFail) ? <strong><p style={{color: "Red", fontSize: "2em"}}> {loginFail} </p></strong> : <span></span>}
                  </div>
            </React.Fragment>
      )
}

export default Login
