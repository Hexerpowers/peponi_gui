import React, {Component} from 'react';

import "../Assets/Styles/VideoStream.css"
import record_ico from "../Assets/Img/VideoStream/record.png";
import cam_ico from "../Assets/Img/VideoStream/enable_cam.png";
import photo_ico from "../Assets/Img/VideoStream/photo.png";
import Swal from "sweetalert2";

class VideoStream extends Component {
    constructor(props) {
        super(props);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.toggleRecord = this.toggleRecord.bind(this);
        this.togglePhoto = this.togglePhoto.bind(this);
        this.state = {
            camera: false
        }
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
        this.rec_url ="http://127.0.0.1:5053/api/v1/trig/record"
        this.photo_url = "http://"+localStorage.getItem('endpoint_address')+":5052/api/v1/trig/photo"

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.camera) {
            document.querySelector('#toggle_camera').className = "vs-bar-item vs-bar-item-active"
        }else{
            document.querySelector('#toggle_camera').className = "vs-bar-item"
        }
    }


    componentDidMount() {
        this.setState({camera: localStorage.getItem('cam_enabled')==='true'})
        if (this.state.camera) {
            document.querySelector('#toggle_camera').className = "vs-bar-item vs-bar-item-active"
        }else{
            document.querySelector('#toggle_camera').className = "vs-bar-item"
        }
    }


    toggleCamera(){
        this.setState({camera: !this.state.camera})
        localStorage.setItem('cam_enabled', String(!this.state.camera))
    }

    toggleRecord(){
        if (!this.props.link){
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        fetch(this.rec_url)
            .then(response => response.json())
            .then(data => {
                if (data['status'] === 'OK') {
                    if (data['result'] === 'on') {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Запись началась'
                        })
                    }else {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Запись остановлена'
                        })
                    }
                }
            });
    }

    togglePhoto(){
        if (!this.props.link){
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
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
        return (
            <div>
                <div className="vs-fullscreen">
                    {this.state.camera &&
                        <iframe className="vs-iframe" src="http://localhost:1984/stream.html?src=cam_input&mode=webrtc" />
                    }
                </div>
                <div className="vs-cover"/>
                <div className="vs-bar">
                    <div id="toggle_camera" onClick={this.toggleCamera} className="vs-bar-item"><img draggable="false" className="icon-cam" src={cam_ico} alt=""/></div>
                    <div onClick={this.toggleRecord} className="vs-bar-item"><img draggable="false" className="icon-record" src={record_ico} alt=""/></div>
                    <div onClick={this.togglePhoto} className="vs-bar-item"><img draggable="false" className="icon-photo" src={photo_ico} alt=""/></div>
                </div>
            </div>
        );
    }
}

export default VideoStream;
