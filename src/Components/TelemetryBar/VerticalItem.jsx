import React, {Component} from 'react';

import roll_pitch_back from "../../Assets/Img/TelemetryBar/roll_pitch_back.png"
import roll_pitch_angles from "../../Assets/Img/TelemetryBar/roll_pitch_angles.png"
import roll_mark from "../../Assets/Img/TelemetryBar/roll_mark.png"

class VerticalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alt: 38,
            roll: 20,
            t_roll: 20,
            pitch_back: -530,
            pitch_mark: 69
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            alt: Number(nextProps.data.alt)+1,
            roll: nextProps.data.roll,
            pitch_back: nextProps.data.pitch_back,
            pitch_mark: nextProps.data.pitch_mark
        }
    }

    render() {
        return (
            <div className="tb-item-holder">
                <img draggable="false" style={{transform: 'rotate(' + this.state.roll + 'deg)', top: this.state.pitch_back + 'px'}}
                     className="tb-vi-back" src={roll_pitch_back}/>
                <div style={{top: this.state.pitch_mark + 'px'}} className="tb-vi-pitch-mark"/>
                <img draggable="false" className="tb-vi-angles" src={roll_pitch_angles}/>
                <img draggable="false" style={{transform: 'rotate(' + this.state.roll + 'deg)'}} className="tb-vi-roll-mark"
                     src={roll_mark}/>
                <div className="tb-vi-alt"><i>{this.state.alt} м</i></div>
            </div>
        );
    }
}

export default VerticalItem;
