import {Component} from "react";
import "../Assets/Styles/FlyBar.css"

import TakeoffItem from "./FlyBar/TakeoffItem";
import LandItem from "./FlyBar/LandItem";
import ManualItem from "./FlyBar/ManualItem";

export class FlyBar extends Component {
    render() {
        return (
            <div className="flybar-holder font-firacode">
                <div className="flybar-heading">АВТО</div>
                <div className="flybar-separator" />
                <TakeoffItem/>
                <LandItem />
                <div className="flybar-separator" />
                <ManualItem />
            </div>
        );
    };
}
