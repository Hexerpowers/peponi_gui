import React, {Component} from 'react';

import heading_back from "../../Assets/Img/TelemetryBar/heading_back.png"
import heading_mark from "../../Assets/Img/TelemetryBar/heading_mark.png"
import target_heading_mark from "../../Assets/Img/TelemetryBar/roll_mark.png"

class HorizontalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yaw: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            yaw: nextProps.data.yaw,
            t_yaw: nextProps.data.t_yaw
        }
    }

    render() {
        return (
            <div className="tb-item-container">
                <img className="tb-hi-back" src={heading_back}/>
                <img style={{transform: 'rotate(' + this.state.yaw + 'deg)'}} className="tb-hi-mark"
                     src={heading_mark}/>
                <img style={{transform: 'rotate(' + this.state.t_yaw + 'deg)'}} className="tb-hi-target-mark"
                     src={target_heading_mark}/>
            </div>
        );
    }
}

export default HorizontalItem;
