import React, {Component} from 'react';
import signal_ico from "../../Assets/Img/AppBar/signal/signal_3.png";

class LinkItem extends Component {
    render() {
        return (
            <div className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={signal_ico}/>
                <div className="appbar-ping-value">
                    3ms
                </div>
                <div className="img-toast-lower">
                    [С]
                </div>
                <div className="appbar-description">Связь</div>
            </div>
        );
    }
}

export default LinkItem;
