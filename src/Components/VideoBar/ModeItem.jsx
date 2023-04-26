import React, {Component} from 'react';
import mode_ico from "../../Assets/Img/VideoBar/change_mode.png";
import Swal from "sweetalert2";

class ModeItem extends Component {
    constructor(props) {
        super(props);
        this.toggleMode = this.toggleMode.bind(this);
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
            active: '',
            indicator: 'inactive'
        }
        this.photo_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/mode"
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'fb-item-active'
            if (nextProps.cam_link) {
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

    toggleMode() {
        this.photo_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/mode"
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
        fetch(this.photo_url)
            .then(response => response.json())
            .then(data => {
                if (data['status'] === 'OK') {
                    this.toast.fire({
                        icon: 'success',
                        title: 'Режим отображения изменён'
                    })
                }
            });
    }

    render() {
        let active = 'vb-item ' + this.state.active
        let indicator = 'vb-indicator-' + this.state.indicator
        return (
            <div onClick={this.toggleMode} className={active}>
                <img draggable="false" className="vb-item-icon-mode" src={mode_ico} alt=""/>
                <div className={indicator}/>
            </div>
        );
    }
}

export default ModeItem;
