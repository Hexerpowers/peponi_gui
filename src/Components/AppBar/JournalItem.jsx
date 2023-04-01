import React, {Component} from 'react';
import logs_ico from "../../Assets/Img/AppBar/logs.png";

class JournalItem extends Component {
    render() {
        return (
            <div className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={logs_ico}/>
                <div className="img-toast-lower">
                    [Ж]
                </div>
                <div className="appbar-description">Журнал</div>
            </div>
        );
    }
}

export default JournalItem;
