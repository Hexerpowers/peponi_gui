import React, {Component} from 'react';
import record_ico from "../../Assets/Img/VideoBar/record.png";
import Swal from "sweetalert2";

class RecordItem extends Component {

    constructor(props) {
        super(props);
        this.toggleRecord = this.toggleRecord.bind(this);
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
        this.state = {
            enabled: false,
            active: '',
            indicator: 'inactive'
        }
        this.rec_url = "http://127.0.0.1:5053/api/v1/trig/record"
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'vb-item-active'
            if (nextProps.cam_link) {
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

    toggleRecord() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        if (!this.props.cam_link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с камерой'
            })
            return
        }
        fetch(this.rec_url)
            .then(response => response.json())
            .then(data => {
                if (data['status'] === 'OK') {
                    if (data['result'] === 'on') {
                        this.setState({enabled: true})
                        this.setState({indicator: 'enabled'})
                        this.toast.fire({
                            icon: 'success',
                            title: 'Запись началась'
                        })
                    } else {
                        this.setState({enabled: false})
                        this.setState({indicator: 'active'})
                        this.toast.fire({
                            icon: 'success',
                            title: 'Запись остановлена'
                        })
                    }
                }
            });
    }

    render() {
        let active = 'vb-item ' + this.state.active
        let indicator = 'fb-indicator-' + this.state.indicator
        return (
            <div onClick={this.toggleRecord} className={active}>
                <img draggable="false" className="vb-item-icon-record" src={record_ico} alt=""/>
                <div className={indicator}/>
            </div>
        );
    }
}

export default RecordItem;
