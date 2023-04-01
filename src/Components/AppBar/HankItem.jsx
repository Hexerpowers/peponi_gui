import React, {Component} from 'react';
import coil_dst_ico from "../../Assets/Img/AppBar/hank/hank_extend_2.png";

class HankItem extends Component {
    render() {
        return (
            <div className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={coil_dst_ico}/>
                <div className="img-toast-lower">
                    [К]
                </div>
                <div className="appbar-description">Катушка</div>
            </div>
        );
    }
}

export default HankItem;
