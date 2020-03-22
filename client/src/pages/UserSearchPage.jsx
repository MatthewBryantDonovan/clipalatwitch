import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserSearchForm from "../components/UserSearchForm";
import ClipSlick from "../components/ClipSlick";
import API from "../utils/API"

function UserSearchPage (props) {
    const [clipData, setClipData] = useState()
    const [userData, setUserData] = useState()
    const [notAuthed, setNotAuthed] = useState(false)
    const [displaySearch, setDisplaySearch] = useState("streamer")

      useEffect(() => {
        if (!userData) {
            API.userSavedInfo().then(function (data) {
                console.log(data);
                setUserData(data.data)
            }).catch(function (err) {
                console.log(err);
                setNotAuthed(true);
                props.logoutRoutes();
            });
        }
        console.log(clipData);
      }, [clipData])


    const submit = (type, name) => {

        if (type === "Streamer"){
            API.findStreamer(encodeURIComponent(name)).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                console.log(err);
            });
        } else if (type === "Game"){
            API.findGame(encodeURIComponent(name)).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    const removeStreamerOrGame = (type, id) => {
        console.log("entered remove");
        API.removeStreamerOrGame(type, id).then(function (data) {
            console.log(data);
            /// FIXME: might be bad logic
            API.userSavedInfo().then(function (data) {
                console.log(data);
                setUserData(data.data)
            }).catch(function (err) {
                console.log(err);
            });
            /// FIXME:
        }).catch(function (err) {
            console.log(err);
        });
    }

    const save = (type) => {
        console.log("entered save");
        

        if (type === "streamer"){
            console.log("streamer path hit");
            
            let reqObj = {
                id: clipData.streamerID,
                name: clipData.streamerName,
                image: clipData.streamerImage
            }

            API.saveStreamer(reqObj).then(function(data){
                console.log(data);
                console.log("Streamer Saved");
                API.userSavedInfo().then(function (data) {
                    console.log(data);
                    setUserData(data.data)
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });
        } else if (type === "game"){
            console.log("game path hit");


            let reqObj = {
                id: clipData.gameID,
                name: clipData.gameName,
                image: clipData.gameImage
            }
            
            API.saveGame(reqObj).then(function(data){
                console.log(data);
                console.log("Game Saved");
                API.userSavedInfo().then(function (data) {
                    console.log(data);
                    setUserData(data.data)
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    
    return(
    <div>
        {notAuthed && <Redirect to="/login" />}
    <div className="container">
        <div className="row">
            <button className="col m6 s6 btn" onClick={() => setDisplaySearch("streamer")}>Search Streamer</button>
            <button className="col m6 s6 btn" onClick={() => setDisplaySearch("game")}>Search Game</button>
            {(displaySearch === "streamer") ? 
            
            <div className="col m6">
                <UserSearchForm 
                    formType={"Streamer"}
                    submit={submit}
                />
            </div>
            :
            <div className="col m6">
                <UserSearchForm 
                    formType={"Game"}
                    submit={submit}
                />
            </div>
            
            }
        </div>
        <div className="row center">
            {(clipData) ? (clipData.streamerID) ? 
                <div className="col m12 s12">
                    {/* <p>{clipData.streamerName}</p> */}
                    {/* <p>{clipData.streamerID}</p> */}
                    <img src={clipData.streamerImage} height="125" width="100"></img>
                    {(userData.streamers.some(streamer => streamer.id === clipData.streamerID)) ? 
                    <button type="button" className="btn" onClick={() => removeStreamerOrGame("streamer", clipData.streamerID)}><i className="material-icons" style={{color: '#008080'}}>favorite</i></button>
                    :
                    <button type="button" className="btn" onClick={() => save("streamer")}><i className="material-icons" style={{color: '#008080'}}>favorite_border</i></button>
                    }
                    <ClipSlick clipData={clipData} />
                </div>
                :
                <div>
                    {/* <p>{clipData.gameName}</p> */}
                    {/* <p>{clipData.gameID}</p> */}
                    <img src={clipData.gameImage} height="125" width="100"></img>
                    {(userData.games.some(game => game.id === clipData.gameID)) ? 
                    <button type="button" className="btn" onClick={() => removeStreamerOrGame("game", clipData.gameID)}><i className="material-icons" style={{color: '#008080'}}>favorite</i></button>
                    :
                    <button type="button" className="btn" onClick={() => save("game")}><i className="material-icons" style={{color: '#008080'}}>favorite_border</i></button>
                    }
                    <ClipSlick clipData={clipData} />
                </div>
                :
            <div></div>
            }

            
        </div>
    </div>
    
    </div>)
    
    }

export default UserSearchPage