import React, { useState, useEffect } from 'react';
import './css/Sidenav.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import API from '../utils/API';
import Updateimage from './Updateimage';

function Sidenav(props) {

      // Hooks
      const [userData, setUserData] = useState();
      const [routes, setRoutes] = useState(props.routes);
      const [redirect, setRedirect] = useState(false);
      const [userImage, setUserImage] = useState(null)

      // Use Effect to get user data
      useEffect(() => {
            if (!userData) {
                  API.userSavedInfo()
                  .then(function (data) {
                        setUserData(data.data);
                        props.loginRoutes();
                  })
                  .catch(function (err) {
                        if (props.routes.length !== 3) {
                              props.logoutRoutes();
                        }
                  });
            }
      }, [userData, props.routes]);

      // User image form field
      const handleImageChange = e => {
            const url = e.target.value;
            setUserImage(url);
      }

      // Form Submit for user image
      const submitImageUrl = () => {
            const object = {
                  userImage
            };
           
            API.updateImage(object).then((res) => {
                  API.userSavedInfo()
                  .then(function (data) {
                        setUserData(data.data);
                        props.loginRoutes();
                  })
                  .catch(function (err) {
                        if (props.routes.length !== 3) {
                              props.logoutRoutes();
                        }
                  })
                  .catch(function (err) {
                  });
            });
      }

      // Call to server to logout user
      const logout = () => {
            API.logout()
            .then(function (data) {
                  setUserData(false);
                  setRedirect(true);
            })
            .catch(function (err) {
            });
      }

      // Use Effect to redirect
      useEffect(() => {
            if (redirect === true) {
                  props.logoutRoutes();
                  setRedirect(false);
            }
      }, [redirect]);

      // Use Effect to display current routes ( logged in vs logged out )
      useEffect(() => {
            const elems = document.querySelectorAll('.sidenav');
            const instances = M.Sidenav.init(elems, {
                  edge: 'left',
                  inDuration: 175
            });
            setRoutes(props.routes);
      }, [routes]);

      return (
      <React.Fragment>
            <Updateimage handleImageChange={handleImageChange} submitImageUrl={submitImageUrl} />
            {redirect && <Redirect to='/login' />}
            <nav className="pink accent-1">
                  <button data-target="slide-out" className="sidenav-trigger show-on-large btn-small" style={{background: "unset", boxShadow: "unset"}}><i className="material-icons nav-head-icon">menu</i></button>
                  <span className="brand-logo center hide-on-med-and-up" style={{fontSize: "1.5em"}}>Clip &#224; la Twitch</span>
                  <span className="brand-logo center hide-on-small-only" style={{fontSize: "2.25em"}}>Clip &#224; la Twitch</span>
            </nav>
            <ul id="slide-out" className="sidenav">
                  {(userData) ?
                  <li>
                        <div className="user-view">
                              <div className="center-align">
                                    <img className="circle modal-trigger" data-target="modal1" src={userData.userImage} alt="Click_To_Change_Image" />
                              </div>
                              <h5 style={{color: "white"}}>{userData.username}</h5>
                        </div>
                  </li>
                  :
                  <div></div>
                  }
                  {props.routes.map((route, index) => (
                        (route.path !== '/logout') ?
                        <li key={index}><Link to={route.path} className="sidenav-close" ><i className="material-icons" style={{ color: '#1e88e5' }} >{route.i}</i>{route.name}</Link></li>
                        :
                        <li key={index} onClick={() => logout()} ><Link to='#' className="sidenav-close" ><i className="material-icons" style={{ color: '#1e88e5' }} >{route.i}</i>{route.name}</Link></li>
                  ))}
                  {(userData) ? 
                  <span></span>
                  :
                  <span>
                        <li><Link><i className="material-icons" style={{ color: 'red' }} >search</i>Search *Requires Login*</Link></li>
                        <li><Link><i className="material-icons" style={{ color: 'red' }} >favorite</i>Saved *Requires Login*</Link></li>
                  </span>
                  }
            </ul>
      </React.Fragment>
      );
}

export default Sidenav;
