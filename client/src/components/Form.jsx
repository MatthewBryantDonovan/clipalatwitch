import React from 'react'

function Form() {
      return (
            <React.Fragment>
                  <form action="submit">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"/>
                  </form>
            </React.Fragment>
      )
}

export default Form
