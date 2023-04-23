import {Component} from "react";
import "../Assets/Styles/AppBar.css"

import SettingsItem from "./AppBar/SettingsItem";
import JournalItem from "./AppBar/JournalItem";
import LinkItem from "./AppBar/LinkItem";
import BatteryItem from "./AppBar/BatteryItem";
import PowerItem from "./AppBar/PowerItem";
import HankItem from "./AppBar/HankItem";
import StatusItem from "./AppBar/StatusItem";

export class AppBar extends Component {
    render() {
        return (
            <div className="appbar-holder font-firacode">
                <SettingsItem link={this.props.link} link_local={this.props.link_local}/>
                <JournalItem link={this.props.link}/>
                <div className="appbar-separator"/>
                <LinkItem link={this.props.link}/>
                <BatteryItem link={this.props.link} status={this.props.status}/>
                <PowerItem elevate={this.props.elevate_power_good} link={this.props.link_local}/>
                <div className="appbar-separator"/>
                <HankItem link={this.props.link_local}/>
                <div className="appbar-separator"/>
                <StatusItem link={this.props.link} status={this.props.status}/>
            </div>
        );
    };
}
