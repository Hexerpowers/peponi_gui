import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import VideoStream from "./Components/VideoStream";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            runtime: {
                link: {
                    level: 0
                },
                battery: {
                    level: 100,
                    state: 0,
                },
                power: {
                    state: 0
                },
                hank: {
                    state: 0,
                    rem_length: 150,
                    force: 0
                },
                err_state: 0
            }
        }

        this.base_url = "http://127.0.0.1:5052/api/v1/get/status"
    }


    componentDidMount() {
        setInterval(() => {
                fetch(this.base_url)
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
                            let tRT = this.state.runtime
                            tRT['link'] = {level:1}
                            this.setState({runtime: tRT})
                        }
                    })
                    .catch((e) => {
                        let tRT = this.state.runtime
                        tRT['link'] = {level:0}
                        this.setState({runtime: tRT})
                    });
        }, 2000)
    }


    render() {
        return (
            <AppContainer>
                <AppBar runtime={this.state.runtime}/>
                <FlyBar />
                <VideoStream />
            </AppContainer>
        );
    }
}

export default App;
