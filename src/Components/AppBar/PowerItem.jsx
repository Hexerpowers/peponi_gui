import React, {Component} from 'react';
import power_ico_0 from "../../Assets/Img/AppBar/power/power_state_0.png";
import power_ico_1 from "../../Assets/Img/AppBar/power/power_state_1.png";

import power_ico_0_dark from "../../Assets/Img/AppBar/power/power_state_0_dark.png";
import power_ico_1_dark from "../../Assets/Img/AppBar/power/power_state_1_dark.png";

import power_ico_2 from "../../Assets/Img/AppBar/power/power_state_2.png";
import Swal from "sweetalert2";

class PowerItem extends Component {
    constructor(props) {
        super(props);
        this.openPower = this.openPower.bind(this)
        this.base_url = "http://127.0.0.1:5053/api/v1/get/power"
        this.opened = false
        this.state = {
            gen_status: "не готов",
            out_status: "не выдано",
            icon: localStorage.getItem('theme')==='0' ? power_ico_0 : power_ico_0_dark,
            voltage: 0,
            current_0: 0,
            current_1: 0
        }
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
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
            if (e.code === 'KeyU') {
                self.openPower()
            }
        });
        setInterval(() => {
            if (this.props.link) {
                if (localStorage.getItem('power_onboard') !== 'true') {
                    fetch(this.base_url)
                        .then(response => response.json())
                        .then(data => {
                            switch (data['state']) {
                                case 1:
                                    this.setState({gen_status: "готов"})
                                    this.setState({out_status: "не выдано"})
                                    this.setState({icon: localStorage.getItem('theme') === '0' ? power_ico_1 : power_ico_1_dark,})
                                    this.props.elevate(false)
                                    break
                                case 2:
                                    this.setState({gen_status: "готов"})
                                    this.setState({out_status: "выдано"})
                                    this.setState({icon: power_ico_2})
                                    this.props.elevate(true)
                                    break
                                default:
                                    this.setState({gen_status: "не запущен"})
                                    this.setState({out_status: "не выдано"})
                                    this.setState({icon: localStorage.getItem('theme') === '0' ? power_ico_0 : power_ico_0_dark,})
                                    this.props.elevate(false)
                                    break
                            }
                            this.setState({voltage: data['voltage']})
                            this.setState({current_0: data['current_0']})
                            this.setState({current_1: data['current_1']})
                            if (this.props.status !== 0 && this.props.status !== 1) {
                                if ((Number(data['current_0']) < Number(data['current_1']) && Number(data['current_1']) > 1) && localStorage.getItem('power_onboard') !== 'true' && localStorage.getItem('block_aggressive_popups') !== '1') {
                                    this.toast.fire({
                                        icon: 'error',
                                        title: 'Неполадки в НБП, осуществите посадку!'
                                    })
                                }
                            }
                        });
                }else {
                    this.setState({gen_status: "готов"})
                    this.setState({out_status: "выдано"})
                    this.setState({icon: power_ico_2})
                    this.setState({voltage: '48'})
                    this.setState({current_0: '20'})
                    this.setState({current_1: '0'})
                }
            } else {
                this.setState({gen_status: "не запущен"})
                this.setState({out_status: "не выдано"})
                this.setState({icon: localStorage.getItem('theme')==='0' ? power_ico_0 : power_ico_0_dark,})
                this.setState({voltage: 0})
                this.setState({current_0: 0})
                this.setState({current_1: 0})
                this.props.elevate(false)
            }
            if (localStorage.getItem('triggered_power') === '1'){
                document.getElementById('ab-popup-power-status').innerText = this.state.gen_status
                document.getElementById('ab-popup-power-ok').innerText = this.state.out_status
                document.getElementById('ab-popup-power-voltage').innerText = this.state.voltage+ ' В'
                document.getElementById('ab-popup-power-current_0').innerText = this.state.current_0+ ' А'
                document.getElementById('ab-popup-power-current_1').innerText = this.state.current_1+ ' А'
            }
        }, 700)
    }


    openPower() {
        localStorage.setItem('block_aggressive_popups', '1')
        localStorage.setItem('triggered_power', "1")
        Swal.fire({
            title: '<strong>Генератор</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Состояние: <i id="ab-popup-power-status">' + this.state.gen_status + '</i></div>' +
                '<div class="ab-popup-link-line">Питание на коптер: <i id="ab-popup-power-ok">' + this.state.out_status + '</i></div>' +
                '<div class="ab-popup-link-line">Напряжение питания: <i id="ab-popup-power-voltage">' + this.state.voltage + ' В</i></div>' +
                '<div class="ab-popup-link-line">Ток (через НБП): <i id="ab-popup-power-current_0">' + this.state.current_0 + ' А</i></div>' +
                '<div class="ab-popup-link-line">Ток (через АкБ): <i id="ab-popup-power-current_1">' + this.state.current_1 + ' А</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            localStorage.setItem('triggered_power', "0")
            localStorage.setItem('block_aggressive_popups', '0')
        })
    }

    render() {
        let inverted = 'ab-item-icon'
        if (localStorage.getItem('theme')!=='0' && this.state.out_status === "выдано") {
            inverted = 'ab-item-icon ab-item-icon-inverted'
        }
        return (
            <div onClick={this.openPower} className="ab-item">
                <img draggable="false" className={inverted} src={this.state.icon} alt=""/>
                <div className="item-toast">
                    [Г]
                </div>
                <div className="ab-item-description">Генер.</div>
            </div>
        );
    }
}

export default PowerItem;
