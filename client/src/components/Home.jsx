import React from 'react'
import Form from './Form'
import API from '../utils/API.js'


function Home() {

      const submit = (userData) => {
            API.createUser(userData)
      }
      return (
            <React.Fragment>
                  <Form submit={submit} />
            </React.Fragment>
      )
}

export default Home
