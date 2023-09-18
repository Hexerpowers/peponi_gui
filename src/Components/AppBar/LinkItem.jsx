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
            ping: '-'
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
            this.base_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/ping"
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
            if (localStorage.getItem('triggered_link') === '1'){
                document.getElementById('ab-popup-link-ping').innerText = this.state.ping + ' мс'
            }
        }, 2000)
    }

    openLink() {
        localStorage.setItem('block_aggressive_popups', '1')
        localStorage.setItem('triggered_link', "1")
        Swal.fire({
            title: '<strong>Связь</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Подключение: <i>' + this.vals.link + '</i></div>' +
                '<div class="ab-popup-link-line">Задержка передачи: <i id="ab-popup-link-ping">' + this.state.ping + ' мс</i></div>' +
                '<div class="ab-popup-link-line">Параметры: <i>88 Мбит, полный дуплекс</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            localStorage.setItem('triggered_link', "0")
            localStorage.setItem('block_aggressive_popups', '0')
        })
    }

    render() {
        return (
            <div onClick={this.openLink} className="ab-item">
                <img draggable="false" className="ab-item-icon" src={this.vals.level} alt=""/>
                <div className="ab-ping-val">
                    {this.state.ping}ms
                </div>
                <div className="item-toast">
                    [С]
                </div>
                <div className="ab-item-description">Связь</div>
            </div>
        );
    }
}

export default LinkItem;
