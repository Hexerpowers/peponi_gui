import React, {Component} from 'react';
import signal_ico_0 from "../../Assets/Img/AppBar/signal/signal_0.png";
import signal_ico_1 from "../../Assets/Img/AppBar/signal/signal_1.png";
import signal_ico_2 from "../../Assets/Img/AppBar/signal/signal_2.png";
import signal_ico_3 from "../../Assets/Img/AppBar/signal/signal_3.png";
import signal_ico_4 from "../../Assets/Img/AppBar/signal/signal_4.png";
import signal_ico_5 from "../../Assets/Img/AppBar/signal/signal_5.png";
import signal_ico_6 from "../../Assets/Img/AppBar/signal/signal_6.png";
import Swal from "sweetalert2";

class LinkItem extends Component {
    constructor(props) {
        super(props);
        this.openLink = this.openLink.bind(this)
        this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/ping"
        this.state = {
            ping: 2000
        }

        this.vals = {
            link: 'не установлено',
            level: signal_ico_0
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
            if (e.code === 'KeyC') {
                self.openLink()
            }
        });
        setInterval(() => {
            if (this.props.link) {
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ping: data['ping']})
                        this.vals['link'] = 'установлено'
                        if (Number(data['ping']) < ((2000 / 6))) {
                            this.vals['level'] = signal_ico_1
                        }
                        if (Number(data['ping']) < (2 * (2000 / 6))) {
                            this.vals['level'] = signal_ico_2
                        }
                        if (Number(data['ping']) < (3 * (2000 / 6))) {
                            this.vals['level'] = signal_ico_3
                        }
                        if (Number(data['ping']) < (4 * (2000 / 6))) {
                            this.vals['level'] = signal_ico_4
                        }
                        if (Number(data['ping']) < (5 * (2000 / 6))) {
                            this.vals['level'] = signal_ico_5
                        }
                        if (Number(data['ping']) < (6 * (2000 / 6))) {
                            this.vals['level'] = signal_ico_6
                        }
                    });
            } else {
                this.vals['link'] = 'не установлено'
                this.vals['level'] = signal_ico_0
                this.setState({ping: '-'})
            }
        }, 200)
    }

    openLink() {
        Swal.fire({
            title: '<strong>Связь</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="abi-lnk-holder">' +
                '<div class="abi-lnk-line">Подключение: <i>' + this.vals.link + '</i></div>' +
                '<div class="abi-lnk-line">Задержка передачи: <i>' + this.state.ping + ' мс</i></div>' +
                '<div class="abi-lnk-line">Параметры: <i>100M+ Full Duplex</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openLink} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={this.vals.level} alt=""/>
                <div className="appbar-ping-value">
                    {this.state.ping}ms
                </div>
                <div className="img-toast-lower">
                    [С]
                </div>
                <div className="appbar-description">Связь</div>
            </div>
        );
    }
}

export default LinkItem;
