import React, {Component} from 'react';

import manual_ico from "../../Assets/Img/FlyBar/manual.png";
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
        this.base_url = "http://192.168.22.13:5052/api/v1/trig/manual"
        this.aux_url = "http://127.0.0.1:5053/api/v1/trig/manual"
    }

    showPreManualMessage(timeout) {
        let msg = document.querySelector('#manual-message')
        msg.innerHTML = "Нажмите ещё раз для перехода в ручной режим в течение ("+timeout+") секунд"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreManualMessage(){
        let msg = document.querySelector('#manual-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleManual() {
        if (this.pre_manual){
            this.hidePreManualMessage()
            this.pre_manual = false
            // fetch(this.base_url)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data)
            //         if (data['status'] === 'OK') {
            //             this.toast.fire({
            //                 icon: 'success',
            //                 title: 'Команда на переход в ручной режим отправлена'
            //             })
            //         }
            //     });
            fetch(this.aux_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на переход в ручной режим отправлена'
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
                <img draggable="false" className="flybar-img-icon" src={manual_ico}/>
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

