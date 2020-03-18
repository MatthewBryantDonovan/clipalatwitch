import React, { useState, useEffect } from 'react';
import FollowSlick from "../components/FollowSlick";
import ClipSlick from "../components/ClipSlick";
import API from '../utils/API';

function UserSavedPage() {

    const [clipData, setClipData] = useState()
    const [userData, setUserData] = useState()

      useEffect(() => {
        if(!userData){
            API.userSavedInfo().then(function(data){
                console.log(data);
                setUserData(data.data)
            }).catch(function(err){
                console.log(err);
            });
        }
        console.log(userData);
      }, [userData])

      useEffect(() => {
        console.log(clipData);
      }, [clipData])

      const viewClips = (type, id) => {
        console.log("entered save");
        
        API.viewClips(type, id).then(function(data){
            console.log(data);
            setClipData(data.data);
        }).catch(function(err){
            console.log(err);
        });

    }

    return(<div>
        <div className="container">
            <h1>I am the UserSavedPage</h1>
            <div className="row">
                <div className="col m12">
                    { (userData) ? userData.streamers.map(streamer => (
                        <div>
                            <p>{streamer.id}</p>
                            <p>{streamer.name}</p>
                            <button onClick={() => viewClips("streamer", streamer.id)}><img src={streamer.image}></img></button>
                        </div>
                    )) : <div></div>}
                    <FollowSlick 
                        formType={"Streamer"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    <ClipSlick clipData={clipData} />
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                { (userData) ? userData.games.map(game => (
                        <div>
                            <p>{game.id}</p>
                            <p>{game.name}</p>
                            <button onClick={() => viewClips("game", game.id)}><img src={game.image}></img></button>
                        </div>
                    )) : <div></div>}
                    <FollowSlick 
                        formType={"Game"}
                    />
                </div>
            </div>
        </div>
        
        </div>)
    
}

export default UserSavedPage