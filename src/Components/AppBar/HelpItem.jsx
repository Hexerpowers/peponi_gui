import React, {Component} from 'react';
import Swal from "sweetalert2";

import help_icon from "../../Assets/Img/AppBar/help.png"

class HelpItem extends Component {
    constructor(props) {
        super(props);
        this.openHelp = this.openHelp.bind(this)

        this.state = {
            core_version: '---',
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
            if (e.code === 'Slash') {
                self.openHelp()
            }
        });
        setTimeout(()=>{
            this.base_url = "http://127.0.0.1:5053/api/v1/get/info"
            if (this.props.link) {
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({core_version: data['core_version']})
                    });
            }
        }, 5000)
    }

    openHelp() {
        localStorage.setItem('block_aggressive_popups', '1')
        Swal.fire({
            title: '<strong>О приложении</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Версия приложения: <i>1.11.0 | «w_gui»</i></div>' +
                '<div class="ab-popup-link-line">Версия ядра: <i>'+this.state.core_version+'</i></div>' +
                '<div class="ab-popup-link-line">Разработчик: <i>akzha@omegafuture.ru</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            localStorage.setItem('block_aggressive_popups', '0')
        })
    }

    render() {
        let inverted = 'ab-item-icon'
        if (localStorage.getItem('theme')==='0') {
            inverted = 'ab-item-icon ab-item-icon-inverted'
        }
        return (
            <div onClick={this.openHelp} className="ab-item">
                <img draggable="false" className={inverted} src={help_icon} alt=""/>
                <div className="item-toast">
                    [?]
                </div>
                <div className="ab-item-description">Инфо</div>
            </div>
        );
    }
}

export default HelpItem;
