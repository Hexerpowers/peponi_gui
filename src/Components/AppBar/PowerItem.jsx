import React, {Component} from 'react';
import power_ico from "../../Assets/Img/AppBar/power/power_state_0.png";

class PowerItem extends Component {
    render() {
        return (
            <div className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={power_ico}/>
                <div className="img-toast-lower">
                    [Г]
                </div>
                <div className="appbar-description">Генер.</div>
            </div>
        );
    }
}

export default PowerItem;
