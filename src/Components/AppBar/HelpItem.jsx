import React, {Component} from 'react';
import Swal from "sweetalert2";

import help_icon from "../../Assets/Img/AppBar/help.png"

class HelpItem extends Component {
    constructor(props) {
        super(props);
        this.openHelp = this.openHelp.bind(this)

        this.state = {
            state: 0,
        }
    }

    addEvent(element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, callback);
        } else {
            element["on" + eventName] = callback;
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyDot') {
                self.openHank()
            }
        });
    }

    openHelp() {
        Swal.fire({
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openHelp} className="ab-item">
                <img draggable="false" className="ab-item-icon" src={help_icon} alt=""/>
                <div className="item-toast">
                    [?]
                </div>
                <div className="ab-item-description">Помощь</div>
            </div>
        );
    }
}

export default HelpItem;
