import React, {Component} from 'react';
import charge_ico from "../../Assets/Img/AppBar/charge.png";
import Swal from "sweetalert2";

class BatteryItem extends Component {
    constructor(props) {
        super(props);
        this.openBattery = this.openBattery.bind(this)
        this.base_url = "http://"+localStorage.getItem('endp_addr')+":5052/api/v1/get/charge"
        this.state = {
            charge: "---",
            condition: "не известно"
        }
    }

    componentDidMount() {
        if (Number(localStorage.getItem('battery_op_time'))>6000){
            this.setState({condition:"отличное"})
        }
        if (Number(localStorage.getItem('battery_op_time'))>12000){
            this.setState({condition:"{хорошее}"})
        }
        if (Number(localStorage.getItem('battery_op_time'))>15000){
            this.setState({condition:"среднее"})
        }
        if (Number(localStorage.getItem('battery_op_time'))>20000){
            this.setState({condition:"требует замены"})
        }
        setInterval(() => {
            if (this.props.state){
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({charge: data['charge']})
                    });
            }else{
                this.setState({charge: "---"})
            }
        }, 10000)
        setInterval(() => {
            localStorage.setItem('battery_op_time', String(Number(localStorage.getItem('battery_op_time'))+1))
        }, 6000)
    }

    openBattery() {
        Swal.fire({
            title: '<strong>Батарея</strong>',
            width: '500px',
            position:'top-right',
            html:
                '<div class="abi-lnk-holder">'+
                '<div class="abi-lnk-line">Тип резервной батареи: <i>LiIon</i></div>'+
                '<div class="abi-lnk-line">Состояние: <i>'+this.state.condition+'</i></div>'+
                '<div class="abi-lnk-line">Уровень заряда: <i>'+this.state.charge+'</i></div>'+
                '<div class="abi-lnk-line">Время полёта на полной зарядке: <i>12 мин</i></div>'+
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openBattery} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon appbar-charge-icon" src={charge_ico} alt=""/>
                <div className="appbar-charge-value">
                    {this.state.charge}%
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
