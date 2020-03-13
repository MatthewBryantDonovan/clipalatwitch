import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API.js';
import { Link } from 'react-router-dom';

function Login() {

      const [username, setUsername] = useState({});
      const [redirect, setRedirect] = useState(false);
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
            console.log("sending login req");
            
            API.loginUser(object).then(function(data){
            console.log(data);
            // if(data){
            //       setRedirect(true)
            //       return dund();
            // }
            // }).catch(function(err){
            //       console.log(err);
            });

      }
      const dund = () => <Redirect to={{path: "/"}} />
      useEffect(() => {
            if(redirect === true){
                  dund();
            }
      },[redirect])

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
