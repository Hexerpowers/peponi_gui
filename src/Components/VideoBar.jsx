import React, {Component} from 'react';

import "../Assets/Styles/VideoBar.css"
import CameraItem from "./VideoBar/CameraItem";
import RecordItem from "./VideoBar/RecordItem";
import PhotoItem from "./VideoBar/PhotoItem";
import Swal from "sweetalert2";
import ModeItem from "./VideoBar/ModeItem";

class VideoBar extends Component {
    constructor(props) {
        super(props);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.state = {
            camera: false,
            cam_link: false
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
        this.camera_url = "http://192.168.88.110/"
    }

    componentDidMount() {
        // this.setState({camera: localStorage.getItem('cam_enabled') === 'true'})
        // if (this.state.camera) {
        //     document.querySelector('#toggle_camera').className = "vb-item vb-item-active"
        // } else {
        //     document.querySelector('#toggle_camera').className = "vb-item"
        // }

        setInterval(() => {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 900)
            fetch(this.camera_url, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                signal: controller.signal
            })
                .then(() => {this.setState({cam_link: true})})
                .catch(e => {this.setState({cam_link: false})});
        }, 2000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.link === true && this.props.link === false) {
            this.setState({camera: false})
        }
    }

    toggleCamera() {
        // if (!this.props.link) {
        //     this.toast.fire({
        //         icon: 'error',
        //         title: 'Нет соединения с коптером'
        //     })
        //     return
        // }
        if (!this.state.cam_link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с камерой'
            })
            return
        }
        this.setState({camera: !this.state.camera})
        localStorage.setItem('cam_enabled', String(!this.state.camera))
    }

    render() {
        return (
            <div>
                <div className="vb-fullscreen">
                    {this.state.camera &&
                        <iframe className="vb-iframe"
                                src="http://localhost:1984/stream.html?src=cam_input&mode=webrtc"/>
                    }
                </div>
                <div className="vb-cover"/>
                <div className="vb-holder">
                    <CameraItem cam_link={this.state.cam_link} link={this.props.link} status={this.state.camera} elevate={this.toggleCamera}/>
                    <ModeItem cam_link={this.state.cam_link} link={this.props.link}/>
                    <RecordItem cam_link={this.state.cam_link} link={this.props.link}/>
                    <PhotoItem cam_link={this.state.cam_link} link={this.props.link}/>
                </div>
            </div>
        );
    }
}

export default VideoBar;
