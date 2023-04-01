import React, {Component} from 'react';
import charge_ico from "../../Assets/Img/AppBar/charge.png";

class BatteryItem extends Component {
    render() {
        return (
            <div className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon appbar-charge-icon" src={charge_ico}/>
                <div className="appbar-charge-value">
                    98%
                </div>
                <div className="img-toast-lower">
                    [З]
                </div>
                <div className="appbar-description">Заряд</div>
            </div>
        );
    }
}

export default BatteryItem;
