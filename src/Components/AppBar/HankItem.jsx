import React, {Component} from 'react';

import hank_extend_0 from "../../Assets/Img/AppBar/hank/hank_extend_0.png"
import hank_extend_1 from "../../Assets/Img/AppBar/hank/hank_extend_1.png"
import hank_extend_2 from "../../Assets/Img/AppBar/hank/hank_extend_2.png"
import hank_extend_3 from "../../Assets/Img/AppBar/hank/hank_extend_3.png"

import hank_retract_0 from "../../Assets/Img/AppBar/hank/hank_retract_0.png"
import hank_retract_1 from "../../Assets/Img/AppBar/hank/hank_retract_1.png"
import hank_retract_2 from "../../Assets/Img/AppBar/hank/hank_retract_2.png"
import hank_retract_3 from "../../Assets/Img/AppBar/hank/hank_retract_3.png"

import hank_still from "../../Assets/Img/AppBar/hank/hank_still.png"
import hank_no_link from "../../Assets/Img/AppBar/hank/hank_no_link.png"
import Swal from "sweetalert2";

class HankItem extends Component {
    constructor(props) {
        super(props);
        this.openHank = this.openHank.bind(this)

        this.base_url = "http://127.0.0.1:5053/api/v1/get/hank"

        this.counter = 0

        this.state = {
            state: 0,
            icon: hank_no_link,
            direction: 0,
            load: '-',
            length: '-',
            op_time: '-'
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
            if (e.code === 'KeyR') {
                self.openHank()
            }
        });

        if (localStorage.getItem('hank_mode') !== '0'){
            setInterval(() => {
                if (this.state.direction === 1) {
                    switch (this.counter) {
                        case 0:
                            this.setState({icon: hank_extend_0});
                            break;
                        case 1:
                            this.setState({icon: hank_extend_1});
                            break;
                        case 2:
                            this.setState({icon: hank_extend_2});
                            break;
                        case 3:
                            this.setState({icon: hank_extend_3});
                            break;
                    }
                    if (this.counter === 3) {
                        this.counter = 0
                    } else {
                        this.counter++
                    }
                }

            }, 200)

            setInterval(() => {
                if (this.state.direction === -1) {
                    switch (this.counter) {
                        case 0:
                            this.setState({icon: hank_retract_0});
                            break;
                        case 1:
                            this.setState({icon: hank_retract_1});
                            break;
                        case 2:
                            this.setState({icon: hank_retract_2});
                            break;
                        case 3:
                            this.setState({icon: hank_retract_3});
                            break;
                    }
                    if (this.counter === 3) {
                        this.counter = 0
                    } else {
                        this.counter++
                    }
                }

            }, 200)

            setInterval(() => {
                if (this.props.link) {
                    fetch(this.base_url)
                        .then(response => response.json())
                        .then(data => {
                            if (Number(data['state']) === 0){
                                this.setState({direction: 0})
                                this.setState({load: '-'})
                                this.setState({length: '-'})
                                this.setState({op_time: '-'})
                                this.setState({icon: hank_no_link});
                            }else {
                                if (Math.abs(Number(data['length']) - this.state.length) < 1) {
                                    this.setState({direction: 0})
                                    this.setState({icon: hank_still});
                                } else {
                                    this.setState({direction: Number(data['direction'])})
                                }
                                this.setState({load: Number(data['load'])})
                                this.setState({length: Number(data['length'])})
                                this.setState({op_time: Number(data['op_time'])})
                            }
                        });
                } else {
                    this.setState({direction: 0})
                    this.setState({load: '-'})
                    this.setState({length: '-'})
                    this.setState({op_time: '-'})
                    this.setState({icon: hank_no_link});
                }
                if (localStorage.getItem('triggered_hank') === '1'){
                    document.getElementById('ab-popup-hank-length').innerText = this.state.length + ' м'
                    document.getElementById('ab-popup-hank-load').innerText = this.state.load + ' кг'
                    document.getElementById('ab-popup-hank-op_time').innerText = this.state.op_time + ' ч'
                }
            }, 1000)
        }

    }

    openHank() {
        localStorage.setItem('triggered_hank', "1")
        Swal.fire({
            title: '<strong>Катушка</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="ab-popup-link-holder">' +
                '<div class="ab-popup-link-line">Режим работы: <i>Поддержание натяжения</i></div>' +
                '<div class="ab-popup-link-line">Выдано кабеля: <i id="ab-popup-hank-length">' + this.state.length + ' м</i></div>' +
                '<div class="ab-popup-link-line">Натяжение кабеля: <i id="ab-popup-hank-load">' + this.state.load + ' кг</i></div>' +
                '<div class="ab-popup-link-line">Наработка кабеля: <i id="ab-popup-hank-op_time">' + this.state.op_time + ' ч</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            localStorage.setItem('triggered_hank', "0")
        })
    }

    render() {
        return (
            <div onClick={this.openHank} className="ab-item" style={{margin: "0 84px 0 0"}}>
                <div className="ab-item-flex_row">
                    <img draggable="false" className="ab-item-icon" src={this.state.icon} alt=""/>
                    <div className="ab-item-text_block">
                        <div className="appbar-minitext">{this.state.length} м</div>
                        <div className="appbar-minitext">{this.state.load} кг</div>
                    </div>
                </div>
                <div className="item-toast" style={{right: '-4px'}}>
                    [К]
                </div>
                <div className="ab-item-description" style={{margin: "0px 0 0 3px"}}>Катушка</div>
            </div>
        );
    }
}

export default HankItem;
