import React, {Component} from 'react';
import cam_ico from "../../Assets/Img/VideoBar/enable_cam.png";

class CameraItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            indicator: 'inactive'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let active = ''
        let indicator = ''
        if (nextProps.link) {
            active = 'fb-item-active'
            if (nextProps.cam_link) {
                if (nextProps.status) {
                    indicator = 'enabled'
                } else {
                    indicator = 'active'
                }
            } else {
                indicator = 'disabled'
            }
        } else {
            active = ''
            indicator = 'inactive'
        }

        return {
            active: active,
            indicator: indicator
        }
    }

    render() {
        let active = 'vb-item ' + this.state.active
        let indicator = 'vb-indicator-' + this.state.indicator
        return (
            <div id="toggle_camera" onClick={this.props.elevate} className={active}>
                <img draggable="false" className="vb-item-icon-camera" src={cam_ico} alt=""/>
                <div className={indicator}/>
            </div>
        );
    }
}

export default CameraItem;
