import {Component} from "react";
import "../Assets/Styles/FlyBar.css"

import takeoff_ico from "../Assets/Img/FlyBar/takeoff.png";
import land_ico from "../Assets/Img/FlyBar/land.png";
import manual_ico from "../Assets/Img/FlyBar/manual.png";

export class FlyBar extends Component {
    render() {
        return (
            <div className="flybar-holder font-firacode">
                <div className="flybar-heading">АВТО</div>
                <div className="flybar-separator" />
                <div className="flybar-icon-item">
                    <img draggable="false" className="flybar-img-icon" src={takeoff_ico}/>
                    <div className="img-toast-lower">
                        [В]
                    </div>
                    <div className="flybar-description">Взлёт</div>
                </div>
                <div className="flybar-icon-item">
                    <img draggable="false" className="flybar-img-icon" src={land_ico}/>
                    <div className="img-toast-lower">
                        [П]
                    </div>
                    <div className="flybar-description">Посадка</div>
                </div>
                <div className="flybar-separator" />
                <div className="flybar-icon-item">
                    <img draggable="false" className="flybar-img-icon" src={manual_ico}/>
                    <div className="img-toast-lower">
                        [Р]
                    </div>
                    <div className="flybar-description">Ручной контроль</div>
                </div>
            </div>
        );
    };
}
