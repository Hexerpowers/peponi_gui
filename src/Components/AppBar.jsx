import {Component} from "react";
import "../Assets/Styles/AppBar.css"

import settings_ico from "../Assets/Img/AppBar/settings.svg"
import logs_ico from "../Assets/Img/AppBar/logs.svg"

import signal_ico from "../Assets/Img/AppBar/signal/signal_3.svg"
import charge_ico from "../Assets/Img/AppBar/charge.svg"
import power_ico from "../Assets/Img/AppBar/power/power_0.svg"

import coil_dst_ico from "../Assets/Img/AppBar/coil/coil_distance.svg"
import coil_ld_ico from "../Assets/Img/AppBar/coil/coil_load.svg"

export class AppBar extends Component {
    render() {
        return (
            <div className="appbar-holder font-firacode">
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon" src={settings_ico}/>
                    <div className="img-toast-lower">
                        [Н]
                    </div>
                    <div className="appbar-description">Настр.</div>
                </div>
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon" src={logs_ico}/>
                    <div className="img-toast-lower">
                        [Ж]
                    </div>
                    <div className="appbar-description">Журнал</div>
                </div>
                <div className="appbar-separator" />
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon icon-inverted" src={signal_ico}/>
                    <div className="appbar-ping-value">
                        3ms
                    </div>
                    <div className="img-toast-lower">
                        [С]
                    </div>
                    <div className="appbar-description">Связь</div>
                </div>
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon appbar-charge-icon" src={charge_ico}/>
                    <div className="appbar-charge-value">
                        98%
                    </div>
                    <div className="img-toast-lower">
                        [З]
                    </div>
                    <div className="appbar-description">Заряд</div>
                </div>
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon icon-inverted" src={power_ico}/>
                    <div className="img-toast-lower">
                        [Г]
                    </div>
                    <div className="appbar-description">Генер.</div>
                </div>
                <div className="appbar-separator" />
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon icon-inverted" src={coil_dst_ico}/>
                    <div className="img-toast-lower">
                        [К]
                    </div>
                    <div className="appbar-description">Длина</div>
                </div>
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon icon-inverted" src={coil_ld_ico}/>
                    <div className="img-toast-lower">
                        [С]
                    </div>
                    <div className="appbar-description">Сила</div>
                </div>
                <div className="appbar-separator" />
                Статус: Норма
            </div>
        );
    };
}
