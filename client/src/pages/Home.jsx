import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ClipRiver from "../components/ClipRiver"
import API from "../utils/API"


function Home(props) {
      const [userData, setUserData] = useState();
      const [riverData, setRiverData] = useState();

      useEffect(() => {
            if (!userData) {
                API.userSavedInfo().then(function (data) {
                    console.log(data);
                    setUserData(data.data)
                }).catch(function (err) {
                    console.log(err);
                });
            }
            if (!riverData) {
                API.getRiver().then(function (data) {
                    console.log("River Obtained");
                    console.log(data.data);
                    
                    setRiverData(data.data)
                }).catch(function (err) {
                  console.log(err);
                });
            }
          }, [])

      const clipType = (clipType, id) => {
            console.log("test");
            
            let resObj = { clipType: clipType, _id: id };
            API.clipType(resObj).then(function (data) {
                  console.log("Comment Successful");
                  API.getRiver().then(function (data) {
                        console.log("River Obtained");
                        console.log(data.data);
                        
                        setRiverData(data.data)
                    }).catch(function (err) {
                      console.log(err);
                    });
              }).catch(function (err) {
                  console.log(err);
              });
      }

      return (
            <React.Fragment>
                  <div className="container">
                        <div className="row center">
                              {/* <div className="col s12 m6 center"> */}
                                    <div className="card blue-grey darken-1">
                                          <div className="card-content white-text">
                                                <span className="card-title">Clip &#224; la Twitch</span>
                                                {(userData) ? <p>Welcome home {userData.username} !</p> : <span></span>}
                                          <p>You are currently viewing liked videos from Clip &#224; la Twitch's users sorted by popularity!</p>
                                          {(userData) ? <p>Classify a video by tagging a 'moment type' to raise its popularity!</p> : <span>Log in to be able to classify a video's 'moment type' to raise its popularity!</span>}
                                          </div>
                                    </div>
                              {/* </div> */}
                        </div>
                        {(riverData) ? <ClipRiver riverData={riverData} clipType={clipType} userData={userData}/> : <div> Loading River </div>}
                  </div>
            </React.Fragment>
      )
}

export default Home
