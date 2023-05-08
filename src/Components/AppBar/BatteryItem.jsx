import React, {Component} from 'react';
import charge_ico from "../../Assets/Img/AppBar/charge.png";
import Swal from "sweetalert2";

class BatteryItem extends Component {
    constructor(props) {
        super(props);
        this.openBattery = this.openBattery.bind(this)
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/charge"
        this.state = {
            charge: "---",
            condition: "не известно"
        }
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }

    addEvent(element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, callback);
        } else {
            element["on" + eventName] = callback;
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyP') {
                self.openBattery()
            }
        });
        setInterval(() => {
            this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/charge"
            if (this.props.link) {
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({charge: data['charge']})
                        if (this.props.status !== 0) {
                            if (Number(data['charge'])<=40){
                                this.toast.fire({
                                    icon: 'error',
                                    title: 'Низкий уровень напряжения, осуществите посадку!'
                                })
                            }
                        }
                        this.setState({condition: "отличное"})

                        if (Math.round(Number(localStorage.getItem('battery_op_time'))/60) > 200) {
                            this.setState({condition: "хорошее"})
                        }
                        if (Math.round(Number(localStorage.getItem('battery_op_time'))/60) > 300) {
                            this.setState({condition: "среднее"})
                        }
                        if (Math.round(Number(localStorage.getItem('battery_op_time'))/60) > 500) {
                            this.setState({condition: "требует замены"})
                        }

                    });
            } else {
                this.setState({charge: "---"})
                this.setState({condition: "не известно"})
            }
            if (localStorage.getItem('triggered_battery') === '1'){
                document.getElementById('ab-popup-battery-charge').innerText = this.state.charge + ' %'
            }
        }, 2000)
        setInterval(() => {
            localStorage.setItem('battery_op_time', String(Number(localStorage.getItem('battery_op_time')) + 1))
        }, 60000)
    }

    openBattery() {
        localStorage.setItem('triggered_battery', "1")
        Swal.fire({
            title: '<strong>Батарея</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Тип резервной батареи: <i>Литий-ионная</i></div>' +
                // '<div class="ab-popup-link-line">Наработка: <i>' + Math.round(Number(localStorage.getItem('battery_op_time'))/60) + ' ч.</i></div>' +
                '<div class="ab-popup-link-line">Состояние: <i>' + this.state.condition + '</i></div>' +
                '<div class="ab-popup-link-line">Уровень заряда: <i id="ab-popup-battery-charge">' + this.state.charge + ' %</i></div>' +
                '<div class="ab-popup-link-line">Время полёта на полном заряде: <i>12 мин</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            localStorage.setItem('triggered_battery', "0")
        })
    }

    render() {
        return (
            <div onClick={this.openBattery} className="ab-item">
                <img draggable="false" className="ab-item-icon ab-item-icon-charge" src={charge_ico} alt=""/>
                <div className="ab-charge-val">
                    {this.state.charge}%
                </div>
                <div className="item-toast">
                    [З]
                </div>
                <div className="ab-item-description">Заряд</div>
            </div>
        );
    }
}

export default BatteryItem;
