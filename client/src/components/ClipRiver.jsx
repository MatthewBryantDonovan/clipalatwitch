import React from 'react';
import "../index.css";

function ClipRiver(props) {
    return(
    <div className="row center">
        { props.riverData.map((clipData, index) => (
            <span id={clipData._id} key={index}>
                { (index%2 === 0) ?
                <div className="col s12 m12 l5 xl4 card blue-grey darken-4 center">
                    <div style={{height: "60px", lineHeight: "4"}}>
                        {(clipData.clutchType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.clutchType !== 0) ? <span>Clutch </span> : <span></span>}
                        {(clipData.comboType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.comboType !== 0) ? <span> Combo </span> : <span></span>}
                        {(clipData.failType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.failType !== 0) ? <span> Fail </span> : <span></span>}
                        {(clipData.funnyType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.funnyType !== 0) ? <span> Funny </span> : <span></span>}
                        {(clipData.hypeType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.hypeType !== 0) ? <span> Hype</span> : <span></span>}
                        {((Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) !== 0) ? <span> Moment!</span> : <span> Untagged <i className="material-icons" style={{ color: '#1e88e5', position: "relative", top: "6px"}} >sentiment_very_dissatisfied</i></span>}
                    </div>
                    <iframe height="187.2px" width="260px" className allowFullScreen
                        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%;background: black}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;z-index: 1}p{position:absolute;width:100%;top:0%;margin:auto}.bottom-bar{position:absolute;width:100%;bottom:0%;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}p,.bottom-bar{height:1.5em;text-align:center;font:12px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black;background: black;line-height:1.45;}</style><a href=${clipData.url + "&autoplay=false"}><img src=${clipData.thumbnail} alt=${clipData.title}><p>${clipData.title}</p><span>▶</span><div class="bottom-bar"></div></a>`}
                    ></iframe>
                    { 
                    (props.userData) ? 
                        (clipData.typedUsers.indexOf(props.userData._id) === -1) ?
                        <div style={{height: "60px", lineHeight: "3.5"}}>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("clutchType", clipData._id)}>Clutch!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("comboType", clipData._id)}>Combo!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("failType", clipData._id)}>Fail!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("funnyType", clipData._id)}>Funny!</button>
                            <button className="btn-small" style={{padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("hypeType", clipData._id)}>Hype!</button>
                        </div>
                        :
                        <div style={{height: "60px", lineHeight: "3.5"}}> <span>You tagged it!</span></div>
                    :
                    <span></span>
                    }
                </div>
                :
                <div id={clipData._id}  key={index} className="col s12 m12 offset-l2 l5 xl4  card blue-grey darken-4 center">
                    <div style={{height: "60px", lineHeight: "4"}}>
                        {(clipData.clutchType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.clutchType !== 0) ? <span>Clutch </span> : <span></span>}
                        {(clipData.comboType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.comboType !== 0) ? <span> Combo </span> : <span></span>}
                        {(clipData.failType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.failType !== 0) ? <span> Fail </span> : <span></span>}
                        {(clipData.funnyType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.funnyType !== 0) ? <span> Funny </span> : <span></span>}
                        {(clipData.hypeType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.hypeType !== 0) ? <span> Hype</span> : <span></span>}
                        {((Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) !== 0) ? <span> Moment!</span> : <span> Untagged <i className="material-icons" style={{ color: '#1e88e5', position: "relative", top: "6px"}} >sentiment_very_dissatisfied</i></span>}
                    </div>
                    <iframe height="187.2px" width="260px" allowFullScreen
                        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%;background: black}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;z-index: 1}p{position:absolute;width:100%;top:0%;margin:auto}.bottom-bar{position:absolute;width:100%;bottom:0%;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}p,.bottom-bar{height:1.5em;text-align:center;font:12px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black;background: black;line-height:1.45;}</style><a href=${clipData.url + "&autoplay=false"}><img src=${clipData.thumbnail} alt=${clipData.title}><p>${clipData.title}</p><span>▶</span><div class="bottom-bar"></div></a>`}
                    ></iframe>
                    { 
                    (props.userData) ? 
                        (clipData.typedUsers.indexOf(props.userData._id) === -1) ?
                        <div style={{height: "60px", lineHeight: "3.5"}}>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("clutchType", clipData._id)}>Clutch!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("comboType", clipData._id)}>Combo!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("failType", clipData._id)}>Fail!</button>
                            <button className="btn-small" style={{marginRight: "4px", padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("funnyType", clipData._id)}>Funny!</button>
                            <button className="btn-small" style={{padding: "2px", paddingTop: "0"}} onClick={() => props.clipType("hypeType", clipData._id)}>Hype!</button>
                        </div>
                        :
                        <div style={{height: "60px", lineHeight: "3.5"}}> <span>You tagged it!</span></div>
                    :
                    <span></span>
                    }
                </div>
                }
            </span>
        ))
        }
    </div>
    );
    
}

export default ClipRiver;