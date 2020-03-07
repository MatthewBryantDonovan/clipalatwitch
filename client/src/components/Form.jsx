import React, {useState} from 'react'

function Form(props) {
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
            props.submit(object)
            console.log(object)
      }
      return (
            <React.Fragment>
                  <form action="submit" onSubmit={submit} >
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={updateUsername} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={updatePassword} />
                        <button type="submit" >Submit</button>
                  </form>
            </React.Fragment>
      )
}

export default Form
