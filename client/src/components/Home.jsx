import React from 'react'
import Form from './Form'
import API from '../utils/API.js'


function Home() {

      const submitCreate = (userData) => {
            API.createUser(userData).then(function(data){
            console.log(data);
            }).catch(function(err){
            console.log(err);
            });
      }

      const submitLogin = (userData) => {
            API.loginUser(userData).then(function(data){
            console.log(data);
            }).catch(function(err){
            console.log(err);
            });
      }


      return (
            <React.Fragment>
                  <Form submit={submitCreate} />
                  <div><p>ABOVE FOR CREATE AND BELOW FOR LOGIN</p></div>
                  <Form submit={submitLogin} />
            </React.Fragment>
      )
}

export default Home
