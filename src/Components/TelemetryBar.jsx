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
                t_yaw:0
            }
        }
        this.update = this.update.bind(this);
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/telemetry"
    }

    componentDidMount() {
        setInterval(() => {
            this.update()
        }, 250)
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
