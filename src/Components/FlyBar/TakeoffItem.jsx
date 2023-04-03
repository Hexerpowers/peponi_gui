import React, {Component} from 'react';
import takeoff_ico from "../../Assets/Img/FlyBar/takeoff.png";
import Swal from "sweetalert2";

class TakeoffItem extends Component {
    constructor(props) {
        super(props);
        this.toggleTakeoff = this.toggleTakeoff.bind(this)
        this.showPreTakeoffMessage = this.showPreTakeoffMessage.bind(this)
        this.hidePreTakeoffMessage = this.hidePreTakeoffMessage.bind(this)
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
        this.base_url = "http://127.0.0.1:5052/api/v1/trig/takeoff"
    }

    showPreTakeoffMessage(timeout) {
        let msg = document.querySelector('#takeoff-message')
        msg.innerHTML = "Нажмите ещё раз для взлёта в течение ("+timeout+") секунд"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreTakeoffMessage(){
        let msg = document.querySelector('#takeoff-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleTakeoff() {
        if (this.pre_takeoff){
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
        }else{
            this.showPreTakeoffMessage(3)
            this.pre_takeoff = true
            if(this.pre_takeoff) {
                setTimeout(() => {
                    this.showPreTakeoffMessage(2);
                    if(this.pre_takeoff) {
                        setTimeout(() => {
                            this.showPreTakeoffMessage(1);
                            if(this.pre_takeoff) {
                                setTimeout(() => {
                                    this.hidePreTakeoffMessage()
                                    this.pre_takeoff = false
                                }, 1000)
                            }else{
                                this.hidePreTakeoffMessage()
                                this.pre_takeoff = false
                            }
                        }, 1000)
                    }else{
                        this.hidePreTakeoffMessage()
                        this.pre_takeoff = false
                    }
                }, 1000)
            }else{
                this.hidePreTakeoffMessage()
                this.pre_takeoff = false
            }
        }
    }

    render() {
        return (
            <div>
                <div onClick={this.toggleTakeoff} className="flybar-icon-item">
                    <img draggable="false" className="flybar-img-icon" src={takeoff_ico} alt=""/>
                    <div className="img-toast-lower">
                        [В]
                    </div>
                    <div className="flybar-description">Взлёт</div>
                </div>
                <div id="takeoff-message" className="flybar-takeoff-message hidden">
                </div>
            </div>
        );
    }
}

export default TakeoffItem;
