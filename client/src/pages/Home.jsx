import React, { useState, useEffect } from 'react';
import ClipRiver from "../components/ClipRiver";
import API from "../utils/API";


function Home() {

      // Hooks
      const [userData, setUserData] = useState();
      const [riverData, setRiverData] = useState();

      // Use Effect for getting user data and river data
      useEffect(() => {
            if (!userData) {
                API.userSavedInfo()
                .then(function (data) {
                    setUserData(data.data);
                })
                .catch(function (err) {
                });
            }
            if (!riverData) {
                API.getRiver()
                .then(function (data) {
                    setRiverData(data.data);
                })
                .catch(function (err) {
                });
            }
      }, [])

      // Call to server to 'type' a clip
      const clipType = (clipType, id) => {
            let resObj = { clipType: clipType, _id: id };
            API.clipType(resObj)
            .then(function (data) {
                  API.getRiver()
                  .then(function (data) {
                        setRiverData(data.data);
                  })
                  .catch(function (err) {
                  });
            })
            .catch(function (err) {
            });
      }

      return (
      <React.Fragment>
            <div className="container">
                  <div className="row center">
                        <div className="card blue-grey darken-1">
                              <div className="card-content white-text">
                                    {(userData) ? 
                                    <span className="card-title">{userData.username}, Welcome to Clip &#224; la Twitch</span>
                                    :
                                    <span className="card-title">Welcome to Clip &#224; la Twitch</span>
                                    }
                              <p>You are currently viewing liked videos from Clip &#224; la Twitch's users - sorted by popularity!</p>
                              {(userData) ?
                              <p>Classify a video by tagging a 'moment type' to raise its popularity!</p>
                              :
                              <span>Log in to be able to classify a video's 'moment type' to raise its popularity!</span>
                              }
                              </div>
                        </div>
                  </div>
                  {(riverData) ?
                  <ClipRiver riverData={riverData} clipType={clipType} userData={userData}/>
                  :
                  <div> Loading River </div>
                  }
            </div>
      </React.Fragment>
      );
}

export default Home;
