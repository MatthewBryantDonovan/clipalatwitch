import React from 'react';
import UserSearchForm from "../components/UserSearchForm";
import ClipSlick from "../components/ClipSlick";
import API from "../utils/API"

function UserSearchPage () {

    const submit = (type, name) => {

        if (type === "Streamer"){
            API.findStreamer(name).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            });
        } else if (type === "Game"){
            API.findGame(name).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    
    return(<div>
    <div className="container">
        <h1>I am the UserSearchPage</h1>
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
            <ClipSlick />
        </div>
    </div>
    
    </div>)
    
    }

export default UserSearchPage