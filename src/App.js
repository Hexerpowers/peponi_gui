import React, {Component} from 'react';
import {AppContainer} from "./Components/AppContainer";
import {AppBar} from "./Components/AppBar";
import {FlyBar} from "./Components/FlyBar";
import {IMUBar} from "./Components/IMUBar";
import {Notifications} from "./Components/Notifications";
import {Monitoring} from "./Components/Monitoring";

class App extends Component {
    render() {
        return (
            <AppContainer>
                <AppBar />
                <FlyBar />
                <IMUBar />
                <Notifications />
                <Monitoring />
            </AppContainer>
        );
    }
}

export default App;
