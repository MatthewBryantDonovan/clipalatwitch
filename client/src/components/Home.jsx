import React from 'react'
import Form from './Form'
import axios from './axios'


function Home() {

      const submit = () => {
            axios.post('../../../api/users/creat', {data1, data2})
      }
      return (
            <React.Fragment>
                  <Form submit={submit} />
            </React.Fragment>
      )
}

export default Home
