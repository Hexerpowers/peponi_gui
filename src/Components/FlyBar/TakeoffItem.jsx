import React, {Component} from 'react';
import takeoff_ico from "../../Assets/Img/FlyBar/takeoff.png";
import Swal from "sweetalert2";

class TakeoffItem extends Component {
    constructor(props) {
        super(props);
        this.toggleTakeoff = this.toggleTakeoff.bind(this)
        this.showPreTakeoffMessage = this.showPreTakeoffMessage.bind(this)
        this.hidePreTakeoffMessage = this.hidePreTakeoffMessage.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.pre_takeoff = false
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        this.state = {
            active: '',
            indicator: 'inactive'
        }
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/takeoff"
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

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'fb-icon-active'
            if ((nextProps.power_good || localStorage.getItem('power_onboard') === 'true') && (nextProps.status === 1 || nextProps.status === 8)) {
                indicator = 'active'
            } else {
                indicator = 'disabled'
            }
        } else {
            active = ''
            indicator = 'inactive'
        }

        return {
            active: active,
            indicator: indicator
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyD') {
                self.toggleTakeoff()
            }
        });
    }


    showPreTakeoffMessage(timeout) {
        let msg = document.querySelector('#takeoff-message')
        msg.innerHTML = "Нажмите ещё раз в течение (" + timeout + ") секунд для ВЗЛЁТА"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreTakeoffMessage() {
        let msg = document.querySelector('#takeoff-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleTakeoff() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (!this.props.power_good && localStorage.getItem('power_onboard') !== 'true') {
            this.toast.fire({
                icon: 'error',
                title: 'Не выдано питание на коптер'
            })
            return
        }
        if (this.props.status !== 1 && this.props.status !== 8) {
            this.toast.fire({
                icon: 'error',
                title: 'Коптер уже в полёте или не готов к полёту'
            })
            return
        }
        if (this.pre_takeoff) {
            this.hidePreTakeoffMessage()
            this.pre_takeoff = false
            fetch(this.base_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на взлёт отправлена'
                        })
                    }
                });
        } else {
            this.showPreTakeoffMessage(3)
            this.pre_takeoff = true
            if (this.pre_takeoff) {
                setTimeout(() => {
                    this.showPreTakeoffMessage(2);
                    if (this.pre_takeoff) {
                        setTimeout(() => {
                            this.showPreTakeoffMessage(1);
                            if (this.pre_takeoff) {
                                setTimeout(() => {
                                    this.hidePreTakeoffMessage()
                                    this.pre_takeoff = false
                                }, 1000)
                            } else {
                                this.hidePreTakeoffMessage()
                                this.pre_takeoff = false
                            }
                        }, 1000)
                    } else {
                        this.hidePreTakeoffMessage()
                        this.pre_takeoff = false
                    }
                }, 1000)
            } else {
                this.hidePreTakeoffMessage()
                this.pre_takeoff = false
            }
        }
    }

    render() {
        let active = 'fb-icon-item ' + this.state.active
        let indicator = 'fb-indicator-' + this.state.indicator
        return (
            <div>
                <div onClick={this.toggleTakeoff} className={active}>
                    <img draggable="false" className="flybar-img-icon" src={takeoff_ico} alt=""/>
                    <div className={indicator}/>
                    <div className="img-toast-lower">
                        [В]
                    </div>
                    <div className="img-toast-lower hidden">
                        [Взлёт]
                    </div>
                </div>
                <div id="takeoff-message" className="flybar-takeoff-message hidden">
                </div>
            </div>
        );
    }
}

export default TakeoffItem;
