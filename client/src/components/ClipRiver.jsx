import React from 'react';

function ClipRiver(props) {
    return(<div>
        { props.riverData.map((clipData, index) => (
            <div id={clipData._id}  key={index}>
                <div>
                    {(clipData.clutchType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.clutchType !== 0) ? <span> clutchType </span> : <span></span>}
                    {(clipData.comboType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.comboType !== 0) ? <span> comboType </span> : <span></span>}
                    {(clipData.failType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.failType !== 0) ? <span> failType </span> : <span></span>}
                    {(clipData.funnyType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.funnyType !== 0) ? <span> funnyType </span> : <span></span>}
                    {(clipData.hypeType === (Math.max(clipData.clutchType,clipData.comboType,clipData.failType,clipData.funnyType,clipData.hypeType)) && clipData.hypeType !== 0) ? <span> hypeType </span> : <span></span>}
                </div>
                <iframe src={clipData.url + "&autoplay=false"} height="500" width="500" allowFullScreen></iframe>
                { 
                (props.userData) ? 
                    (clipData.typedUsers.indexOf(props.userData._id) === -1) ?
                    <div>
                        <button onClick={() => props.clipType("clutchType", clipData._id)}>clutchType</button>
                        <button onClick={() => props.clipType("comboType", clipData._id)}>comboType</button>
                        <button onClick={() => props.clipType("failType", clipData._id)}>failType</button>
                        <button onClick={() => props.clipType("funnyType", clipData._id)}>funnyType</button>
                        <button onClick={() => props.clipType("hypeType", clipData._id)}>hypeType</button>
                    </div>
                    :
                    <div> <p>You tagged it!</p></div>
                :
                <span></span>
                }
            </div>
        ))
        }
    </div>)
    
}

export default ClipRiver