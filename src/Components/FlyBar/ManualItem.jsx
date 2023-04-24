import React, {Component} from 'react';

import manual_icon from "../../Assets/Img/FlyBar/manual.png";
import manual_help from "../../Assets/Img/FlyBar/manual_help.png"
import Swal from "sweetalert2";

class ManualItem extends Component {
    constructor(props) {
        super(props);
        this.toggleManual = this.toggleManual.bind(this)
        this.showPreManualMessage = this.showPreManualMessage.bind(this)
        this.hidePreManualMessage = this.hidePreManualMessage.bind(this)
        this.pre_manual = false
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
            enabled: false,
            active: '',
            indicator: 'inactive'
        }
        this.aux_url = "http://127.0.0.1:5053/api/v1/trig/manual"
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'fb-item-active'
            if (nextProps.status === 2 || nextProps.status === 3 || nextProps.status === 4 || nextProps.status === 9) {
                if (prevState.enabled) {
                    indicator = 'enabled'
                } else {
                    indicator = 'active'
                }
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
            if (e.code === 'KeyH') {
                self.toggleManual()
            }
        });
    }


    showPreManualMessage(timeout) {
        let msg = document.querySelector('#manual-message')
        if (this.state.enabled) {
            msg.innerHTML = "Нажмите ещё раз для выключения ручного режима в течение (" + timeout + ") секунд"
        } else {
            msg.innerHTML = "Нажмите ещё раз для включения ручного режима в течение (" + timeout + ") секунд"

        }
        msg.className = 'fb-alert-message'
    }

    hidePreManualMessage() {
        let msg = document.querySelector('#manual-message')
        msg.innerHTML = ""
        msg.className = 'fb-alert-message hidden'
    }

    toggleManual() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }

        if (this.props.status !== 2 && this.props.status !== 3 && this.props.status !== 4 && this.props.status !== 9) {
            this.toast.fire({
                icon: 'error',
                title: 'Коптер ещё не в полёте или не готов к полёту'
            })
            return
        }

        if (this.pre_manual) {
            this.hidePreManualMessage()
            this.pre_manual = false
            fetch(this.aux_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.setState({enabled: !this.state.enabled})
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на переключение ручного режима отправлена'
                        })
                    }
                });
        } else {
            this.showPreManualMessage(3)
            this.pre_manual = true
            if (this.pre_manual) {
                setTimeout(() => {
                    this.showPreManualMessage(2);
                    if (this.pre_manual) {
                        setTimeout(() => {
                            this.showPreManualMessage(1);
                            if (this.pre_manual) {
                                setTimeout(() => {
                                    this.hidePreManualMessage()
                                    this.pre_manual = false
                                }, 1000)
                            } else {
                                this.hidePreManualMessage()
                                this.pre_manual = false
                            }
                        }, 1000)
                    } else {
                        this.hidePreManualMessage()
                        this.pre_manual = false
                    }
                }, 1000)
            } else {
                this.hidePreManualMessage()
                this.pre_manual = false
            }
        }
    }

    render() {
        let active = 'fb-item ' + this.state.active
        let indicator = 'fb-indicator-' + this.state.indicator
        let help = 'fb-manual-help hidden'
        if (this.state.indicator === 'enabled'){
            help = 'fb-manual-help'
        }
        return (
            <div>
                <div onClick={this.toggleManual} className={active}>
                    <img draggable="false" className="fb-item-icon" src={manual_icon}/>
                    <div className={indicator}/>
                    <div className="item-toast">
                        [Р]
                    </div>
                    <div className="item-toast hidden">
                        [Ручной]
                    </div>
                </div>
                <div id="manual-message" className="fb-alert-message hidden"></div>
                <div id="manual-help" className={help}>
                    <img draggable="false" className="fb-manual-help-img" src={manual_help}/>
                </div>
            </div>
        );
    }
}

export default ManualItem;

