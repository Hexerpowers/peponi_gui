import React, {Component} from 'react';
import power_ico_0 from "../../Assets/Img/AppBar/power/power_state_0.png";
import power_ico_1 from "../../Assets/Img/AppBar/power/power_state_1.png";
import power_ico_2 from "../../Assets/Img/AppBar/power/power_state_2.png";
import Swal from "sweetalert2";

class PowerItem extends Component {
    constructor(props) {
        super(props);
        this.openPower = this.openPower.bind(this)
        this.base_url = "http://127.0.0.1:5053/api/v1/get/power"
        this.state = {
            gen_status: "не запущен",
            out_status: "не выдано",
            icon: power_ico_0,
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
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        switch (data['state']) {
                            case 1:
                                this.setState({gen_status: "запущен"})
                                this.setState({out_status: "не выдано"})
                                this.setState({icon: power_ico_1})
                                this.props.elevate(false)
                                break
                            case 2:
                                this.setState({gen_status: "запущен"})
                                this.setState({out_status: "выдано"})
                                this.setState({icon: power_ico_2})
                                this.props.elevate(true)
                                break
                            default:
                                this.setState({gen_status: "не запущен"})
                                this.setState({out_status: "не выдано"})
                                this.setState({icon: power_ico_0})
                                this.props.elevate(false)
                                break
                        }
                        this.setState({voltage: data['voltage']})
                        this.setState({current_0: data['current_0']})
                        this.setState({current_1: data['current_1']})
                        if (Number(data['current_0']) < Number(data['current_1'])) {
                            this.toast.fire({
                                icon: 'error',
                                title: 'Неполадки в НБП, осуществите посадку!'
                            })
                        }
                    });
            } else {
                this.setState({gen_status: "не запущен"})
                this.setState({out_status: "не выдано"})
                this.setState({icon: power_ico_0})
                this.setState({voltage: 0})
                this.setState({current_0: 0})
                this.setState({current_1: 0})
                this.props.elevate(false)
            }
        }, 1000)
    }


    openPower() {
        Swal.fire({
            title: '<strong>Генератор</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Состояние: <i>' + this.state.gen_status + '</i></div>' +
                '<div class="ab-popup-link-line">Питание на коптер: <i>' + this.state.out_status + '</i></div>' +
                '<div class="ab-popup-link-line">Напряжение питания: <i>' + this.state.voltage + ' В</i></div>' +
                '<div class="ab-popup-link-line">Ток (через НБП): <i>' + this.state.current_0 + ' А</i></div>' +
                '<div class="ab-popup-link-line">Ток (через АКБ): <i>' + this.state.current_1 + ' А</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openPower} className="ab-item">
                <img draggable="false" className="ab-item-icon" src={this.state.icon} alt=""/>
                <div className="item-toast">
                    [Г]
                </div>
                <div className="ab-item-description">Генер.</div>
            </div>
        );
    }
}

export default PowerItem;
