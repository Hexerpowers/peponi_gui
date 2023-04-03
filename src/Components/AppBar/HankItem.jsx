import React, {Component} from 'react';
import coil_dst_ico from "../../Assets/Img/AppBar/hank/hank_extend_2.png";
import Swal from "sweetalert2";

class HankItem extends Component {
    constructor(props) {
        super(props);
        this.openHank = this.openHank.bind(this)
    }

    openHank() {
        Swal.fire({
            title: '<strong>Катушка</strong>',
            width: '500px',
            position: 'top-right',
            html:
                '<div class="abi-lnk-holder">' +
                '<div class="abi-lnk-line">Состояние: <i>Стабилизация натяжения</i></div>' +
                '<div class="abi-lnk-line">Наработка: <i>12 ч</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openHank} className="appbar-icon-item" style={{margin:"0 84px 0 0"}}>
                <div className="appbar-icon-flexrow">
                    <img draggable="false" className="appbar-img-icon" src={coil_dst_ico} alt=""/>
                    <div className="appbar-icon-textblock">
                        <div className="appbar-minitext">65 м</div>
                        <div className="appbar-minitext">1.23 кг</div>
                    </div>
                </div>
                <div className="img-toast-lower">
                    [К]
                </div>
                <div className="appbar-description" style={{margin:"0px 0 0 3px"}}>Катушка</div>
            </div>
        );
    }
}

export default HankItem;
