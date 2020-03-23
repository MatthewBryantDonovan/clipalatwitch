import React, { useState, useEffect } from 'react';
import './css/Sidenav.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js'
import API from '../utils/API'
import Updateimage from './Updateimage'

{/* <form action="/logout?_method=DELETE" method="POST">
<i className="material-icons" style={{color: '#66fcf1'}} >
      logout
</i>
<button type="submit">Log Out</button>
</form> */}

function Sidenav(props) {

      const [userData, setUserData] = useState()
      const [routes, setRoutes] = useState(props.routes)
      const [redirect, setRedirect] = useState(false);
      const [userImage, setUserImage] = useState(null)

      useEffect(() => {
            if (!userData) {
                  API.userSavedInfo().then(function (data) {
                        setUserData(data.data)
                        props.loginRoutes()
                  }).catch(function (err) {
                        if (props.routes.length !== 3) {
                              props.logoutRoutes();
                        } else {
                              console.log(err)
                        }
                  });
            }
      }, [userData, props.routes])


      const handleImageChange = e => {
            const url = e.target.value
            setUserImage(url)
      }

      const submitImageUrl = () => {


            const object = {
                  userImage
            }
           console.log("entered submitIMG submitting object below");
           console.log(object);
           
           
            API.updateImage(object).then((res) => {
                  console.log(res)
                  API.userSavedInfo().then(function (data) {
                        setUserData(data.data)
                        props.loginRoutes()
                  }).catch(function (err) {
                        if (props.routes.length !== 3) {
                              props.logoutRoutes();
                        }
                  }).catch(err => console.log(err));
            });
      }


      const logout = () => {
            console.log("entered logout");
            API.logout().then(function (data) {
                  console.log(data);
                  console.log("Logout Occurred");
                  setUserData(false)
                  setRedirect(true);
            }).catch(function (err) {
                  console.log(err);
            });
      }

      useEffect(() => {
            if (redirect === true) {
                  props.logoutRoutes();
                  setRedirect(false);
            }
      }, [redirect])

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
                  <Updateimage handleImageChange={handleImageChange} submitImageUrl={submitImageUrl} />
                  {redirect && <Redirect to='/login' />}
                  <nav>
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large" ><i className="material-icons nav-head-icon">menu</i></a>
                  </nav>
                  <ul id="slide-out" className="sidenav">
                        {
                              (userData) ? <li><div className="user-view">
                                    {/* <button data-target="modal1" className="btn modal-trigger">Modal</button> */}

                                    <img className="circle modal-trigger" data-target="modal1" src={userData.userImage} alt="Click_To_Change_Image" />
                                    <span className="white-text name">{userData.username}</span>
                              </div></li> : <div></div>
                        }
                        {props.routes.map((route, index) => (
                              (route.path !== '/logout') ?
                                    <li key={index}><Link to={route.path} className="sidenav-close" ><i className="material-icons" style={{ color: '#66fcf1' }} >{route.i}</i>{route.name}</Link></li>
                                    :
                                    <li key={index} onClick={() => logout()} ><Link to="/login" className="sidenav-close" ><i className="material-icons" style={{ color: '#66fcf1' }} >{route.i}</i>{route.name}</Link></li>
                        ))}
                  </ul>
            </React.Fragment>
      )
}

export default Sidenav
