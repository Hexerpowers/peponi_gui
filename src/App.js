import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import VideoStream from "./Components/VideoStream";
import TelemetryBar from "./Components/TelemetryBar";

class App extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('endp_addr') === null) {
            localStorage.setItem('path', "C:\Watchman\Camera")
            localStorage.setItem('t_spd', "0.5")
            localStorage.setItem('g_spd', "0.5")
            localStorage.setItem('alt', "3")
            localStorage.setItem('endp_addr', "192.168.1.100")
        }
        this.elevatePowerGood  = this.elevatePowerGood.bind(this);

        this.state = {
            link:0,
            copter_state:0,
            power_good:false
        }

        this.base_url = "http://"+localStorage.getItem('endp_addr')+":5052/api/v1/get/status"
    }

    elevatePowerGood(status){
        this.setState({power_good:status})
    }

    componentDidMount() {
        setInterval(() => {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 200)
            fetch(this.base_url,{ signal: controller.signal })
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
    }


    render() {
        return (
            <AppContainer>
                <AppBar elevate_power_good={this.elevatePowerGood} status={this.state.copter_state} link={this.state.link}/>
                <FlyBar power_good={this.state.power_good} copter_status={this.state.copter_state} link={this.state.link}/>
                <VideoStream status={this.state.copter_state} link={this.state.link}/>
                <TelemetryBar link={this.state.link}/>
            </AppContainer>
        );
    }
}

export default App;
