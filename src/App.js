import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import VideoBar from "./Components/VideoBar";
import TelemetryBar from "./Components/TelemetryBar";

class App extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('endpoint_address') === null) {
            localStorage.setItem('takeoff_speed', "0.5")
            localStorage.setItem('ground_speed', "0.5")
            localStorage.setItem('target_alt', "3")
            localStorage.setItem('endpoint_address', "192.168.88.252")
        }
        this.elevatePowerGood = this.elevatePowerGood.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);

        this.state = {
            link: 0,
            link_local: false,
            copter_state: 0,
            power_good: false,
        }

        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/status"
        this.core_url = "http://127.0.0.1:5053/api/v1/get/status"
    }

    elevatePowerGood(status) {
        this.setState({power_good: status})
    }

    componentDidMount() {
        if (localStorage.getItem('theme')==='0') {
            document.body.className = "theme-dark"
        }else{
            document.body.className = "theme-light"
        }
        setInterval(() => {
            this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/status"
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 2000)
            fetch(this.endpoint_url, {signal: controller.signal})
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        return res;
                    } else {
                        let error = new Error(res.statusText);
                        error.response = res;
                        throw error
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        this.setState({link: true})
                        this.setState({copter_state: Number(data['copter_state'])})
                    }
                })
                .catch((e) => {
                    this.setState({link: false})
                    this.setState({copter_state: 0})
                });
        }, 1000)

        setInterval(() => {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 2000)
            fetch(this.core_url, {signal: controller.signal})
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        return res;
                    } else {
                        let error = new Error(res.statusText);
                        error.response = res;
                        throw error
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data['status'] === 'OK') {
                        localStorage.setItem('endpoint_address', data['address'])
                        this.setState({link_local: true})
                    }
                })
                .catch((e) => {
                    this.setState({link_local: false})
                });
        }, 1000)
    }

    openFullScreen() {
        document.documentElement.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
            );
        });
        document.querySelector("#fs_cover").remove()
    }


    render() {
        return (
            <AppContainer>
                <AppBar elevate_power_good={this.elevatePowerGood} status={this.state.copter_state}
                        link={this.state.link} link_local={this.state.link_local}/>
                <FlyBar power_good={this.state.power_good} copter_status={this.state.copter_state}
                        link={this.state.link} link_local={this.state.link_local}/>
                <VideoBar status={this.state.copter_state} link={this.state.link}/>
                <TelemetryBar link={this.state.link} link_local={this.state.link_local} status={this.state.copter_state}/>
                {/*<div id="fs_cover" className="fs_cover">*/}
                {/*    <div onClick={this.openFullScreen} className="fs_request">Открыть в полноэкранном режиме</div>*/}
                {/*</div>*/}
            </AppContainer>
        );
    }
}

export default App;
