import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css';
import Sidenav from './components/Sidenav';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'


// import * as serviceWorker from './serviceWorker';

const routes = [
      {
            path: '/',
            exact: true,
            component: Home
      },
      {
            path: '/home',
            exact: false,
            component: Home
      },
      {
            path: '/register',
            exact: false,
            component: Register
      },
      {
            path: '/login',
            exact: false,
            component: Login
      }
]

const router = (
      <Router>
            <Sidenav />
            {routes.map((route, index) => (
                  <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                  />
            ))}

      </Router>
)
export default router


ReactDOM.render(router, document.getElementById('root'));

