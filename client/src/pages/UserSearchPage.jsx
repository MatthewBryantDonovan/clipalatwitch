import React, { useState, useEffect } from 'react';
import UserSearchForm from "../components/UserSearchForm";
import ClipSlick from "../components/ClipSlick";
import API from "../utils/API"

function UserSearchPage () {
    const [clipData, setClipData] = useState()

      useEffect(() => {
        console.log(clipData);
      }, [clipData])


    const submit = (type, name) => {

        if (type === "Streamer"){
            API.findStreamer(name).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                console.log(err);
            });
        } else if (type === "Game"){
            API.findGame(name).then(function(data){
                console.log(data);
                setClipData(data.data)
            }).catch(function(err){
                console.log(err);
            });
        }
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
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    
    return(
    <div>
    <div className="container">
        <p>I am the UserSearchPage</p>
        <div className="row">
            <div className="col m6">
                <UserSearchForm 
                    formType={"Streamer"}
                    submit={submit}
                />
            </div>
            <div className="col m6">
                <UserSearchForm 
                    formType={"Game"}
                    submit={submit}
                />
            </div>
        </div>
        <div className="row">
            {(clipData) ? (clipData.streamerID) ? 
                <div>
                    <p>{clipData.streamerName}</p>
                    <p>{clipData.streamerID}</p>
                    <img src={clipData.streamerImage}></img>
                    <button type="button" className="btn" onClick={() => save("streamer")}><i className="material-icons" style={{color: '#008080'}}>favorite</i></button>
                </div>
                :
                <div>
                    <p>{clipData.gameName}</p>
                    <p>{clipData.gameID}</p>
                    <img src={clipData.gameImage}></img>
                    <button type="button" className="btn" onClick={() => save("game")}><i className="material-icons" style={{color: '#008080'}}>favorite</i></button>
                </div>
                :
            <div></div>
            }

            <ClipSlick clipData={clipData} />
            
        </div>
    </div>
    
    </div>)
    
    }

export default UserSearchPage