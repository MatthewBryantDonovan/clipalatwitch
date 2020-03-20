import React, { useState, useEffect } from 'react';
import FollowSlick from "../components/FollowSlick";
import ClipSlick from "../components/ClipSlick";
import API from '../utils/API';

function UserSavedPage() {

    const [clipData, setClipData] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        if (!userData) {
            API.userSavedInfo().then(function (data) {
                console.log(data);
                setUserData(data.data)
            }).catch(function (err) {
                console.log(err);
            });
        }
        console.log(userData);
    }, [userData])

    useEffect(() => {
        console.log(clipData);
    }, [clipData])

    const viewClips = (type, id) => {
        API.viewClips(type, id).then(function (data) {
            console.log(data);
            setClipData(data.data);
        }).catch(function (err) {
            console.log(err);
        });
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

    return (<div>
        <div className="container">
            <div className="row">
                <div className="col m12">
                    {(userData) ? (
                        <FollowSlick
                            data={userData.streamers}
                            type={"streamer"}
                            remove={removeStreamerOrGame}
                            view={viewClips}
                        />
                    ) : <div></div>}

                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    {(clipData) ? <ClipSlick clipData={clipData} /> : <div style={ {height: "205px"}}></div>}
                </div>
            </div>
            <div className="row">
                <div className="col m12">
                    {(userData) ? (
                        <FollowSlick
                            data={userData.games}
                            type={"game"}
                            remove={removeStreamerOrGame}
                            view={viewClips}
                        />) : <div></div>}

                </div>
            </div>
        </div>

    </div>)

}

export default UserSavedPage