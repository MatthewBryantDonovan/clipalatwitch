import React from 'react';
import ClipRiver from "./ClipRiver"

function Home() {

      return (
            <React.Fragment>
                  <div className="container">
                        <div className="row">
                              <div className="col s12 m6">
                                    <div className="card blue-grey darken-1">
                                          <div className="card-content white-text">
                                                <span className="card-title">Home placeholder</span>
                                                <p>Welcome home!</p>
                                          </div>
                                    </div>
                                    <ClipRiver />
                              </div>
                        </div>
                  </div>
            </React.Fragment>
      )
}

export default Home
