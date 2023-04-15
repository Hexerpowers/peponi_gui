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
        this.state = {
            active: '',
            indicator: 'inactive'
        }
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/land"
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
            if (nextProps.status === 2 || nextProps.status === 3 || nextProps.status === 8) {
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
            if (e.code === 'KeyG') {
                self.toggleLand()
            }
        });
    }


    showPreLandMessage(timeout) {
        let msg = document.querySelector('#land-message')
        msg.innerHTML = "Нажмите ещё раз в течение (" + timeout + ") секунд ДЛЯ ПОСАДКИ"
        msg.className = 'flybar-takeoff-message'
    }

    hidePreLandMessage() {
        let msg = document.querySelector('#land-message')
        msg.innerHTML = ""
        msg.className = 'flybar-takeoff-message hidden'
    }

    toggleLand() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (this.props.status !== 2 && this.props.status !== 3 && this.props.status !== 8) {
            this.toast.fire({
                icon: 'error',
                title: 'Коптер уже садится или не в полёте'
            })
            return
        }
        if (this.pre_land) {
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
        } else {
            this.showPreLandMessage(3)
            this.pre_land = true
            if (this.pre_land) {
                setTimeout(() => {
                    this.showPreLandMessage(2);
                    if (this.pre_land) {
                        setTimeout(() => {
                            this.showPreLandMessage(1);
                            if (this.pre_land) {
                                setTimeout(() => {
                                    this.hidePreLandMessage()
                                    this.pre_land = false
                                }, 1000)
                            } else {
                                this.hidePreLandMessage()
                                this.pre_land = false
                            }
                        }, 1000)
                    } else {
                        this.hidePreLandMessage()
                        this.pre_land = false
                    }
                }, 1000)
            } else {
                this.hidePreLandMessage()
                this.pre_land = false
            }
        }
    }

    render() {
        let active = 'fb-icon-item ' + this.state.active
        let indicator = 'fb-indicator-' + this.state.indicator
        return (
            <div>
                <div onClick={this.toggleLand} className={active}>
                    <img draggable="false" className="flybar-img-icon" src={land_ico} alt=""/>
                    <div className={indicator}/>
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
