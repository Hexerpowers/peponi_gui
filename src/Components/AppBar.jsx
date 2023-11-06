import {Component} from "react";
import "../Assets/Styles/AppBar.css"

import SettingsItem from "./AppBar/SettingsItem";
import JournalItem from "./AppBar/JournalItem";
import LinkItem from "./AppBar/LinkItem";
import BatteryItem from "./AppBar/BatteryItem";
import StatusItem from "./AppBar/StatusItem";

export class AppBar extends Component {
    render() {
        return (
            <div className="ab-holder font-fira_code">
                <SettingsItem link={this.props.link} link_local={this.props.link_local}/>
                <JournalItem link={this.props.link}/>
                <div className="ab-separator"/>
                <LinkItem link={this.props.link}/>
                <BatteryItem link={this.props.link} status={this.props.status}/>
                <div className="ab-separator"/>
                <StatusItem link={this.props.link} status={this.props.status}/>
            </div>
        );
    };
}
