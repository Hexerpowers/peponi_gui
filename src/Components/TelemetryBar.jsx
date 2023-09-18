import React, {Component} from 'react';
import "../Assets/Styles/TelemetryBar.css"
import VerticalItem from "./TelemetryBar/VerticalItem";
import HorizontalItem from "./TelemetryBar/HorizontalItem";

class TelemetryBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                alt: '-',
                roll: 0,
                pitch_back: -530,
                pitch_mark: 69,
                yaw: 0,
                t_yaw: 0
            }
        }
        this.update = this.update.bind(this);
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/telemetry"
        this.aux_url = "http://127.0.0.1:5053/api/v1/post/hank_target"
    }

    componentDidMount() {
        setInterval(() => {
            this.update()
        }, 50)
    }

    update() {
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/telemetry"
        if (this.props.link) {
            fetch(this.base_url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        data: {
                            alt: Number(data['alt']),
                            roll: Number(data['roll']),
                            pitch_back: -530 + Number(data['pitch']),
                            pitch_mark: 69 + Number(data['pitch']),
                            yaw: Number(data['yaw']),
                            t_yaw: Number(data['t_yaw'])
                        }
                    })
                    if (localStorage.getItem('hank_mode') === '2') {
                        if (this.props.link_local) {
                            fetch(this.aux_url, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify({
                                    target_length: Number(data['alt']),
                                    target_mode: this.props.status,
                                    target_alt: localStorage.getItem('target_alt')
                                })
                            })
                        }
                    }
                });
        } else {
            this.setState({
                data: {
                    alt: '-',
                    roll: 0,
                    pitch_back: -530,
                    pitch_mark: 69,
                    yaw: 0,
                    t_yaw: 0
                }
            })
            if (localStorage.getItem('hank_mode') === '2') {
                if (this.props.link_local){
                    fetch(this.aux_url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            target_length: 0,
                            target_mode: 0,
                            target_alt: 0
                        })
                    })
                }
            }
        }
    }

    render() {
        return (
            <div className="tb-holder">
                <VerticalItem data={this.state.data} link={this.props.link} status={this.props.status}/>
                <HorizontalItem data={this.state.data} link={this.props.link} status={this.props.status}/>
            </div>
        );
    }
}

export default TelemetryBar;
