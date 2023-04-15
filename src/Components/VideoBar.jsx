import React, {Component} from 'react';

import "../Assets/Styles/VideoBar.css"
import CameraItem from "./VideoBar/CameraItem";
import RecordItem from "./VideoBar/RecordItem";
import PhotoItem from "./VideoBar/PhotoItem";
import Swal from "sweetalert2";

class VideoBar extends Component {
    constructor(props) {
        super(props);
        this.toggleCamera = this.toggleCamera.bind(this);
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
    }

    componentDidMount() {
        this.setState({camera: localStorage.getItem('cam_enabled') === 'true'})
        if (this.state.camera) {
            document.querySelector('#toggle_camera').className = "vs-bar-item vs-bar-item-active"
        } else {
            document.querySelector('#toggle_camera').className = "vs-bar-item"
        }
    }

    toggleCamera() {
        if (!this.props.link) {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером'
            })
            return
        }
        this.setState({camera: !this.state.camera})
        localStorage.setItem('cam_enabled', String(!this.state.camera))
    }

    render() {
        return (
            <div>
                <div className="vs-fullscreen">
                    {this.state.camera &&
                        <iframe className="vs-iframe"
                                src="http://localhost:1984/stream.html?src=cam_input&mode=webrtc"/>
                    }
                </div>
                <div className="vs-cover"/>
                <div className="vs-bar">
                    <CameraItem link={this.props.link} status={this.state.camera} elevate={this.toggleCamera}/>
                    <RecordItem link={this.props.link}/>
                    <PhotoItem link={this.props.link}/>
                </div>
            </div>
        );
    }
}

export default VideoBar;
