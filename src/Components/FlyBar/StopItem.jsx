import React, {Component} from 'react';
import stop_ico from "../../Assets/Img/FlyBar/stop.png";
import Swal from "sweetalert2";

class StopItem extends Component {
    constructor(props) {
        super(props);
        this.toggleStop = this.toggleStop.bind(this)
        this.showPreStopMessage = this.showPreStopMessage.bind(this)
        this.hidePreStopMessage = this.hidePreStopMessage.bind(this)
        this.pre_stop = false
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
        this.base_url = "http://"+localStorage.getItem('endpoint_address')+":5052/api/v1/trig/stop"
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
            if(e.keyCode === 32){
                self.toggleStop()
            }
        });
    }


    showPreStopMessage(timeout) {
        let msg = document.querySelector('#stop-message')
        msg.innerHTML = "Нажмите ещё раз в течение ("+timeout+") секунд ДЛЯ ЭКСТРЕННОЙ ОСТАНОВКИ"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreStopMessage(){
        let msg = document.querySelector('#stop-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleStop() {
        if (!this.props.link){
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (this.pre_stop){
            this.hidePreStopMessage()
            this.pre_stop = false
            fetch(this.base_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на остановку отправлена'
                        })
                    }
                });
        }else{
            this.showPreStopMessage(3)
            this.pre_stop = true
            if(this.pre_stop) {
                setTimeout(() => {
                    this.showPreStopMessage(2);
                    if(this.pre_stop) {
                        setTimeout(() => {
                            this.showPreStopMessage(1);
                            if(this.pre_stop) {
                                setTimeout(() => {
                                    this.hidePreStopMessage()
                                    this.pre_stop = false
                                }, 1000)
                            }else{
                                this.hidePreStopMessage()
                                this.pre_stop = false
                            }
                        }, 1000)
                    }else{
                        this.hidePreStopMessage()
                        this.pre_stop = false
                    }
                }, 1000)
            }else{
                this.hidePreStopMessage()
                this.pre_stop = false
            }
        }
    }

    render() {
        return (
            <div>
                <div onClick={this.toggleStop} className="fb-icon-item">
                    <img draggable="false" className="flybar-img-icon" src={stop_ico} alt=""/>
                    <div className="fb-indicator-inactive"/>
                    <div className="img-toast-lower">
                        [_]
                    </div>
                    <div className="img-toast-lower hidden">
                        [Стоп]
                    </div>
                    {/*<div className="flybar-description">Стоп</div>*/}
                </div>
                <div id="stop-message" className="flybar-takeoff-message hidden"></div>
            </div>
        );
    }
}

export default StopItem;
