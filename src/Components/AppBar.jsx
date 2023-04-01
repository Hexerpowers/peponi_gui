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
                <SettingsItem state={this.props.runtime.link.level!==0}/>
                <JournalItem />
                <div className="appbar-separator" />
                <LinkItem state={this.props.runtime.link}/>
                <BatteryItem state={this.props.runtime.battery}/>
                <PowerItem state={this.props.runtime.power}/>
                <div className="appbar-separator" />
                <HankItem state={this.props.runtime.hank}/>
                <div className="appbar-separator" />
                <StatusItem state={this.props.runtime.err_state}/>
            </div>
        );
    };
}
