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
                <div className="flybar-heading">АВТО</div>
                <div className="flybar-separator" />
                <TakeoffItem power_good={this.props.power_good} status={this.props.copter_status} link={this.props.link}/>
                <LandItem status={this.props.copter_status} link={this.props.link}/>
                <div className="flybar-separator" />
                <ManualItem status={this.props.copter_status} link={this.props.link} />
                <StopItem status={this.props.copter_status} link={this.props.link} />
            </div>
        );
    };
}
