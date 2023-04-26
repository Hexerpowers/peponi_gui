import React, {Component} from 'react';
import photo_ico from "../../Assets/Img/VideoBar/photo.png";
import Swal from "sweetalert2";

class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.togglePhoto = this.togglePhoto.bind(this);
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
        this.photo_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/photo"
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


    togglePhoto() {
        this.photo_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/photo"
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
                        title: 'Фото сохранено'
                    })
                }
            });
    }

    render() {
        let active = 'vb-item ' + this.state.active
        let indicator = 'vb-indicator-' + this.state.indicator
        return (
            <div onClick={this.togglePhoto} className={active}>
                <img draggable="false" className="vb-item-icon-photo" src={photo_ico} alt=""/>
                <div className={indicator}/>
            </div>
        );
    }
}

export default PhotoItem;
