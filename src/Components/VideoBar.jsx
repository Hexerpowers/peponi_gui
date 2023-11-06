import React, {Component} from 'react';

import "../Assets/Styles/VideoBar.css"
import CameraItem from "./VideoBar/CameraItem";
import Swal from "sweetalert2";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'
import remove_marker from "../Assets/Img/VideoBar/remove_marker.png"

class VideoBar extends Component {
    constructor(props) {
        super(props);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.state = {
            camera: false,
            markers: []
        }
        this.timeout = 0
        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/mission_plan"
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
        setInterval(() => {
            if (this.props.link) {
                try {
                    fetch(this.endpoint_url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            wp_list: JSON.stringify(this.state.markers),
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data)
                        });
                } catch {
                    console.log('Error while posting to [endpoint]')
                }
            }
        }, 1000)
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.link === true && this.props.link === false) {
            this.setState({camera: false})
        }
    }

    addMarker = (lon,lat) => {
        if (this.timeout === 0) {
            const {markers} = this.state
            markers.push([lon, lat])
            this.setState({markers})
        }
    }

    removeMarker(e) {
        const {markers} = this.state
        markers.splice(Number(e.target.id.slice(10)), 1)
        this.timeout = 1
        setTimeout(() =>this.timeout = 0, 10)
        this.setState({markers})
    }

    toggleCamera() {
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
                    <div className="vb-cover"/>
                </div>
                {/*<div className="vb-holder">*/}
                {/*    <CameraItem cam_link={this.props.link} link={this.props.link} status={this.state.camera} elevate={this.toggleCamera}/>*/}
                {/*</div>*/}
                <MapContainer
                    onClick={()=>{alert("ass")}}
                    style={{width:'100vw', height:'100vh', zIndex:'-1', position:'fixed', top:'0'}}
                    center={[55.765899658,37.685028076]}
                    zoom={15}
                    scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ClickListener elevate={this.addMarker}/>
                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position}>
                            <Popup>
                                <div className="vb-marker-controls">
                                    <img id={`marker_rm-${idx}`} onClick={this.removeMarker} className="vb-remove-marker" src={remove_marker}/>
                                    <div className="vb-info-marker font-fira_code">{idx}</div>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        );
    }
}

function ClickListener({elevate}) {
    const map = useMapEvents({
        click: (e) => {
            elevate(e.latlng.lat,e.latlng.lng)
        }
    })
    return null
}

export default VideoBar;
