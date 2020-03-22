import React from 'react';

function ClipRiver(props) {
    return(<div>
        { props.riverData.map((clipData, index) => (
            <div id={clipData._id}  key={index}>
                <iframe src={clipData.url + "&autoplay=false"} height="500" width="500" allowFullScreen></iframe>
            </div>
        ))
        }
    </div>)
    
}

export default ClipRiver