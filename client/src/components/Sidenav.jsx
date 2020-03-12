import React, { useEffect } from 'react';
import './css/Sidenav.css';
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'

function Sidenav() {

      useEffect(() => {
            const elems = document.querySelectorAll('.sidenav');
            const instances = M.Sidenav.init(elems, {
                  edge: 'left',
                  inDuration: 175
            });      
      }, [])

      return (
            <React.Fragment>
                  <nav>
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large" ><i className="material-icons nav-head-icon">menu</i></a>
                  </nav>
                  <ul id="slide-out" className="sidenav">
                        <li><div className="user-view">
                              <a href="#user"><img className="circle" src="images/yuna.jpg" alt="placeholder" /></a>
                              <a href="#name"><span className="white-text name">John Doe</span></a>
                              <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div></li>
                        <li><Link to="/home" className="sidenav-close" ><i className="material-icons" style={{color: '#66fcf1'}} >home</i>Home</Link></li>
                        <li><Link to="/login" className="sidenav-close"  ><i className="material-icons" style={{color: '#66fcf1'}}  >person</i>Login</Link></li>
                        <li><Link to="/register" className="sidenav-close"  ><i className="material-icons" style={{color: '#66fcf1'}} >create</i>Create an account</Link></li>
                        <li>
                              <form action="/logout?_method=DELETE" method="POST">
                                    <i className="material-icons" style={{color: '#66fcf1'}} >
                                          logout
                                    </i>
                                    <button type="submit">Log Out</button>
                              </form>
                        </li>
                  </ul>
            </React.Fragment>
      )
}

export default Sidenav
