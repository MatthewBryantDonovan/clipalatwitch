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
    const [searchError, setSearchError] = useState("")

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
        setSearchError("");

        if (type === "Streamer"){
            API.findStreamer(encodeURIComponent(name)).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                setSearchError("Please type the " + type + "'s name as is appears on Twitch!");
                console.log(err);
            });
        } else if (type === "Game"){
            API.findGame(encodeURIComponent(name)).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                setSearchError("Please type the " + type + "'s name as is appears on Twitch!");
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
        <div className="card blue-grey darken-1 center">
            <div className="card-content white-text">
            <p>Click the search buttons below to find games and streamers.</p>
            <br />
            <p>Click on the heart icon to follow them easier via the saved page!</p>
            </div>
        </div>
        <div className="row blue-grey darken-3" style={{marginTop: "20px", paddingBottom: "20px"}}>
            <button className="col m5 s5 btn" onClick={() => setDisplaySearch("streamer")} style={{fontSize: ".75em"}}>Search Streamer</button>
            <button className="col m5 s5 offset-s2 offset-m2 btn" onClick={() => setDisplaySearch("game")} style={{fontSize: ".75em"}}>Search Game</button>
            <br /><br /><div className="center">{(searchError === "") ? <span>{searchError}</span> : <span style={{color: "Red", fontSize: "1.5em"}}>{searchError}</span>}</div>
            {(displaySearch === "streamer") ? 
            
            <div className="col m6 s6">
                <UserSearchForm 
                    formType={"Streamer"}
                    submit={submit}
                    autoFocus         
                />
            </div>
            :
            <div className="col m6 s6">
                <UserSearchForm 
                    formType={"Game"}
                    submit={submit}
                    autofocus
                />
            </div>           
            }
             <div className="col m6 s6">
                  {(clipData) ? (clipData.streamerID) ? 
                <div className="center-align valign-center">
                    {/* <p>{clipData.streamerName}</p> */}
                    {/* <p>{clipData.streamerID}</p> */}
                    <img src={clipData.streamerImage} height="125" width="100" style={{marginTop: "25px"}} />
                    {(userData.streamers.some(streamer => streamer.id === clipData.streamerID)) ? 
                    <div className="row" style={{ marginTop: '10px'}}>
                        <button type="button" className="unheart btn" onClick={() => removeStreamerOrGame("streamer", clipData.streamerID)}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite</i></button>
                    </div>
                    :
                    <div className="row" style={{marginTop: '10px'}}>
                        <button type="button" className="heart btn" onClick={() => save("streamer")}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite_border</i></button>
                    </div>
                    }
                    {/* <ClipSlick clipData={clipData} /> */}
                </div>
                :
                <div className="center-align valign-center">
                    {/* <p>{clipData.gameName}</p> */}
                    {/* <p>{clipData.gameID}</p> */}
                    <img src={clipData.gameImage} height="125" width="100" style={{marginTop: "25px"}}></img>
                    {(userData.games.some(game => game.id === clipData.gameID)) ? 
                    <div className="row" style={{ marginTop: '10px'}}>
                        <button type="button" className="unheart btn" onClick={() => removeStreamerOrGame("game", clipData.gameID)}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite</i></button>
                    </div>
                    :
                    <div className="row" style={{ marginTop: '10px'}}>
                        <button type="button" className="heart btn" onClick={() => save("game")}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite_border</i></button>
                    </div>
                    }
                    {/* <ClipSlick clipData={clipData} /> */}
                </div>
                
                :
            <div></div>
            }

            </div>
        </div>
        <div className="row">
            <div className="col s12 m12">
                {clipData && (
                    <ClipSlick clipData={clipData} />
                )}
            </div>
        </div>
    </div>
    
    </div>)
    
    }

export default UserSearchPage