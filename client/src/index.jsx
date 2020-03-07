import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css';
import Sidenav from './components/Sidenav';
import Home from './components/Home'


// import * as serviceWorker from './serviceWorker';

const router = (
      <Router>
            <Sidenav />
                  <Route
                        path='/'
                        exact
                        component={Home}
                  />
      </Router>
)
export default router


ReactDOM.render(router, document.getElementById('root'));

