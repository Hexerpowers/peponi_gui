import React, {Component} from 'react';

import "../Assets/Styles/VideoStream.css"

class VideoStream extends Component {

    render() {
        return (
            <div className="vs-fullscreen">
                {/*<iframe className="vs-iframe" src="http://localhost:1984/stream.html?src=cam_input&mode=webrtc" />*/}
            </div>
        );
    }
}

export default VideoStream;
