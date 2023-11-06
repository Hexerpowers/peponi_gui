import React, {Component} from 'react';

import mission_icon from "../../Assets/Img/FlyBar/mission.png";
import Swal from "sweetalert2";

class MissionItem extends Component {
    constructor(props) {
        super(props);
        this.toggleMission = this.toggleMission.bind(this)
        this.showPreMissionMessage = this.showPreMissionMessage.bind(this)
        this.hidePreMissionMessage = this.hidePreMissionMessage.bind(this)
        this.pre_mission = false
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
        this.aux_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/mission"
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'fb-item-active'
            if ((nextProps.status === 3 || nextProps.status === 6)) {
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
            if (e.code === 'KeyV') {
                self.toggleMission()
            }
        });
    }


    showPreMissionMessage(timeout) {
        let msg = document.querySelector('#mission-message')
        if (this.state.enabled) {
            msg.innerHTML = "Нажмите ещё раз для остановки миссии в течение (" + timeout + ") секунд"
        } else {
            msg.innerHTML = "Нажмите ещё раз для начала миссии в течение (" + timeout + ") секунд"

        }
        msg.className = 'fb-alert-message'
    }

    hidePreMissionMessage() {
        let msg = document.querySelector('#mission-message')
        msg.innerHTML = ""
        msg.className = 'fb-alert-message hidden'
    }

    toggleMission() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }

        console.log(this.props.status)

        if ((this.props.status !== 3 && this.props.status !== 6)) {
            this.toast.fire({
                icon: 'error',
                title: 'Невозможно запустить миссию не в полёте'
            })
            return
        }

        if (this.pre_mission) {
            this.hidePreMissionMessage()
            this.pre_mission = false
            fetch(this.aux_url)
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.setState({enabled: !this.state.enabled})
                        this.toast.fire({
                            icon: 'success',
                            title: 'Команда на управление миссией отправлена'
                        })
                    }
                });
        } else {
            this.showPreMissionMessage(3)
            this.pre_mission = true
            if (this.pre_mission) {
                setTimeout(() => {
                    this.showPreMissionMessage(2);
                    if (this.pre_mission) {
                        setTimeout(() => {
                            this.showPreMissionMessage(1);
                            if (this.pre_mission) {
                                setTimeout(() => {
                                    this.hidePreMissionMessage()
                                    this.pre_ission = false
                                }, 1000)
                            } else {
                                this.hidePreMissionMessage()
                                this.pre_ission = false
                            }
                        }, 1000)
                    } else {
                        this.hidePreMissionMessage()
                        this.pre_ission = false
                    }
                }, 1000)
            } else {
                this.hidePreMissionMessage()
                this.pre_ission = false
            }
        }
    }

    render() {
        let active = 'fb-item ' + this.state.active
        let indicator = 'fb-indicator-' + this.state.indicator
        let inverted = 'fb-item-icon fb-icon-offset'
        if (localStorage.getItem('theme')!=='1') {
            inverted = 'fb-item-icon fb-icon-offset fb-item-icon-inverted'
        }
        return (
            <div>
                <div onClick={this.toggleMission} className={active}>
                    <img draggable="false" className={inverted} src={mission_icon}/>
                    <div className={indicator}/>
                    <div className="item-toast">
                        [М]
                    </div>
                    <div className="item-toast hidden">
                        [Миссия]
                    </div>
                </div>
                <div id="mission-message" className="fb-alert-message hidden"></div>
            </div>
        );
    }
}

export default MissionItem;

