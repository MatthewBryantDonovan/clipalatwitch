import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import Sidenav from './components/Sidenav';
import Form from './components/Form'

// import * as serviceWorker from './serviceWorker';


const router = (
      <Router>
            <Sidenav />
            <div id="main">
                  <Route
                        path='/'
                        exact
                        component={Form}
                  />
            </div>
      </Router>
)
export default router


ReactDOM.render(router, document.getElementById('root'));

