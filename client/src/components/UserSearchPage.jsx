import React from 'react';
import UserSearchForm from "./UserSearchForm";
import ClipSlick from "./ClipSlick";

function UserSearchPage () {
    
    return(<div>
    <div className="container">
        <h1>I am the UserSearchPage</h1>
        <div className="row">
            <div className="col m6">
                <UserSearchForm 
                    formType={"Streamer"}
                />
            </div>
            <div className="col m6">
                <UserSearchForm 
                    formType={"Game"}
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