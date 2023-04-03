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
                <SettingsItem state={this.props.link!==0}/>
                <JournalItem state={this.props.link!==0}/>
                <div className="appbar-separator" />
                <LinkItem state={this.props.link!==0}/>
                <BatteryItem state={this.props.link!==0}/>
                <PowerItem state={this.props.link!==0}/>
                <div className="appbar-separator" />
                <HankItem state={this.props.link!==0}/>
                <div className="appbar-separator" />
                <StatusItem state={this.props.link!==0}/>
            </div>
        );
    };
}
