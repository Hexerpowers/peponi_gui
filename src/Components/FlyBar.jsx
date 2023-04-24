import {Component} from "react";
import "../Assets/Styles/FlyBar.css"

import TakeoffItem from "./FlyBar/TakeoffItem";
import LandItem from "./FlyBar/LandItem";
import ManualItem from "./FlyBar/ManualItem";
import StopItem from "./FlyBar/StopItem";

export class FlyBar extends Component {
    render() {
        return (
            <div className="fb-holder font-fira_code">
                <TakeoffItem power_good={this.props.power_good} status={this.props.copter_status}
                             link={this.props.link}/>
                <div className="fb-separator"/>
                <LandItem status={this.props.copter_status} link={this.props.link}/>
                <div className="fb-separator"/>
                <StopItem status={this.props.copter_status} link={this.props.link}/>
                <div className="fb-separator"/>
                <ManualItem status={this.props.copter_status} link={this.props.link}/>
            </div>
        );
    };
}
