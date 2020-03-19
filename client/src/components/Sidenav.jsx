import React, { useState, useEffect } from 'react';
import './css/Sidenav.css';
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import API from '../utils/API'

{/* <form action="/logout?_method=DELETE" method="POST">
<i className="material-icons" style={{color: '#66fcf1'}} >
      logout
</i>
<button type="submit">Log Out</button>
</form> */}

function Sidenav(props) {
      const [routes, setRoutes] = useState(props.routes)

      const logout = () => {
            console.log("entered logout");
            API.logout().then(function(data){
                console.log(data);
                console.log("Logout Occurred");
            }).catch(function(err){
                console.log(err);
            });
      }

      useEffect(() => {
            const elems = document.querySelectorAll('.sidenav');
            const instances = M.Sidenav.init(elems, {
                  edge: 'left',
                  inDuration: 175
            });
            console.log(props.routes)
            setRoutes(props.routes)
      }, [routes])

      return (
            <React.Fragment>
                  <nav>
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large" ><i className="material-icons nav-head-icon">menu</i></a>
                  </nav>
                  <ul id="slide-out" className="sidenav">
                        <li><div className="user-view">
                              <a href="#user"><img className="circle" src="https://lowbrowcomics.files.wordpress.com/2016/02/x-23-target-x-006-008.jpg" alt="placeholder" /></a>
                              <a href="#name"><span className="white-text name">John Doe</span></a>
                              <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div></li>
                        {props.routes.map((route, index) => (
                              (route.path != '/logout') ? 
                              <li key={index}><Link to={route.path} className="sidenav-close" ><i className="material-icons" style={{color: '#66fcf1'}} >{route.i}</i>{route.name}</Link></li>
                              :
                              <li key={index} onClick={()=> logout()}><Link onClick={()=> logout()} to="/login" className="sidenav-close" ><i className="material-icons" style={{color: '#66fcf1'}} >{route.i}</i>{route.name}</Link></li>
                        ))}
                  </ul>
            </React.Fragment>
      )
}

export default Sidenav
