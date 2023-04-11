import React, {Component} from 'react';

import manual_ico_0 from "../../Assets/Img/FlyBar/manual.png";
import manual_ico_1 from "../../Assets/Img/FlyBar/manual_active.png";
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
            icon: manual_ico_0
        }
        this.aux_url = "http://127.0.0.1:5053/api/v1/trig/manual"
    }

    showPreManualMessage(timeout) {
        let msg = document.querySelector('#manual-message')
        if (this.state.enabled){
            msg.innerHTML = "Нажмите ещё раз для выключения ручного режима в течение ("+timeout+") секунд"
        }else {
            msg.innerHTML = "Нажмите ещё раз для включения ручного режима в течение ("+timeout+") секунд"

        }
        msg.className = 'flybar-takeoff-message'
    }

    hidePreManualMessage(){
        let msg = document.querySelector('#manual-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleManual() {
        if (!this.props.link){
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (this.pre_manual){
            this.hidePreManualMessage()
            this.pre_manual = false
            fetch(this.aux_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.setState({enabled: !this.state.enabled})
                        if (this.state.enabled){
                            this.setState({icon:manual_ico_1})
                        }else {
                            this.setState({icon:manual_ico_0})
                        }
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на переключение ручного режима отправлена'
                        })
                    }
                });
        }else{
            this.showPreManualMessage(3)
            this.pre_manual = true
            if(this.pre_manual) {
                setTimeout(() => {
                    this.showPreManualMessage(2);
                    if(this.pre_manual) {
                        setTimeout(() => {
                            this.showPreManualMessage(1);
                            if(this.pre_manual) {
                                setTimeout(() => {
                                    this.hidePreManualMessage()
                                    this.pre_manual = false
                                }, 1000)
                            }else{
                                this.hidePreManualMessage()
                                this.pre_manual = false
                            }
                        }, 1000)
                    }else{
                        this.hidePreManualMessage()
                        this.pre_manual = false
                    }
                }, 1000)
            }else{
                this.hidePreManualMessage()
                this.pre_manual = false
            }
        }
    }

    render() {
        return (
        <div>
            <div onClick={this.toggleManual} className="flybar-icon-item">
                <img draggable="false" className="flybar-img-icon" src={this.state.icon}/>
                <div className="img-toast-lower">
                    [Р]
                </div>
                <div className="flybar-description">Ручной контроль</div>
            </div>
            <div id="manual-message" className="flybar-takeoff-message hidden"></div>
        </div>
        );
    }
}

export default ManualItem;

