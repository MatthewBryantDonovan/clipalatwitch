import React from 'react';
import FollowSlick from "./FollowSlick";
import ClipSlick from "./ClipSlick";

function UserSavedPage() {

    return(<div>
        <div className="container">
            <h1>I am the UserSavedPage</h1>
            <div className="row">
                <div className="col m12">
                    <FollowSlick 
                        formType={"Streamer"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    <ClipSlick />
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    <FollowSlick 
                        formType={"Game"}
                    />
                </div>
            </div>
        </div>
        
        </div>)
    
}

export default UserSavedPage