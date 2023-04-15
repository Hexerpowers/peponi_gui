import React, {Component} from 'react';
import land_ico from "../../Assets/Img/FlyBar/land.png";
import Swal from "sweetalert2";

class LandItem extends Component {
    constructor(props) {
        super(props);
        this.toggleLand = this.toggleLand.bind(this)
        this.showPreLandMessage = this.showPreLandMessage.bind(this)
        this.hidePreLandMessage = this.hidePreLandMessage.bind(this)
        this.pre_land = false
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
        this.base_url = "http://"+localStorage.getItem('endpoint_address')+":5052/api/v1/trig/land"
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
            if(e.keyCode === 103){
                self.toggleLand()
            }
        });
    }


    showPreLandMessage(timeout) {
        let msg = document.querySelector('#land-message')
        msg.innerHTML = "Нажмите ещё раз в течение ("+timeout+") секунд ДЛЯ ПОСАДКИ"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreLandMessage(){
        let msg = document.querySelector('#land-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleLand() {
        if (!this.props.link){
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (this.props.status !== 2 && this.props.status!==3 && this.props.status!==8){
            this.toast.fire({
                icon: 'error',
                title: 'Коптер уже садится или не в полёте'
            })
            return
        }
        if (this.pre_land){
            this.hidePreLandMessage()
            this.pre_land = false
            fetch(this.base_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на посадку отправлена'
                        })
                    }
                });
        }else{
            this.showPreLandMessage(3)
            this.pre_land = true
            if(this.pre_land) {
                setTimeout(() => {
                    this.showPreLandMessage(2);
                    if(this.pre_land) {
                        setTimeout(() => {
                            this.showPreLandMessage(1);
                            if(this.pre_land) {
                                setTimeout(() => {
                                    this.hidePreLandMessage()
                                    this.pre_land = false
                                }, 1000)
                            }else{
                                this.hidePreLandMessage()
                                this.pre_land = false
                            }
                        }, 1000)
                    }else{
                        this.hidePreLandMessage()
                        this.pre_land = false
                    }
                }, 1000)
            }else{
                this.hidePreLandMessage()
                this.pre_land = false
            }
        }
    }

    render() {
        return (
        <div>
            <div onClick={this.toggleLand} className="fb-icon-item">
                <img draggable="false" className="flybar-img-icon" src={land_ico} alt=""/>
                <div className="fb-indicator-inactive"/>
                <div className="img-toast-lower">
                    [П]
                </div>
                <div className="img-toast-lower hidden">
                    [Посадка]
                </div>
                {/*<div className="flybar-description">Посадка</div>*/}
            </div>
            <div id="land-message" className="flybar-takeoff-message hidden"></div>
        </div>
        );
    }
}

export default LandItem;
