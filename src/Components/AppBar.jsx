import {Component} from "react";
import "../Assets/Styles/AppBar.css"

import settings_ico from "../Assets/Img/AppBar/settings.png"
import logs_ico from "../Assets/Img/AppBar/logs.png"

import signal_ico from "../Assets/Img/AppBar/signal/signal_3.png"
import charge_ico from "../Assets/Img/AppBar/charge.png"
import power_ico from "../Assets/Img/AppBar/power/power_state_0.png"

import coil_dst_ico from "../Assets/Img/AppBar/hank/hank_extend_2.png"

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
                    <img draggable="false" className="appbar-img-icon" src={signal_ico}/>
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
                    <img draggable="false" className="appbar-img-icon" src={power_ico}/>
                    <div className="img-toast-lower">
                        [Г]
                    </div>
                    <div className="appbar-description">Генер.</div>
                </div>
                <div className="appbar-separator" />
                <div className="appbar-icon-item">
                    <img draggable="false" className="appbar-img-icon" src={coil_dst_ico}/>
                    <div className="img-toast-lower">
                        [К]
                    </div>
                    <div className="appbar-description">Катушка</div>
                </div>
                <div className="appbar-separator" />
                <div className="appbar-status">-> Готов к взлёту</div>
            </div>
        );
    };
}
