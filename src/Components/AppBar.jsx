import {Component} from "react";
import "../Assets/Styles/AppBar.css"

import SettingsItem from "./AppBar/SettingsItem";
import JournalItem from "./AppBar/JournalItem";
import LinkItem from "./AppBar/LinkItem";
import BatteryItem from "./AppBar/BatteryItem";
import PowerItem from "./AppBar/PowerItem";
import HankItem from "./AppBar/HankItem";
import StatusItem from "./AppBar/StatusItem";
import DevSettingsItem from "./AppBar/DevSettingsItem";
import HelpItem from "./AppBar/HelpItem";

export class AppBar extends Component {
    render() {
        return (
            <div className="ab-holder font-fira_code">
                <SettingsItem link={this.props.link} link_local={this.props.link_local}/>
                <DevSettingsItem link={this.props.link} link_local={this.props.link_local}/>
                <JournalItem link={this.props.link}/>
                <div className="ab-separator"/>
                <LinkItem link={this.props.link}/>
                <BatteryItem link={this.props.link} status={this.props.status}/>
                <PowerItem elevate={this.props.elevate_power_good} link={this.props.link_local} status={this.props.status}/>
                <div className="ab-separator"/>
                <HankItem link={this.props.link_local}/>
                <div className="ab-separator"/>
                <StatusItem link={this.props.link} status={this.props.status}/>
                <div className="ab-separator"/>
                <HelpItem link={this.props.link_local} status={this.props.status}/>
            </div>
        );
    };
}
