import React, {Component} from 'react';
import power_ico from "../../Assets/Img/AppBar/power/power_state_0.png";
import Swal from "sweetalert2";

class PowerItem extends Component {
    constructor(props) {
        super(props);
        this.openPower = this.openPower.bind(this)
    }

    openPower() {
        Swal.fire({
            title: '<strong>Генератор</strong>',
            width: '500px',
            position:'top-right',
            html:
                '<div class="abi-lnk-holder">'+
                '<div class="abi-lnk-line">Состояние: <i>Запущен</i></div>'+
                '<div class="abi-lnk-line">Питание на коптере: <i>Выдано</i></div>'+
                '<div class="abi-lnk-line">Напряжение: <i>24.2 В</i></div>'+
                '<div class="abi-lnk-line">Ток: <i>100 А</i></div>'+
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this.toast.fire({
                    icon: 'success',
                    title: 'Настройки синхронизированы'
                })
            }
        })
    }

    render() {
        return (
            <div onClick={this.openPower} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={power_ico} alt=""/>
                <div className="img-toast-lower">
                    [Г]
                </div>
                <div className="appbar-description">Генер.</div>
            </div>
        );
    }
}

export default PowerItem;
