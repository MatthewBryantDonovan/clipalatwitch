import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import FollowSlick from "../components/FollowSlick";
import ClipSlick from "../components/ClipSlick";
import API from '../utils/API';

function UserSavedPage(props) {

    const [clipData, setClipData] = useState();
    const [clipDataType, setClipDataType] = useState();
    const [typeID, setTypeID] = useState();
    const [userData, setUserData] = useState();
    const [notAuthed, setNotAuthed] = useState(false);

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
        console.log(userData);
    }, [userData])

    useEffect(() => {
        console.log(clipData);
    }, [clipData])

    const viewClips = (type, id) => {
        setClipDataType(type);
        setTypeID(id);
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

    const favoriteClip = (id) => {
        console.log("entered favorite clip");

        const reqObj = {
            typeID: typeID,
            type: clipDataType,
            clipID: id
        }
        
        console.log(reqObj);
        
        API.saveClip(reqObj).then(function (data) {
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

    return (
    <div>
        {notAuthed && <Redirect to="/login" />}
        <div className="container" style={{textAlign: "center"}}>
            <div className="row" style={{marginTop: "10px"}}>
                <div className="col m12 s12">
                    {(userData) ?
                        (userData.streamers.length > 0) ?
                            <FollowSlick
                                data={userData.streamers}
                                type={"streamer"}
                                remove={removeStreamerOrGame}
                                view={viewClips}
                            />
                            :
                            <div className="blue-grey darken-3" style={{height: "155px", width: "100%", lineHeight: "11"}}><span>Use the search link to find games to follow.</span></div>
                        :
                        <div></div>
                    }

                </div>
            </div>
            <div className="row">
                <div className="col m12 s12">
                    {(clipData) ? <ClipSlick clipData={clipData} favoriteClip={favoriteClip} type={clipDataType} userData={userData}/> : <div style={ {height: "205px"}}></div>}
                </div>
            </div>
            <div className="row">
                <div className="col m12 s12">
                    {(userData) ?
                        (userData.games.length > 0) ?
                            <FollowSlick
                                data={userData.games}
                                type={"game"}
                                remove={removeStreamerOrGame}
                                view={viewClips}
                            />
                            :
                            <div className="blue-grey darken-3" style={{height: "155px", lineHeight: "11"}}><span>Use the search link to find games to follow.</span></div>
                        :
                        <div></div>
                    }

                </div>
            </div>
        </div>

    </div>)

}

export default UserSavedPage