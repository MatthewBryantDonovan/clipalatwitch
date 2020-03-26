import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import Sidenav from './components/Sidenav';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserSearchPage from './pages/UserSearchPage';
import UserSavedPage from './pages/UserSavedPage';
// import * as serviceWorker from './serviceWorker';

function Routing() {

      // Account routes for a logged in user
      const acctRoutes = [
            {
                  path: '/home',
                  name: 'Home',
                  i: 'home'
            },
            {
                  path: '/search',
                  name: 'Search',
                  i: 'search'
            },
            {
                  path: '/saved',
                  name: 'Saved',
                  i: 'favorite'
            },
            {
                  path: '/logout',
                  name: 'Logout',
                  i: 'person'
            }
      ];
      
      // Account routes for a logged out user
      const noAcctRoutes = [
            {
                  path: '/home',
                  name: 'Home',
                  i: 'home'
            },
            {
                  path: '/register',
                  name: 'Register',
                  i: 'create'
            },
            {
                  path: '/login',
                  name: 'Login',
                  i: 'person'
            }
      ];

      // Hooks
      const [routes, setRoutes] = useState(noAcctRoutes);
      
      // Functions to set sidenav routes
      const loginRoutesChanged = () => setRoutes(acctRoutes);
      const loginRoutesChangedBack = () => setRoutes(noAcctRoutes);

      return (
      <Router>
            <Sidenav routes={routes} logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />
            <Switch>
                  <Route
                        path='/'
                        exact={true}
                        component={() => <Redirect to="/home" logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />}
                  />

                  <Route
                        path='/home'
                        component={() => <Home logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged}/>}
                  />

                  <Route
                        path='/login'
                        component={() => <Login logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />}
                  />

                  <Route
                        path='/register'
                        component={() => <Register routes={routes} logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />}
                  />

                  <Route
                        path='/search'
                        component={() => <UserSearchPage routes={routes} logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />}
                  />

                  <Route
                        path='/saved'
                        component={() => <UserSavedPage routes={routes} logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged}  />}
                  />

                  <Route
                        component={() => <Home routes={routes} logoutRoutes={loginRoutesChangedBack} loginRoutes={loginRoutesChanged} />}
                  />

            </Switch>
      </Router>
      );
}
export default Routing;


ReactDOM.render(<Routing />, document.getElementById('root'));

