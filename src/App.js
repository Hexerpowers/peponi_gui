import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import VideoStream from "./Components/VideoStream";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link:0
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
                            this.setState({link: 1})
                        }
                    })
                    .catch((e) => {
                        this.setState({link: 0})
                    });
        }, 2000)
    }


    render() {
        return (
            <AppContainer>
                <AppBar link={this.state.link}/>
                <FlyBar />
                <VideoStream />
            </AppContainer>
        );
    }
}

export default App;
