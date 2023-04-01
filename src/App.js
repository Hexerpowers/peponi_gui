import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import {IMUBar} from "./Components/IMUBar";
import {Notifications} from "./Components/Notifications";
import {Monitoring} from "./Components/Monitoring";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            runtime: {
                link: {
                    level: 2,
                    ping: 20
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
    }

    render() {
        return (
            <AppContainer>
                <AppBar runtime={this.state.runtime}/>
                <FlyBar />
                <IMUBar />
                <Notifications />
                <Monitoring />
            </AppContainer>
        );
    }
}

export default App;
