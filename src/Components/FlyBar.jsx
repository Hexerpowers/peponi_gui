import {Component} from "react";
import "../Assets/Styles/FlyBar.css"

import TakeoffItem from "./FlyBar/TakeoffItem";
import LandItem from "./FlyBar/LandItem";
import ManualItem from "./FlyBar/ManualItem";
import StopItem from "./FlyBar/StopItem";

export class FlyBar extends Component {
    render() {
        return (
            <div className="flybar-holder font-firacode">
                <TakeoffItem power_good={this.props.power_good} status={this.props.copter_status}
                             link={this.props.link}/>
                <div className="flybar-separator"/>
                <LandItem status={this.props.copter_status} link={this.props.link}/>
                <div className="flybar-separator"/>
                <StopItem status={this.props.copter_status} link={this.props.link}/>
                <div className="flybar-separator"/>
                <ManualItem status={this.props.copter_status} link={this.props.link}/>
            </div>
        );
    };
}
